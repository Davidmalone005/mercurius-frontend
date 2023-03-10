import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Sidebar2 } from "../../components";
import { FiMenu, FiPackage, FiEdit } from "react-icons/fi";
import { FaEnvelope, FaHeart } from "react-icons/fa";
import { MdClose, MdInventory } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useRouter } from "next/router";

const orders = ({}) => {
  const router = useRouter();

  const {
    appState: { cart, wishlist },
    appStateDispatch,
    addToCart,
    removeFromWishlist,
    numbersWithCommas,
    userInfo,
    setUserInfo,
  } = useAppContext();

  const [userStatus, setUserStatus] = useState(null);
  const [userOrders, setUserOrders] = useState(null);

  const sidebarLinks = [
    {
      name: "Account",
      url: "/account",
      icon: <ImUser size={20} className="mr-2" />,
    },
    {
      name: "Favourites",
      url: "/favourites",
      icon: <FaHeart size={20} className="mr-2" />,
    },
    {
      name: "Orders",
      url: "/orders",
      icon: <FiPackage size={20} className="mr-2" />,
      active: true,
    },
    {
      name: "Inbox",
      url: "/inbox",
      icon: <FaEnvelope size={20} className="mr-2" />,
    },
    {
      name: "Storehouse",
      url: "/storehouse",
      icon: <MdInventory size={20} className="mr-2" />,
    },
    {
      name: "Log Out",
      url: null,
      icon: <RiLogoutBoxFill size={20} className="mr-2" />,
    },
  ];

  const [asideOpen, setAsideOpen] = useState(false);

  const handleSignOut = () => {
    window.localStorage.removeItem("UserData");
    setUserInfo(null);
    setUserStatus(null);
    signOut({ callbackUrl: "/register" });
  };

  useEffect(() => {
    if (typeof window !== "undefined" || typeof window !== null) {
      if (
        (window.localStorage.getItem("UserData") &&
          userStatus === "undefined") ||
        (window.localStorage.getItem("UserData") && userStatus === null)
      ) {
        setUserStatus(JSON.parse(window.localStorage.getItem("UserData")));
      } else if (!window.localStorage.getItem("UserData")) {
        window.localStorage.removeItem("UserData");
        toast.error("Please login with your email and password!");
        setUserInfo(null);
        setUserStatus(null);
        signOut({ callbackUrl: "/login" });
      } else {
        fetch("https://mercurius-backend.up.railway.app/api/users/verify/", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(userStatus),
        })
          .then((res) => res.json())
          .then((userStatusRes) => {
            window.localStorage.setItem(
              "UserData",
              JSON.stringify(userStatusRes)
            );
            setUserInfo(userStatusRes);
            setUserStatus(userStatusRes);
            return userStatusRes;
          });
      }

      if (window.localStorage.getItem("UserData")) {
        const user = JSON.parse(window.localStorage.getItem("UserData"));
        if (user.id) {
          const allOrders = fetch(
            `https://mercurius-backend.up.railway.app/api/orders/${user.id}/`
          )
            .then((res) => res.json())
            .then((res) => {
              if (res.length > 0) {
                window.localStorage.setItem("Orders", JSON.stringify(res));
                setUserOrders(res);
              }
            });
        }
      }
    }
  }, []);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Orders | Best Thrift Store in Nigeria</title>
      </Head>

      {userStatus && userStatus.error ? (
        <section className="w-full p-12 grid place-items-center text-center">
          <h4 className="text-xl text-primary text-center">
            Please, complete your Account registration. Or Login with your
            registered email address!
          </h4>
          <Link href="/register">
            <button
              className="bg-black rounded-md mt-5 px-5 py-3 text-white hover:bg-primary cursor-pointer w-fit"
              onClick={handleSignOut}
            >
              Register
            </button>
          </Link>
        </section>
      ) : (
        <section className="w-full flex flex-col items-start justify-start my-10">
          <h1 className="text-2xl sm2:text-3xl md2:text-4xl text-primary font-dalek">
            Settings
          </h1>

          <section className="w-full flex items-start justify-start mt-8">
            <section className="flex flex-col h-full items-start sticky top-0 left-0 mr-5 md:mr-7">
              <section className="grid place-items-center md:hidden w-[40px] h-[40px] ml-1 font-bold duration-300 cursor-pointer">
                {asideOpen ? (
                  <MdClose
                    size={25}
                    className="text-primary"
                    onClick={() => setAsideOpen(false)}
                  />
                ) : (
                  <FiMenu
                    size={25}
                    className="text-black"
                    onClick={() => setAsideOpen(true)}
                  />
                )}
              </section>

              <section
                className={`bg-black ${
                  asideOpen ? "w-[175px] duration-300" : "w-[60px]"
                } md:w-[200px] h-full px-[15px] py-[20px] md:px-[20px] md:py-[35px] flex items-start justify-between relative duration-300`}
              >
                <Sidebar2 links={sidebarLinks} asideOpen={asideOpen} />
              </section>
            </section>

            <section
              className={`bg-[#F1F1F1] w-[100%] flex flex-col items-center justify-center scroll-smooth z-10 duration-500`}
            >
              <section className="w-full sticky top-0 left-0 bg-black px-4 py-3 md:px-6 md:py-4 mb-5 md:mb-8">
                <h3 className="text-xl text-white">Orders</h3>
              </section>

              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-3 duration-500`}
              >
                {userOrders && userOrders.length <= 0 ? (
                  <section className="w-full rounded-md mt-6 mb-12 p-4 flex flex-col items-center justify-center dark:text-black">
                    <h4 className="text-primary text-center">
                      You have no active orders...
                    </h4>
                    <Link href="/">
                      <button className="bg-black rounded-md mt-5 px-5 py-3 text-white hover:bg-primary cursor-pointer w-fit">
                        Back to Shopping
                      </button>
                    </Link>
                  </section>
                ) : (
                  <section className="w-[100%] space-y-6">
                    {userOrders &&
                      userOrders.map((order) => {
                        const diArr = order.ordered_items
                          ? order.ordered_items.filter(
                              (item) =>
                                item.defaultImage.includes("placeholder") ===
                                false
                            )
                          : null;

                        const di = diArr ? diArr[0] : null;

                        const diUrl = di
                          ? "https://res.cloudinary.com/dxhq8jlxf/" +
                            di.defaultImage.replace(/ /g, "%20")
                          : "#";

                        const paidDate = new Date(
                          order.paid_at
                        ).toLocaleString();

                        return (
                          <section
                            className="w-full bg-white rounded-md p-4 flex flex-col space-y-2 lg:space-y-0 lg:flex-row items-center justify-center lg:justify-between dark:text-black"
                            key={order.id}
                          >
                            <section className="flex items-start justify-between w-[100%] flex-wrap">
                              <section className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] md3:w-[150px] md3:h-[150px] hidden sm:block p-1">
                                <img
                                  src={diUrl}
                                  alt={order.reference}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </section>

                              <section className="flex flex-col items-start space-y-2 w-full sm:w-[70%] md:w-[60%] md2:w-[70%] lg2:w-[55%]">
                                <section className="text-lg uppercase">
                                  Order {order.reference && order.reference} -{" "}
                                  {paidDate}
                                </section>
                                <section className="text-md text-[#868686]">
                                  No. of Items:{" "}
                                  {order.ordered_items &&
                                    order.ordered_items.length}
                                </section>
                                <section className="text-md text-[#868686]">
                                  Payment Type:{" "}
                                  {order.payment_type && order.payment_type}
                                </section>
                                <section className="text-md text-black font-semibold">
                                  Amount: ???
                                  {numbersWithCommas(
                                    order.amount && order.amount
                                  )}
                                </section>
                              </section>

                              <Link
                                href={`/orders/${
                                  order.reference && order.reference
                                }`}
                              >
                                <button className="bg-primary rounded-sm px-5 py-3 text-white hover:bg-black cursor-pointer w-full mt-3 lg2:w-fit lg2:mt-0">
                                  View Details
                                </button>
                              </Link>
                            </section>
                          </section>
                        );
                      })}
                  </section>

                  // <section
                  //   className="px-5 py-3 text-red-500 hover:text-black text-xl cursor-pointer w-full flex items-center justify-center uppercase font-semibold"
                  //   onClick={() => {
                  //     appStateDispatch({
                  //       type: "CLEAR_WISHLIST",
                  //     });
                  //     toast.error(`Orders Cleared`);
                  //   }}
                  // >
                  //   <span>Clear All</span>
                  // </section>
                )}
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default orders;
