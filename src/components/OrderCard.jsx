import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { db } from "../firebase";

function OrderCard({ order }) {
  const [accordion, setAccordion] = useState(false);

  async function handleConfirmOrder() {
    const orderRef = doc(db, "orders", order.orderId);

    await updateDoc(orderRef, {
      orderStatus: 1,
    }).then((data) => {
      console.log("Data Updated", data);
    });
  }

  return (
    <>
      <div className="w-full border border-orange-500 rounded-md my-5">
        <div className="flex justify-between items-center p-2 border-b border-orange-500">
          <div>
            <div>
              <span className="italic text-sm font-bold mr-1 text-gray-500">
                Order ID:
              </span>
              <span className="not-italic font-bold">{order?.orderId}</span>
            </div>
            <div>
              <span className="italic text-sm font-bold mr-1 text-gray-500">
                Number of Ordered Items:
              </span>
              <span className="not-italic font-bold">2</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">
              Total Price: <span className="underline">245</span>
            </p>
            {order?.orderStatus === 0 ? (
              <button
                onClick={() => {
                  handleConfirmOrder();
                }}
                className="px-2 bg-orange-500 rounded-lg text-center cursor-pointer py-1 font-semibold text-white m-1"
              >
                Confirm Order
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="divide-y-2 transition-all duration-300">
          <div className="p-2">
            <div className="flex justify-start items-center gap-2">
              <p className="text-sm font-bold">Order Items</p>
              <button
                onClick={() => {
                  setAccordion(!accordion);
                }}
              >
                {accordion ? (
                  <BsCaretUpFill className="text-orange-500" />
                ) : (
                  <BsCaretDownFill className="text-orange-500" />
                )}
              </button>
            </div>
          </div>
          {accordion ? (
            ""
          ) : (
            <div className="p-2 text-sm">
              <table className="text-left">
                <tr>
                  <th className="px-10">Dish Id</th>
                  <th className="px-10">Dish Name</th>
                  <th className="px-10">Count</th>
                </tr>
                {order.basketItems.map((basketItem) => {
                  return (
                    <tr>
                      <td className="px-10">{basketItem?.dishId}</td>
                      <td className="px-10">{basketItem?.dishName}</td>
                      <td className="px-10">{basketItem?.dishCounts}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderCard;
