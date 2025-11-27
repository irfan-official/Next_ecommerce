"use client";
import { Product } from "@/models/product.model";
import { Feedback } from "@/models/feedback.model";
import { TopReview } from "@/models/topReview.model";
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
  limitedProductsData: Product[];
  allProductsData: Product[];
  categoryProductsData: Record<string, Product[]>;
  usersFeedback: Feedback[];
  addProductsStatus: boolean;
  setAddProductsStatus: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProductLoader: Boolean;

  HomePageDataFetching: () => any;
  AllProductsDataFetchingWithLoader: () => any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [limitedProductsData, setLimitedProductsData] = useState<Product[]>([]);
  const [allProductsData, setAllProductsData] = useState<Product[]>([]);
  const [categoryProductsData, setCategoryProductsData] = useState<
    Record<string, Product[]>
  >({});
  const [usersFeedback, setUsersFeedback] = useState<Feedback[]>([]);
  const [addProductsStatus, setAddProductsStatus] = useState<boolean>(false);
  const [fetchProductLoader, setFetchProductLoader] = useState(false);

  const axiosInstance = useAxios();

  function groupByCategory(products: Product[]) {
    return products.reduce(
      (acc: Record<string, Product[]>, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      },
      {} as Record<string, Product[]>
    );
  }

  const HomePageDataFetching = useCallback(async () => {
    try {
      setFetchProductLoader(true);

      const limitedDataResponse = await fetchWithRetry(() =>
        axiosInstance.get("/api/limited-products-data")
      );
      // console.log(
      //   "/api/limited-products-data  1  => ",
      //   limitedDataResponse.data.data
      // );
      setLimitedProductsData(limitedDataResponse.data.data);

      const usersFeedBackResponse = await fetchWithRetry(() =>
        axiosInstance.get("/api/users-feedback")
      );
      // console.log(
      //   "/api/users-feedback  3  => ",
      //   usersFeedBackResponse.data.data
      // );
      setUsersFeedback(usersFeedBackResponse.data.data);
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
      // console.log("response from /api/all-products-data => ", res.data.data);

      setAllProductsData(res.data.data);
      setCategoryProductsData(groupByCategory(res.data.data));
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

      // console.log("response from /api/all-products-data  4 => ", res.data.data);

      setAllProductsData(res.data.data);
      setCategoryProductsData(groupByCategory(res.data.data));
    } catch (error) {
      alert("Backend waking up… please try again.");
    }
  }, [addProductsStatus]);

  useEffect(() => {
    AllProductsDataFetchingWithNoLoader();
  }, [addProductsStatus]);

  // useEffect(() => {
  //   AllProductsDataFetchingWithLoader();
  // }, []);

  useMemo(() => {
    HomePageDataFetching();
  }, []);

  return (
    <DataContext.Provider
      value={{
        limitedProductsData, // /api/limited-products-data GET
        allProductsData, // /api/all-products-data GET
        categoryProductsData, //api/category-products-data GET
        usersFeedback, // api/users-feedback GET
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
