import React, { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

function OrderCard() {
  const [accordion, setAccordion] = useState(false);
  return (
    <>
      <div className="w-full border border-orange-500 rounded-md">
        <div className="flex justify-between items-center p-2 border-b border-orange-500">
          <div>
            <div>
              <span className="italic text-sm font-bold mr-1 text-gray-500">
                Order ID:
              </span>
              <span className="not-italic font-bold">12345</span>
            </div>
            <div>
              <span className="italic text-sm font-bold mr-1 text-gray-500">
                Number of Ordered Items:
              </span>
              <span className="not-italic font-bold">2</span>
            </div>
          </div>
          <div>
            <p className="font-bold">
              Total Price: <span className="underline">245</span>
            </p>
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
              <div>
                <p>
                  Rajma <span>123</span>
                </p>
              </div>
              <div>
                <p>
                  Rajma <span>123</span>
                </p>
              </div>
              <div>
                <p>
                  Rajma <span>123</span>
                </p>
              </div>
              <div>
                <p>
                  Rajma <span>123</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderCard;
