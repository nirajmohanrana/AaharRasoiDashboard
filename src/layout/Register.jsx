import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsPinMapFill } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";

import axios from "axios";

import { db, auth, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const [rasoiLogo, setRasoiLogo] = useState({
    file: null,
    imageString: null,
  });
  const [rasoiImgUrl, setRasoiImgUrl] = useState(null);
  const [rasoiName, setRasoiName] = useState("");
  const [rasoiPhone, setRasoiPhone] = useState("");
  const [rasoiMail, setRasoiMail] = useState("");
  const [rasoiPassword, setRasoiPassword] = useState("");
  const [addressLine1, setAddressLine1] = useState(null);
  const [addressLine2, setAddressLine2] = useState(null);
  const [addressLoc, setAddressLoc] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const showPosition = async (position) => {
    const { latitude, longitude } = position.coords;

    const API_KEY2 = "9c695dcb7e9548551b27cded65f99721";
    const API_KEY = "a3c6cf093facc41702836f520b0ba663";
    const url = `https://apis.mappls.com/advancedmaps/v1/9c695dcb7e9548551b27cded65f99721/rev_geocode?lat=${latitude}&lng=${longitude}`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      console.log(res.data);
      setAddressLoc(res.data.results[0]);
      setAddressLine2(res.data.results[0].formatted_address);
    } catch (error) {}
  };

  async function handleCurrentLoacation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log(navigator.geolocation);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, rasoiMail, rasoiPassword)
      .then(async (userCredential) => {
        const storageRef = ref(
          storage,
          `rasoi-users/${
            rasoiName + "-" + userCredential.user.uid.slice(0, 11)
          }/images/${rasoiLogo.file.name}`
        );

        await uploadBytes(storageRef, rasoiLogo.file, rasoiLogo.file.type).then(
          async (snapshot) => {
            await getDownloadURL(snapshot.ref)
              .then(async (downloadURL) => {
                setRasoiImgUrl(downloadURL);
              })
              .finally(() => {
                setFormSubmitted(true);
              })
              .catch((err) => {
                console.log("url err", err);
              });
          }
        );

        sendEmailVerification(auth.currentUser)
          .then(() => {
            alert(
              "Sent Email Verification Link to your given E-Mail Address \nPlease Verify It!!"
            );
          })
          .then(() => {
            navigate("/rasoi-login");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          alert("Email Already In Use");
        }
      });
  }

  useEffect(() => {
    if (auth.currentUser && rasoiLogo && formSubmitted) {
      updateProfile(auth.currentUser, {
        displayName: rasoiName,
        photoURL: rasoiImgUrl,
      })
        .then(() => {
          updatePhoneNumber(auth.currentUser, rasoiPhone);
        })
        .catch((err) => {
          console.log("updateProfile err", err);
        });

      setDoc(doc(db, "rasoi-users", auth.currentUser.uid), {
        rasoiId: auth.currentUser.uid,
        rasoiName: rasoiName,
        rasoiPhone: rasoiPhone,
        rasoiMail: rasoiMail,
        rasoiLogo: rasoiImgUrl,
        formattedAddress: `${addressLine1} ${addressLine2}`,
        latitude: addressLoc.lat,
        longitude: addressLoc.lng,
        locality: addressLoc.locality,
        city: addressLoc.city,
        state: addressLoc.state,
        country: addressLoc.area,
        pincode: addressLoc.pincode,
      });
    }
  }, [auth, formSubmitted, rasoiLogo]);

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate relative"></div>
      <div className="bg-white border border-orange-500 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl z-50">
        <div className="flex w-full justify-center items-center px-5 py-2">
          <form
            className="w-full max-w-lg"
            onSubmit={(e) => {
              handleRegisterSubmit(e);
            }}
          >
            <div className="h-96 overflow-y-scroll p-2 overflow-x-hidden">
              {/* Email */}
              <div className="flex flex-wrap -mx-3 my-2">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="rasoi-mail"
                  >
                    Rasoi E-Mail Address
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="rasoi-mail"
                    type="text"
                    placeholder="aahar@rasoi.com"
                    required
                    value={rasoiMail}
                    onChange={(e) => {
                      setRasoiMail(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-wrap -mx-3 my-2">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="rasoi-password"
                  >
                    Rasoi Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="rasoi-password"
                    type="password"
                    placeholder="********"
                    required
                    value={rasoiPassword}
                    onChange={(e) => {
                      setRasoiPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  {/* NAME */}
                  <div>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="rasoi-name"
                    >
                      Rasoi Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="rasoi-name"
                      type="text"
                      value={rasoiName}
                      required
                      placeholder="Aahar ki Rasoi"
                      onChange={(e) => {
                        setRasoiName(e.target.value);
                      }}
                    />
                  </div>

                  {/* PHONE NUMBER */}
                  <div>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2"
                      htmlFor="dish-name"
                    >
                      Rasoi Phone Number
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="rasoi-phone"
                      type="number"
                      value={rasoiPhone}
                      required
                      placeholder="+91 98989 76767"
                      onChange={(e) => {
                        setRasoiPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 px-3">
                  <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Rasoi Logo
                  </p>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <img
                      src={
                        rasoiLogo.imageString
                          ? rasoiLogo.imageString
                          : "https://gdurl.com/Ffc1"
                      }
                      alt={
                        rasoiLogo.file ? rasoiLogo.file.name : "Image Preview"
                      }
                      className="h-24 object-scale-down w-full"
                    />
                    <label className="border border-orange-500 hover:border-transparent hover:bg-orange-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-orange-500 hover:text-white">
                      <span className="block uppercase tracking-wider text-xs font-bold m-1">
                        Change Image
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        required
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setRasoiLogo({
                            file: file,
                          });
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setRasoiLogo({
                              file: file,
                              imageString: event.target.result,
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex flex-wrap -mx-3 my-2">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="rasoi-loacation"
                  >
                    Rasoi Address
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="rasoi-line1"
                    type="text"
                    placeholder="Address Line 1"
                    defaultValue={addressLine1}
                    onChange={(e) => {
                      setAddressLine1(e.target.value);
                    }}
                  />
                  <div className="flex items-center">
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="rasoi-line2"
                      type="text"
                      defaultValue={addressLine2}
                      placeholder="Address Line 2"
                      onChange={(e) => {
                        setAddressLine2(e.target.value);
                      }}
                    />
                    <div
                      className="m-1 p-3 h-full bg-orange-500 rounded-md cursor-pointer"
                      onClick={handleCurrentLoacation}
                    >
                      <BsPinMapFill className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 my-4">
              <div className="w-full md:w-1/2 px-3 flex justify-center items-center mb-6 md:mb-0">
                <button
                  type="reset"
                  className="border border-gray-800 hover:border-transparent bg-gray-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-gray-200 uppercase tracking-wider text-sm font-bold m-1 p-1"
                >
                  Reset
                </button>
              </div>
              <div className="w-full flex justify-center items-center md:w-1/2 px-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="border border-orange-500 hover:border-transparent hover:bg-orange-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-orange-500 hover:text-white uppercase tracking-wider text-sm font-bold m-1 p-1 flex justify-center items-center"
                >
                  {isLoading ? (
                    <BiLoaderCircle className="text-xl text-orange-500 hover:text-white animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
              Already Registered?{" "}
              <Link to="/rasoi-login" className="underline text-blue-700">
                Login Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
