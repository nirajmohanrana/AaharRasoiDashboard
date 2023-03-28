import React, { useState } from "react";
import EditFood from "./EditFood";

function FoodCard({ dish }) {
  const [editVis, setEditVis] = useState(false);

  return (
    <>
      <div
        className="m-2 border border-orange-500 h-48 rounded-md overflow-clip cursor-pointer relative"
        onClick={() => {
          setEditVis(true);
        }}
        title={`${dish.dishName}\n${dish.dishDesc}`}
      >
        <div className="h-3/4 w-full overflow-clip">
          <img
            src={dish.dishImgUrl}
            alt={dish.dishName}
            className="h-full w-full transition-all object-cover duration-300 hover:scale-110"
          />
        </div>
        <div className="h-1/4 w-full px-2 flex justify-between items-center border-t border-orange-500 z-50">
          <h4 className="flex-1 truncate font-semibold text-orange-500">
            {dish.dishName}
          </h4>
          <p className="text-xs bg-orange-500 text-white font-bold rounded-full aspect-square p-[2px] flex justify-center items-center">
            ₹{dish.dishPrice}
          </p>
        </div>
      </div>

      {editVis ? <EditFood setEditVis={setEditVis} dish={dish} /> : ""}
    </>
  );
}

export default FoodCard;
