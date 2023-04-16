import { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import { collection, onSnapshot, query } from "firebase/firestore";

import AppBar from "../components/AppBar";
import Menu from "../components/Menu";
import Orders from "../components/Orders";
import OrderHistory from "../components/OrderHistory";
import Restaurants from "../assets/restaurants.json";

import { auth, db } from "../firebase";

import { BsFillStarFill } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";

import { onAuthStateChanged, signOut } from "firebase/auth";

function Dashboard() {
  const res = Restaurants[0];

  const [rasoiUser, setRasoiUser] = useState(null);

  const navigate = useNavigate();

  async function handleLogOut() {
    await signOut(auth)
      .then(() => {
        navigate("/rasoi-login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      alert("PLEASE VERIFY YOUR ACCOUNT");
    }

    const authChange = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "rasoi-users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const usersData = [];

          querySnapshot.forEach((doc) => {
            usersData.push({ id: doc.id, ...doc.data() });
          });

          const userData = usersData.find((u) => u.rasoiId === user.uid);
          setRasoiUser(userData);
          return unsubscribe;
        });
      } else {
        handleLogOut();
      }
    });

    return authChange;
  }, []);

  return (
    <>
      {rasoiUser ? (
        <div className="dashboard flex">
          <AppBar />
          <div className="w-full h-full">
            <div className="p-2 divide-y">
              <div className="flex justify-between">
                <div className="m-2 flex items-start gap-2">
                  <img
                    src={
                      rasoiUser.rasoiLogo ||
                      "https://cdn.iconscout.com/icon/premium/png-256-thumb/account-157-425639.png"
                    }
                    alt={rasoiUser.rasoiName || "Aahar Kitchen"}
                    className="w-14 aspect-square object-contain rounded-full border cursor-pointer border-orange-500"
                  />
                  <div>
                    <h4 className="font-bold tracking-wide text-xl text-orange-600 cursor-pointer">
                      {rasoiUser.rasoiName || "Aahar Kitchen"}
                    </h4>
                    <div className="flex gap-1 items-center text-orange-400">
                      <BsFillStarFill />
                      <p className="font-bold">{res.rating}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center mr-6">
                  <div className="self-end flex flex-col justify-center items-end">
                    <button
                      title={rasoiUser.formattedAddress}
                      className="flex gap-1 justify-center items-center text-sm border border-gray-500 text-gray-500 rounded-lg px-1 py-px"
                    >
                      <BiCurrentLocation />
                      <span>Address</span>
                    </button>
                    <p
                      className={`${
                        auth.currentUser.emailVerified
                          ? "text-green-500 text-xs font-semibold"
                          : "text-red-700 text-xs cursor-pointer animate-pulse font-bold"
                      }`}
                      title={`${
                        auth.currentUser.emailVerified
                          ? ""
                          : "Please Verify Your Account"
                      }`}
                    >
                      {rasoiUser.rasoiMail}
                    </p>
                  </div>
                  <button title="Log Out">
                    <AiOutlineLogout
                      className="text-orange-500 hover:scale-125 transition-all duration-300 cursor-pointer text-2xl ml-6"
                      onClick={handleLogOut}
                    />
                  </button>
                </div>
              </div>

              <Routes>
                <Route
                  path="/menu"
                  element={<Menu res={res} rasoiUser={rasoiUser} />}
                />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order-history" element={<OrderHistory />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="w-screen h-screen flex justify-center items-center cursor-pointer text-base underline text-blue-700"
            onClick={() => {
              navigate("/rasoi-login");
            }}
          >
            Please Login
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
