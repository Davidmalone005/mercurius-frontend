import Head from "next/head";
import React, { useState, useEffect } from "react";
import { AllProducts, Flashsales, HeroBanner } from "../components";
import { useAppContext } from "../context/AppContext";
import { useSession } from "next-auth/react";

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed urna sed nibh aliquet volutpat consectetur vitae magna. Sed tempor vestibulum velit vitae euismod. Nunc placerat risus nec ipsum finibus, vitae pellentesque lacus iaculis. Ut laoreet mollis nunc. Sed diam velit, tempus sit amet est vitae, dapibus tincidunt nibh. Donec congue tincidunt lectus quis luctus. Vivamus non suscipit ligula. Nullam lacinia tellus ut diam bibendum, ac fermentum lacus tincidunt. Maecenas tincidunt faucibus nisi, eget viverra libero blandit vitae. Cras eu nisi magna. Donec efficitur maximus mauris, sit amet molestie urna sagittis vitae. Donec non orci vitae tellus porta efficitur eget in dolor. Proin tincidunt vestibulum enim ut finibus. Ut vitae turpis nec est malesuada bibendum. Sed ac arcu dapibus, volutpat lacus et, fringilla tellus. Pellentesque eu laoreet nisl.

export default function Home({
  products,
  flashsale_timer,
  flashsale_products,
  productTypes,
}) {
  const {
    flashsaleProducts,
    setFlashsaleProducts,
    setProductTypes,
    setProducts,
    setFlashsaleTimer,
    flashsaleTimerSwitch,
    setFlashsaleTimerSwitch,
    setUserInfo,
  } = useAppContext();

  const { data: session } = useSession();

  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" || typeof window !== null) {
      if (session && session.user && session.user.name) {
        window.localStorage.setItem("UserData", JSON.stringify(session.user));
        setUserInfo(session.user);
        setUserStatus(session.user);
      }
    }
  }, [session]);

  useEffect(() => {
    if (products.length !== 0) {
      window.localStorage.setItem("ProductsData", JSON.stringify(products));
      setProducts(JSON.parse(window.localStorage.getItem("ProductsData")));
    }

    if (flashsale_products.length !== 0) {
      setFlashsaleProducts(flashsale_products);
    }

    if (productTypes.length !== 0) {
      setProductTypes(productTypes);
    }

    if (flashsale_timer.length !== 0) {
      const activeFlashsaleDatetime = flashsale_timer[0].when;

      const activeFlashsaleDate = new Date(activeFlashsaleDatetime).getTime();

      window.localStorage.setItem(
        "FlashsaleTimeMilliseconds",
        activeFlashsaleDate
      );

      setFlashsaleTimer(
        window.localStorage.getItem("FlashsaleTimeMilliseconds")
      );

      if (Date.now() > activeFlashsaleDate) {
        setFlashsaleTimerSwitch(false);
      } else {
        setFlashsaleTimerSwitch(true);
      }
    }
  }, []);

  return (
    <section className="">
      <Head>
        <title>Mercurius | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="z-10">
        <HeroBanner />
      </section>

      {flashsaleTimerSwitch && (
        <section className="my-6">
          <Flashsales />
        </section>
      )}

      <section className="mt-3 mb-3 bg-[#fcfcfc]">
        <AllProducts />
      </section>
    </section>
  );
}

// Changing API endpoint from Railway's to localhost
// https://mercurius-api-production.up.railway.app

export const getServerSideProps = async ({ req }) => {
  const products = await fetch(
    "https://mercurius-backend.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  const flashsale_timer = await fetch(
    "https://mercurius-backend.up.railway.app/api/inventory/f/"
  ).then((res) => res.json());

  const flashsale_products = await fetch(
    "https://mercurius-backend.up.railway.app/api/inventory/f/all/"
  ).then((res) => res.json());

  const productTypes = await fetch(
    "https://mercurius-backend.up.railway.app/api/inventory/pt/"
  ).then((res) => res.json());

  return {
    props: {
      products,
      flashsale_timer,
      flashsale_products,
      productTypes,
    },
  };
};
