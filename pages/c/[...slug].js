import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import ProductCard from "../../components/ProductCard";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";
import { CategoryBanner } from "../../components";
import Link from "next/link";

export default function CategoryPage({}) {
  const router = useRouter();
  const {
    productFilter: { byCategory, searchQuery },
    productFilterDispatch,
  } = useAppContext();

  const [products, setProducts] = useState({});
  const [catObj, setCatObj] = useState({});
  const [catBg, setCatBg] = useState("");
  const [subcatObj, setSubcatObj] = useState({});
  const [allLowerSub, setAllLowerSub] = useState(null);
  const [currLowerSub, setCurrLowerSub] = useState(null);

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  useEffect(() => {
    if (router.isReady) {
      const categories = fetch("https://mercurius-backend.up.railway.app/api/inventory/c/")
        .then((res) => res.json())
        .then((catData) => {
          const cat = catData.filter(
            (category) => category.slug === router.query.slug[0]
          );

          setCatObj(cat[0]);
          setCatBg(bgUrl(cat[0].category_image));

          const subcats = cat[0].subcategories.filter(
            (subcat) => subcat.slug === router.query.slug[1]
          );

          setSubcatObj(subcats[0]);

          const currLowerSub = subcats[0].lowersubcategories.filter(
            (clscat) => clscat.slug === router.query.slug[2]
          );
          setCurrLowerSub(currLowerSub[0]);

          const allLowerSub = subcats[0].lowersubcategories;
          setAllLowerSub(allLowerSub);
        });

      const products = fetch("https://mercurius-backend.up.railway.app/api/inventory/")
        .then((res) => res.json())
        .then((prodData) => {
          const prodSubFilt = prodData.filter(
            (prod) => prod.subcategory.slug === router.query.slug[1]
          );

          const lsp = prodSubFilt.filter(
            (product) => product.lowersubcategory.slug === router.query.slug[2]
          );

          setProducts(lsp);
        });
    }
  }, [router.query]);

  const transformProducts = () => {
    let filteredProducts = products;

    if (byCategory) {
      if (byCategory === "all") {
        filteredProducts = filteredProducts.filter((product) =>
          product.product_type.name.includes("")
        );
      } else {
        filteredProducts = filteredProducts.filter((product) =>
          product.product_type.name.includes(byCategory)
        );
      }
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredProducts;
  };

  return (
    <section className="">
      <Head>
        <title>Mercurius {subcatObj.name} | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="w-full min-w-full h-[350px] max-h-[350px] grid place-items-center overflow-hidden z-10 relative">
        <section className="bg-black absolute top-0 left-0 w-full h-[100%] opacity-80 z-30"></section>

        <img
          src={catBg}
          alt=""
          width={0}
          height={0}
          className="w-full h-[100%] max-h-[100%] object-cover object-center z-20"
        />

        <section className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4 z-40">
          <h1 className="text-white sm:text-lg md:text-2xl md2:text-3xl lg:text-4xl font-dalek font-semibold">
            {subcatObj.name}
          </h1>
          <p className="text-white text-sm mt-4">{subcatObj.description}</p>
        </section>
      </section>

      <section className="w-[85%] mx-auto flex items-center justify-center md:justify-end max-w-screen-xl my-6">
        <form className="w-[100%] sm3:w-[70%] md:w-[50%] md2:w-[30%]">
          <label
            htmlFor="search__input"
            className="flex items-center justify-center"
          >
            <input
              type="search"
              className="bg-white py-2 px-4 w-full border-2 outline-none border-black hover:border-primary focus:border-primary placeholder-gray-500 hover:placeholder-primary text-sm md:py-4 dark:text-black"
              placeholder="Search for product"
              required
              onChange={(e) => {
                productFilterDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </label>
        </form>
      </section>

      <section className="w-[85%] mx-auto max-w-screen-xl m-6 flex flex-row items-center justify-center flex-wrap">
        {allLowerSub &&
          allLowerSub.map((lowersub) => {
            return (
              <Link
                href={`/c/${router.query.slug[0]}/${router.query.slug[1]}/${lowersub.slug}`}
              >
                <section
                  key={lowersub.id}
                  className={`${
                    lowersub.slug === router.query.slug[2]
                      ? "flex items-center justify-center bg-gray-100 text-black m-2 p-3 w-fit border-2 outline-none border-black hover:bg-primary hover:border-primary hover:text-black text-md font-dalek cursor-pointer duration-300 "
                      : "flex items-center justify-center bg-white text-black m-2 p-3 w-fit border-2 outline-none border-black hover:bg-black hover:text-white text-md font-dalek cursor-pointer duration-300"
                  }`}
                >
                  <img
                    src={bgUrl(lowersub.lowersubcategory_icon)}
                    alt={lowersub.name}
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px] mr-2 object-contain object-center z-20"
                  />

                  <span className="">{lowersub.name}</span>
                </section>
              </Link>
            );
          })}
      </section>

      <section className="w-full mx-auto max-w-screen-xl flex flex-wrap items-center justify-center mb-6 dark:text-black">
        {transformProducts().length > 0 ? (
          transformProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h3>No Product Found</h3>
        )}
      </section>
    </section>

    // <section className="flex flex-row items-center justify-center flex-wrap mt-6">
    //   <section
    //     className="bg-white w-fit text-center m-2 p-2 rounded-md shadow-md cursor-pointer hover:border-[1px] border-primary"
    //     onClick={(e) => {
    //       productFilterDispatch({
    //         type: "FILTER_BY_CATEGORY",
    //         payload: "all",
    //       });
    //     }}
    //   >
    //     <p>All</p>
    //   </section>

    //   {products.map((product) => (
    //     <section
    //       key={product.id}
    //       className="bg-white w-fit text-center m-2 p-2 rounded-md shadow-md cursor-pointer hover:border-[1px] border-primary"
    //       onClick={(e) => {
    //         productFilterDispatch({
    //           type: "FILTER_BY_CATEGORY",
    //           payload: product.product_type.name,
    //         });
    //       }}
    //     >
    //       <p className="">{product.product_type.name}</p>
    //     </section>
    //   ))}
    // </section>
  );
}

export const getServerSideProps = async ({ req }) => {
  // const session = await getSession({ req });

  const products = await fetch("https://mercurius-backend.up.railway.app/api/inventory/").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
};
