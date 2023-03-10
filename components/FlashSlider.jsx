import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FlashSlider = () => {
  const { flashsaleProducts } = useAppContext();

  const slideLeft = () => {
    const slider = document.getElementById("flashsaleSlider");

    slider.scrollLeft = slider.scrollLeft - 270;
  };

  const slideRight = () => {
    const slider = document.getElementById("flashsaleSlider");

    slider.scrollLeft = slider.scrollLeft + 270;
  };

  return (
    <section className="w-full sm3:w-fit max-w-full mx-auto relative overflow-hidden">
      <section
        id="flashsaleSlider"
        className="w-full sm3:w-fit max-w-full flex items-center whitespace-nowrap overflow-x-scroll scrollbar-none scroll-smooth duration-500"
      >
        {flashsaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      <section
        className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 text-2xl rounded-full p-2 cursor-pointer bg-primary text-white dark:text-white"
        onClick={slideLeft}
      >
        <FaChevronLeft size={20} />
      </section>

      <section
        className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-0 text-2xl rounded-full p-2 cursor-pointer bg-primary text-white dark:text-white"
        onClick={slideRight}
      >
        <FaChevronRight size={20} />
      </section>
    </section>
  );
};

export default FlashSlider;
