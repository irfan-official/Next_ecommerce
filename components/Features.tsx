import { useData } from "../context/DataContext";

function Features() {
  const { categoryProductsData } = useData();

  return (
    <div className="w-full px-5 md:px-10 lg:px-20 flex items-center justify-center flex-wrap gap-4 mb-15 lg:mb-25 mt-10 lg:mt-0">
      {Object.entries(categoryProductsData).map(([category, products]) => (
        <section
          className="bg-white w-33 md:w-40 py-5 px-1 text-center font-semibold shadow hover:bg-slate-300 cursor-pointer rounded-sm"
          key={category}
        >
          <h2 className="category_text w-full font-semibold text-[0.9rem] md:text-[1rem] text-ellipsis">
            {category}
          </h2>
        </section>
      ))}
    </div>
  );
}

export default Features;
