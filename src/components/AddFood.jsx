import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsXCircleFill } from "react-icons/bs";
import { db, storage } from "../firebase";

function AddFood({ setAddVis, rasoiUser }) {
  const [dishImg, setDishImg] = useState({
    file: null,
    imageString: null,
  });

  const [formData, setFormData] = useState({
    dishName: "",
    dishType: "veg",
    dishPrice: "",
    dishDesc: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dishImgUrl, setDishImgUrl] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const storageRef = ref(
      storage,
      `rasoi-users/${rasoiUser.id}/images/${dishImg.file.name}`
    );

    await uploadBytes(storageRef, dishImg.file, dishImg.file.type).then(
      async (snapshot) => {
        await getDownloadURL(snapshot.ref)
          .then(async (downloadURL) => {
            setDishImgUrl(downloadURL);
            console.log(downloadURL);
          })
          .finally(() => {
            setFormSubmitted(true);
          });
      }
    );
  }

  useEffect(() => {
    if (rasoiUser && formSubmitted && dishImgUrl) {
      const rasoiUserDocRef = doc(db, "rasoi-users", rasoiUser.id);
      const foodRef = collection(rasoiUserDocRef, "food-items");

      addDoc(foodRef, {
        dishName: formData.dishName,
        dishType: formData.dishType,
        dishPrice: formData.dishPrice,
        dishImgUrl: dishImgUrl,
        dishDesc: formData.dishDesc,
      }).then((docRef) => {
        const foodItemRef = doc(foodRef, docRef.id);
        updateDoc(foodItemRef, {
          foodId: docRef.id,
        }).then(() => console.log("updated"));
        alert(`${formData.dishName} has successfully uploaded`);
        setAddVis(false);
      });
    }
  }, [dishImgUrl, rasoiUser, formSubmitted]);

  return (
    <>
      <div className="absolute w-screen h-screen top-0 left-0 bg-orange-500/40" />
      <div className="bg-white border border-orange-500 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl z-50">
        {/* Close Button */}
        <div className="w-full flex justify-end">
          <BsXCircleFill
            className="text-xl text-orange-500 m-1 cursor-pointer"
            onClick={() => {
              setAddVis(false);
            }}
          />
        </div>

        <div className="flex w-full h-full justify-center items-center px-10">
          <form
            className="w-full max-w-lg"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                {/* NAME */}
                <div>
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="dish-name"
                  >
                    Dish Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="dish-name"
                    type="text"
                    placeholder="Add Food Name Here"
                    required
                    value={formData.dishName}
                    onChange={(e) => {
                      setFormData({
                        dishName: e.target.value,
                        dishType: formData.dishType,
                        dishPrice: formData.dishPrice,
                        dishDesc: formData.dishDesc,
                      });
                    }}
                  />
                </div>

                {/* NAME */}
                <div>
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-5"
                    htmlFor="dish-type"
                  >
                    Dish Type
                  </label>
                  <select
                    id="dish-type"
                    className={`block w-full 
                    ${
                      formData.dishType === "veg"
                        ? `bg-green-400`
                        : "bg-red-400"
                    }
                    border-px text-gray-700 font-semibold border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none
                    ${
                      formData.dishType === "veg"
                        ? `focus:bg-green-300`
                        : "focus:bg-red-300"
                    }
                    focus:border-gray-500`}
                    required
                    onChange={(e) => {
                      setFormData({
                        dishName: formData.dishName,
                        dishType: e.target.value,
                        dishPrice: formData.dishPrice,
                        dishDesc: formData.dishDesc,
                      });
                    }}
                  >
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non Veg</option>
                  </select>
                </div>

                {/* PRICE */}
                <div className="mt-5">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="dish-price"
                  >
                    Dish Price
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="dish-price"
                    type="number"
                    placeholder="Add Price of Food Here"
                    required
                    value={formData.dishPrice}
                    onChange={(e) => {
                      setFormData({
                        dishName: formData.dishName,
                        dishType: formData.dishType,
                        dishPrice: Math.abs(e.target.value),
                        dishDesc: formData.dishDesc,
                      });
                    }}
                  />
                </div>
              </div>

              {/* Image */}
              <div className="w-full md:w-1/2 px-3">
                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Dish Image
                </p>
                <div className="flex flex-col justify-center items-center gap-1">
                  <img
                    src={dishImg.imageString ? dishImg.imageString : ""}
                    alt={dishImg.file ? dishImg.file.name : "Add Dish Image"}
                    className="h-40 w-full object-cover"
                  />
                  <label className="border border-orange-500 hover:border-transparent hover:bg-orange-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-orange-500 hover:text-white">
                    <span className="block uppercase tracking-wider text-xs font-bold m-1">
                      Change Image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setDishImg({
                          file: file,
                        });
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setDishImg({
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
            <div className="flex flex-wrap -mx-3 my-2">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="dish-description"
                >
                  Dish Description
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="dish-description"
                  type="text"
                  placeholder="Add Description Here"
                  value={formData.dishDesc}
                  required
                  onChange={(e) => {
                    setFormData({
                      dishName: formData.dishName,
                      dishType: formData.dishType,
                      dishPrice: formData.dishPrice,
                      dishDesc: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 my-4">
              <div className="w-full md:w-1/2 px-3 flex justify-center items-center mb-6 md:mb-0">
                <button
                  type="reset"
                  onClick={() => {
                    setAddVis(false);
                  }}
                  className="border border-gray-800 hover:border-transparent bg-gray-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-gray-200 uppercase tracking-wider text-sm font-bold m-1 p-1"
                >
                  Close
                </button>
              </div>
              <div className="w-full flex justify-center items-center md:w-1/2 px-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="border border-orange-500 hover:border-transparent hover:bg-orange-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-orange-500 hover:text-white uppercase tracking-wider text-sm font-bold m-1 p-1 flex justify-center items-center"
                >
                  {isLoading ? (
                    <BiLoaderCircle className="text-xl animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddFood;
