import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "../../../globalState/GlobalStateSlice";
import Loading from "../../Shared/Loading";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { singleOrder } = useSelector((state) => state.globalState);
  const [isOrderLoading, setIsOrderLoading] = useState(true);

  console.log(singleOrder);
  useEffect(async () => {
    const order = await dispatch(getSingleOrder(orderId));
    if (order.meta.requestStatus === "fulfilled") {
      setIsOrderLoading(false);
    }
  }, [orderId]);

  return (
    <div>
      <h1>Order Details</h1>
      {isOrderLoading ? (
        <Loading />
      ) : (
        <div className="mt-4">
          <ul class="list">
            <p className="text-capitalize list-item">
              Order type : {singleOrder.orderType}
            </p>
            <p className="text-capitalize list-item">
              Payment Status : {singleOrder.isPaid ? "Paid" : "Not Paid"}
            </p>
            <p className="text-capitalize list-item">
              Customer Name : {singleOrder.userName}
            </p>
            <p className="text-capitalize list-item">
              Customer Address :{singleOrder.userAddress}
            </p>
            <p className="text-capitalize list-item">
              Customer Phone :{singleOrder.userPhone}
            </p>
            <p className="text-capitalize list-item">
              Total Cost : ${singleOrder.totalCost}
            </p>
            <p className="text-capitalize list-item">
              Folded : {singleOrder.isFolded}
            </p>
            <p className="text-capitalize list-item">
              Pickup Date : {singleOrder.pickUpdate}
            </p>
            <p className="text-capitalize">
              Total Clothes : {singleOrder.numClothes}
            </p>
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
