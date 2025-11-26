import { useData } from "../context/DataContext";

function Features() {
  const { categoryProductsData } = useData();

  return (
    <div className="w-full  px-10 lg:px-20 flex items-center justify-center flex-wrap gap-4 mb-15 lg:mb-25 mt-5 lg:mt-0">
      {Object.entries(categoryProductsData).map(([category, products]) => (
        <section
          className="bg-white w-42 py-5 text-center font-semibold shadow hover:bg-slate-300 cursor-pointer rounded-sm"
          key={category}
        >
          <h2 className="category_text">{category}</h2>
        </section>
      ))}
    </div>
  );
}

export default Features;
