import React, { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";

function EditFood({ setEditVis, dish }) {
  const [dishImg, setDishImg] = useState({
    file: null,
    imageString: null,
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("name:", e.target[0].value);
    console.log("price:", e.target[1].value);
    console.log("image:", dishImg.file);
    console.log("image:", dish.image);
    console.log("description:", e.target[3].value);
  }

  return (
    <div className="bg-white border border-orange-500 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl z-50">
      {/* Close Button */}
      <div className="w-full flex justify-end">
        <BsXCircleFill
          className="text-xl text-orange-500 m-1 cursor-pointer"
          onClick={() => {
            setEditVis(false);
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
                  defaultValue={dish.dishName}
                />
              </div>

              {/* PRICE */}
              <div className="mt-10">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="dish-price"
                >
                  Dish Price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="dish-price"
                  type="text"
                  defaultValue={dish.dishPrice}
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
                  src={
                    dishImg.imageString ? dishImg.imageString : dish.dishImgUrl
                  }
                  alt={dish.dishName}
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
                        console.log(event.target.result);
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
                defaultValue={dish.dishDesc}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 my-4">
            <div className="w-full md:w-1/2 px-3 flex justify-center items-center mb-6 md:mb-0">
              <button
                type="reset"
                onClick={() => {
                  setEditVis(false);
                }}
                className="border border-gray-800 hover:border-transparent bg-gray-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-gray-200 uppercase tracking-wider text-sm font-bold m-1 p-1"
              >
                Close
              </button>
            </div>
            <div className="w-full flex justify-center items-center md:w-1/2 px-3">
              <button
                type="submit"
                className="border border-orange-500 hover:border-transparent hover:bg-orange-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-orange-500 hover:text-white uppercase tracking-wider text-sm font-bold m-1 p-1"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFood;
