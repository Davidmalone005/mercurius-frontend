import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { getSession, signOut } from "next-auth/react";
import { Sidebar } from "../../../components";
import { FiMenu, FiPackage, FiEdit } from "react-icons/fi";
import { FaEnvelope, FaHeart } from "react-icons/fa";
import { MdClose, MdInventory } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";

const addresses = ({}) => {
  const router = useRouter();
  const [userStatus, setUserStatus] = useState(null);

  const {
    appState: { cart },
    tabbed,
    setTabbed,
    setUserInfo,
  } = useAppContext();

  const handleSignOut = () => {
    window.localStorage.removeItem("UserData");
    setUserInfo(null);
    setUserStatus(null);
    signOut({ callbackUrl: "/register" });
  };

  const sidebarLinks = [
    {
      name: "Account",
      url: "/account",
      icon: <ImUser size={20} className="mr-2" />,
      active: true,
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
  const [addresses, setAddresses] = useState(null);

  let allAddresses2 = [];

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

      const allAddresses = fetch("https://mercurius-backend.up.railway.app/api/addresses/")
        .then((res) => res.json())
        .then((res) => {
          if (res.length > 0) {
            if (window.localStorage.getItem("UserData")) {
              const user = JSON.parse(window.localStorage.getItem("UserData"));
              if (user.id) {
                const addresses = res.filter(
                  (address) => address.user === user.id
                );

                setAddresses(addresses);
              }
            }
          }
        });
    }
  }, []);

  const deleteAddress = (addressId) => {
    const options = {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ addressId: addressId }),
    };

    fetch(`https://mercurius-backend.up.railway.app/api/addresses/${addressId}/delete/`, options);
    router.reload(window.location.pathname);
  };

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Addresses | Best Thrift Store in Nigeria</title>
      </Head>

      {userStatus && userStatus.error ? (
        <section className="w-full p-12 grid place-items-center text-center">
          <h4 className="text-xl text-primary text-center">
            Please, complete your Account registration. Or Login with your
            registered email address!
          </h4>
          <Link href="#">
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
              <section className="grid place-items-center sm2:hidden w-[40px] h-[40px] ml-1 font-bold duration-300 cursor-pointer">
                {/* grid place-items-center sm2:hidden w-[40px] h-[40px] absolute
                -top-[40px] left-[8px] font-bold duration-300 cursor-pointer */}
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
                } sm2:w-[200px] h-full px-[15px] py-[20px] md:px-[20px] md:py-[35px] flex items-start justify-between relative duration-300`}
              >
                <Sidebar links={sidebarLinks} asideOpen={asideOpen} />
              </section>
            </section>

            <section
              className={`bg-[#F1F1F1] w-[100%] flex flex-col items-center justify-center scroll-smooth duration-500`}
            >
              {/* whitespace-nowrap overflow-x-scroll scrollbar-none */}
              <section className="w-full sticky top-0 left-0 bg-black text-white px-4 py-3 md:px-6 md:py-4 mb-5 md:mb-8 flex items-center justify-start z-30">
                <Link href="/account">
                  <BsArrowLeft
                    size={25}
                    className="p-0 m-0 mr-4 cursor-pointer hover:text-primary duration-300"
                  />
                </Link>
                <h3 className="text-xl">Addresses</h3>
              </section>

              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 z-20 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-3 duration-500`}
              >
                <section className="w-full flex items-center justify-end">
                  <Link href="/account/addresses/add-address">
                    <button className="bg-black rounded-sm px-5 py-3 mb-4 text-white hover:bg-primary cursor-pointer w-fit">
                      Add New Address
                    </button>
                  </Link>
                </section>

                {addresses &&
                  addresses.map((address) => {
                    return (
                      <section className="w-full" key={address.id}>
                        <section className="w-full bg-white rounded-md p-4 dark:text-black">
                          <section className="flex items-start justify-between mb-6">
                            <h3 className="text-lg text-black font-semibold">
                              Address
                            </h3>
                            <Link
                              href={`/account/addresses/update-address/${address.id}/`}
                              className="cursor-pointer hover:text-primary duration-300"
                            >
                              <FiEdit size={25} className="p-0 m-0" />
                            </Link>
                          </section>

                          <section className="flex flex-col items-start text-[#868686] space-y-1  w-full sm2:w-[50%] md3:w-[35%]">
                            <p>
                              No. {address.house_no}, {address.street_name},{" "}
                              {address.bus_stop}, {address.lga}{" "}
                              {address.postal_code !== 0 && address.postal_code}
                              , {address.state}, {address.country}.
                            </p>
                          </section>
                        </section>

                        <section className="w-full flex items-center justify-end mt-3">
                          <button
                            className="rounded-sm px-0 py-0 text-black hover:text-red-500 cursor-pointer w-fit flex items-center justify-center"
                            onClick={() => {
                              deleteAddress(address.id);
                            }}
                          >
                            <span>Delete Address</span>
                          </button>
                        </section>
                      </section>
                    );
                  })}

                {/* end of address card */}
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default addresses;
