import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";
import Head from "next/head";
import { MdClose } from "react-icons/md";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";
import placeholderImg from "../../public/assets/placeholder.png";
import Image from "next/image";

const ProductPage = ({
  productb,
  productImages,
  pdi,
  relatedProducts,
  productsAttr,
}) => {
  const router = useRouter();

  const {
    appState: { cart, wishlist },
    appStateDispatch,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    numbersWithCommas,
  } = useAppContext();

  const [productDI, setProductDI] = useState(pdi);
  const [product, setProduct] = useState(productb);
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVol, setSelectedVol] = useState(null);

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  const increQty = (item) =>
    setProduct((item) => ({
      ...item,
      qty: item.qty + 1,
    }));

  const decreQty = (item) => {
    if (item.qty > 1) {
      setProduct((item) => ({
        ...item,
        qty: item.qty - 1,
      }));
    } else {
      setProduct((item) => ({
        ...item,
        qty: item.qty,
      }));
    }
  };

  const selectSize = (item, size) => {
    setProduct((item) => ({
      ...item,
      size: size,
    }));

    setSelectedSize(size);
  };

  const selectVolume = (item, vol) => {
    setProduct((item) => ({
      ...item,
      vol: vol,
    }));

    setSelectedVol(vol);
  };

  useEffect(() => {
    setProduct(productb);
    setProductDI(pdi);
  }, [router.query, router.isReady]);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius {product.name} | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="w-full mx-auto max-w-screen-xl flex items-start justify-center flex-wrap my-6 bg-white">
        <section className="w-full mx-auto max-w-screen-xl flex items-start md3:items-center justify-between mt-6 flex-col md:flex-row">
          <section className="w-full md:w-[48%] flex flex-col items-center justify-center space-y-6">
            <section className="w-full h-auto max-h-[500px] md2:h-[500px]">
              <Image
                src={
                  productImages && productImages.length > 1
                    ? productImages[imgIndex].product_image
                    : placeholderImg
                }
                alt={productDI ? productDI.product : product.name}
                width={500}
                height={500}
                className="w-full h-auto max-h-[500px] md2:h-[500px] object-cover object-center z-20"
              />
            </section>

            <section className="w-full h-[90px] md:h-[110px] md2:h-[120px] flex items-center justify-start whitespace-nowrap overflow-x-scroll scrollbar-none scroll-smooth duration-500 overflow-y-hidden space-x-4">
              {productImages &&
                productImages?.map((pi, i) => (
                  <section
                    className={`w-[80px] h-[80px] md:w-[95px] md:h-[95px] md2:w-[115px] md2:h-[115px] cursor-pointer ${
                      i === imgIndex ? "p-1 bg-gray-500 rounded-md" : ""
                    }`}
                    onMouseEnter={() => setImgIndex(i)}
                    key={i}
                  >
                    <img
                      src={pi.product_image}
                      alt={pi.product}
                      width={0}
                      height={0}
                      className="w-full h-full rounded-md object-cover object-center z-20"
                    />
                  </section>
                ))}
            </section>
          </section>

          <section className="w-full mt-16 md:mt-0 md:w-[48%] py-0 md3:py-6 dark:text-black">
            <section className="text-black sm3:text-2xl md:text-3xl">
              {product.name}
            </section>
            <section className="mt-2 sm3:mt-4 ">
              {product.is_onFlashsale ? (
                <p className="">
                  <s className="text-gray-400 text-md sm3:text-lg mr-[6px]">
                    ???{numbersWithCommas(product.price)}
                  </s>{" "}
                  <span className="text-black text-md font-semibold sm3:text-lg md:text-xl">
                    ???{numbersWithCommas(product.flashsale_price)}
                  </span>
                </p>
              ) : (
                <p className="text-black text-md font-semibold sm3:text-lg md:text-xl">
                  ???{numbersWithCommas(product.price)}
                </p>
              )}
            </section>
            <section className="my-3 sm3:my-5 text-md">
              {product.description}
            </section>

            <section className="flex items-center justify-start space-x-6 mt-2">
              <section
                className="bg-white text-black md2:text-lg border-2 border-black w-[45px] h-[45px] grid place-items-center rounded-sm cursor-pointer hover:bg-black hover:border-black hover:text-white duration-300"
                onClick={() => increQty(product)}
              >
                +
              </section>
              <section className="text-black md2:text-lg">
                {product.qty}
              </section>
              <section
                className="bg-white text-black md2:text-lg border-2 border-black w-[45px] h-[45px] grid place-items-center rounded-sm cursor-pointer hover:bg-black hover:border-black hover:text-white duration-300"
                onClick={() => decreQty(product)}
              >
                -
              </section>
            </section>

            {productsAttr.Size && (
              <section className="flex items-center justify-start space-x-3 mt-4">
                {productsAttr.Size.map((size) => (
                  <section
                    className={`${
                      selectedSize === size
                        ? "bg-black text-white hover:bg-primary hover:border-primary"
                        : "bg-white text-black"
                    } md2:text-lg border-2 border-black w-fit h-fit grid place-items-center rounded-sm cursor-pointer hover:bg-black hover:border-black hover:text-white duration-300 px-2 py-1`}
                    onClick={() => selectSize(product, size)}
                  >
                    {size}
                  </section>
                ))}
              </section>
            )}

            {productsAttr.Volume && (
              <section className="flex items-center justify-start space-x-3 mt-4">
                {productsAttr.Volume.map((vol) => (
                  <section
                    className={`${
                      selectedVol === vol
                        ? "bg-black text-white hover:bg-primary hover:border-primary"
                        : "bg-white text-black"
                    } md2:text-lg border-2 border-black w-fit h-fit grid place-items-center rounded-sm cursor-pointer hover:bg-black hover:border-black hover:text-white duration-300 px-2 py-1`}
                    onClick={() => selectVolume(product, vol)}
                  >
                    {vol}
                  </section>
                ))}
              </section>
            )}

            <section className="mt-4">
              <ul className="block space-y-4">
                {cart.some((p) => p.id === product.id) ? (
                  <li
                    className="bg-black w-full h-fit grid place-items-center cursor-pointer text-white hover:bg-primary rounded-md p-2"
                    onClick={() => {
                      removeFromCart(product);
                      toast.error(`${product.name} removed from cart`);
                    }}
                  >
                    <section className="flex items-center justify-center px-4 py-2 space-x-2">
                      <MdClose size={20} className="" />
                      <p className="text-md">Remove from Cart</p>
                    </section>
                  </li>
                ) : (
                  <li
                    className="bg-black w-full h-fit grid place-items-center cursor-pointer text-white hover:bg-primary rounded-md p-2"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart`);
                    }}
                  >
                    <section className="flex items-center justify-center px-4 py-2 space-x-2">
                      <FaShoppingCart size={20} className="" />
                      <p className="text-md">Add to Cart</p>
                    </section>
                  </li>
                )}

                {wishlist.some((w) => w.id === product.id) ? (
                  <li
                    className="bg-black w-full h-fit grid place-items-center cursor-pointer text-white hover:bg-primary rounded-md p-2"
                    onClick={() => {
                      removeFromWishlist(product);
                      toast.error(`${product.name} removed from favourite`);
                    }}
                  >
                    <section className="flex items-center justify-center px-4 py-2 space-x-2">
                      <MdClose size={20} className="" />
                      <p className="text-md">Remove from Favourite</p>
                    </section>
                  </li>
                ) : (
                  <li
                    className="bg-black w-full h-fit grid place-items-center cursor-pointer text-white hover:bg-primary rounded-md p-2"
                    onClick={() => {
                      addToWishlist(product);
                      toast.success(`${product.name} added to favourite`);
                    }}
                  >
                    <section className="flex items-center justify-center px-2 py-2 space-x-2">
                      <FaHeart size={20} className="" />
                      <p className="text-md">Add to Favourite</p>
                    </section>
                  </li>
                )}
              </ul>
            </section>
          </section>
        </section>

        <section className="w-full mx-auto max-w-screen-xl grid place-items-center mt-20">
          <h1 className="text-black sm2:text-2xl md:text-3xl font-dalek font-semibold">
            You Might Also Like
          </h1>

          <section className="w-full mt-8 mb-6 flex items-center justify-center flex-wrap space-x-2 space-y-2">
            {relatedProducts.length > 0 ? (
              relatedProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <h3 className="text-black sm2:text-xl">No Related Products</h3>
            )}
          </section>
        </section>
      </section>
    </section>
  );
};

export default ProductPage;

export const getStaticPaths = async () => {
  const products = await fetch(
    "https://mercurius-backend.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  const paths = products.map((product) => {
    return {
      params: {
        slug: product.slug,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const products = await fetch(
    "https://mercurius-backend.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  const productArr = await products.filter((product) => product.slug === slug);

  const producta = await productArr[0];

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  const productImages =
    producta.product_images.length !== 0
      ? await producta.product_images.map((pi) => ({
          product: pi.product,
          product_image: bgUrl(pi.product_images),
          alt_text: pi.alt_text,
          is_featured: pi.is_feature,
        }))
      : null;

  const productAttributesArr =
    producta.attribute_value.length !== 0
      ? await producta.attribute_value.map((pa) => {
          const paTTrArr = pa.attribute.split(" ");
          const pattr = paTTrArr[paTTrArr.length - 1];

          return {
            attr: pattr,
            value: pa.value,
          };
        })
      : null;

  const productsAttr = {
    Size: [],
    Volume: [],
  };

  (await productAttributesArr)
    ? productAttributesArr.map((par) => {
        if (par.attr === "Size") {
          productsAttr.Size.push(par.value);
        }

        if (par.attr === "Volume") {
          productsAttr.Volume.push(par.value);
        }
      })
    : null;

  let productb = {
    ...producta,
    qty: 1,
  };

  const pdiArr = productImages !== null ? await productImages.filter((pi) => pi.is_featured === true) : null;

  const pdi = pdiArr !== null ? await pdiArr[0] : null;

  const relatedProductsSlug = producta.lowersubcategory.slug;

  const relatedProductsArr = await products.filter(
    (product) => product.lowersubcategory.slug === relatedProductsSlug
  );

  const relatedProductsss = await relatedProductsArr.filter(
    (product) => product.id !== productb.id
  );

  const relatedProducts = [];
  let rp = 0;

  if (relatedProductsss.length >= 4) {
    for (let rp = 0; rp < 4; rp++) {
      relatedProducts.push(relatedProductsss[rp]);
    }
  } else {
    for (let rp = 0; rp < relatedProductsss.length; rp++) {
      relatedProducts.push(relatedProductsss[rp]);
    }
  }

  return {
    props: {
      productb,
      productImages,
      pdi,
      relatedProducts,
      productsAttr,
    },
  };
};
