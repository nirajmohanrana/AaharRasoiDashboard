import React from "react";
import OrderCard from "./OrderCard";

function OrderHistory() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="font-semibold tracking-wider text-lg m-2 px-2 transition-all duration-300 hover:text-orange-500 cursor-pointer">
          Previous Orders
        </h4>
      </div>
      <div className="p-4">
        <OrderCard />
      </div>
    </>
  );
}

export default OrderHistory;
