import shirtsImg from "../../assets/shirts.png";
import shoesImg from "../../assets/shoes.png";
import watchesImg from "../../assets/watches.png";
import sunglassesImg from "../../assets/sunglasses.png";
import Image from "next/image";
import Link from "next/link";

export default function LandingCategories() {
  const categoriyList = [
    { title: "SHIRTS", image: shirtsImg, href: "/category/mens-shirts" },
    { title: "SHOES", image: shoesImg, href: "/category/mens-shoes" },
    { title: "WATCHES", image: watchesImg, href: "/category/mens-watches" },
    { title: "SUNGLASSES", image: sunglassesImg, href: "/category/sunglasses" },
  ];

  return (
    <section
      id="categories"
      className="container py-sectionPadding-mob md:py-sectionPadding my-sectionMargine-mob md:my-sectionMargine"
    >
      <h1 className="text-primary-tx font-bold text-3xl text-center sm:text-start sm:text-4xl md:text-5xl mb-12">
        Shop by Category
      </h1>
      <div className="grid items-center w-[75%] sm:w-full mx-auto gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {categoriyList.map((category) => (
          <Link
            href={category.href}
            key={category.title}
            className="overflow-hidden rounded-xl relative max-h-[450px] cursor-pointer group block"
          >
            <Image
              src={category.image}
              alt={`${category.title} Image`}
              className="w-full h-full duration-300 object-cover group-hover:scale-[1.1]"
            />
            <div className="absolute inset-0 w-full h-full z-10 bg-primary-tx/40"></div>

            <p className="absolute left-8 bottom-8 text-primary-bg font-bold text-2xl z-20">
              {category.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
