import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import AddFood from "./AddFood";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Menu({ rasoiUser }) {
  const [addVis, setAddVis] = useState(false);

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const fetchFoodList = async () => {
      const foodsSnap = await getDoc(doc(db, "food-items", rasoiUser.id));
      if (foodsSnap.exists()) {
        setFoodList(foodsSnap.data().foods);
      } else {
        console.log("No such document!");
      }
    };

    fetchFoodList();
  }, [setFoodList]);

  console.log("foodList:", foodList);

  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="font-semibold tracking-wider text- m-2 px-2 transition-all duration-300 hover:text-orange-500 cursor-pointer">
          Menu
        </h4>
        <button
          onClick={() => {
            setAddVis(true);
          }}
          className="px-2 bg-orange-500 rounded-lg text-center cursor-pointer p-1 font-bold text-white tracking-wider m-2"
        >
          Add New
        </button>
      </div>
      <div className="m-2 grid grid-cols-5 gap-2 overflow-y-auto">
        {foodList
          ? foodList.map((dish, i) => {
              return <FoodCard dish={dish} key={i} />;
            })
          : ""}
      </div>

      {addVis ? <AddFood setAddVis={setAddVis} rasoiUser={rasoiUser} /> : ""}
    </>
  );
}

export default Menu;
