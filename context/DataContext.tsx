"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import useAxios from "@/hooks/useAxios";

export async function fetchWithRetry(apiCall: any, retries = 7, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await apiCall();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
      console.log(`Retrying... (${i + 1})`);
    }
  }
}

interface DataContextType {
  limitedProductsData: any[];
  allProductsData: any[];
  categoryProductsData: any[];
  usersFeedback: any[];
  topReviewers: any[];
  addProductsStatus: boolean;
  setAddProductsStatus: (value: boolean) => void;
  fetchProductLoader: Boolean;
  HomePageDataFetching: () => any;
  AllProductsDataFetchingWithLoader: () => any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [limitedProductsData, setLimitedProductsData] = useState<any[]>([]);
  const [allProductsData, setAllProductsData] = useState<any[]>([]);
  const [categoryProductsData, setCategoryProductsData] = useState<any[]>([]);
  const [usersFeedback, setUsersFeedback] = useState<any[]>([]);
  const [topReviewers, setTopReviewers] = useState<any[]>([]);
  const [addProductsStatus, setAddProductsStatus] = useState(false);
  const [fetchProductLoader, setFetchProductLoader] = useState(false);

  const axiosInstance = useAxios();

  const HomePageDataFetching = useCallback(async () => {
    try {
      setFetchProductLoader(true);

      const limitedDataResponse = await fetchWithRetry(() =>
        axiosInstance.get("/api/limited-products-data")
      );
      setLimitedProductsData(limitedDataResponse.data.data);

      const topReviewersResponse = await fetchWithRetry(() =>
        axiosInstance.get("/api/v1/home-others-data")
      );
      setTopReviewers(topReviewersResponse.data.data);

      const usersFeedBackResponse = await fetchWithRetry(() =>
        axiosInstance.get("/api/v1/home-others-data")
      );
      setUsersFeedback(usersFeedBackResponse.data.data);

      const categoryResponse = await fetchWithRetry(() =>
        axiosInstance.get("/api/v1/home-others-data")
      );
      setCategoryProductsData(categoryResponse.data.data);
    } catch (error) {
      alert("Backend waking up… please try again.");
    } finally {
      setFetchProductLoader(false);
    }
  }, []);

  const AllProductsDataFetchingWithLoader = useCallback(async () => {
    try {
      setFetchProductLoader(true);

      const res = await fetchWithRetry(() =>
        axiosInstance.get("/api/all-products-data")
      );
      console.log("response from /api/all-products-data => ", res.data.data);

      setAllProductsData(res.data.data);
    } catch (error) {
      alert("Backend waking up… please try again.");
    } finally {
      setFetchProductLoader(false);
    }
  }, []);

  const AllProductsDataFetchingWithNoLoader = useCallback(async () => {
    try {
      const res = await fetchWithRetry(() =>
        axiosInstance.get("/api/all-products-data")
      );

      console.log("response from /api/all-products-data => ", res.data.data);

      setAllProductsData(res.data.data);
    } catch (error) {
      alert("Backend waking up… please try again.");
    }
  }, [addProductsStatus]);

  // useEffect(() => {
  //   AllProductsDataFetchingWithNoLoader();
  // }, [addProductsStatus]);

  useEffect(() => {
    AllProductsDataFetchingWithLoader();
  }, []);

  // useMemo(() => {
  //   HomePageDataFetching();
  // }, []);

  return (
    <DataContext.Provider
      value={{
        limitedProductsData, // /api/limited-products-data GET
        allProductsData, // /api/all-products-data GET
        categoryProductsData, //api/category-products-data GET
        usersFeedback, // api/users-feedback GET
        topReviewers, //api/top-reviews GET
        addProductsStatus, // api/add-products POST
        setAddProductsStatus, // Flag variable
        fetchProductLoader, // loading state
        HomePageDataFetching,
        AllProductsDataFetchingWithLoader,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside <DataProvider>");
  return ctx;
}
