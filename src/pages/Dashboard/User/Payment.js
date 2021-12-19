import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Shared/Loading";
import { getMyOrders } from "../../../globalState/GlobalStateSlice";
import { Link } from "react-router-dom";

const PaymentItem = ({
  orderType,
  numClothes,
  pickUpdate,
  isPaid,
  totalCost,
  index,
  _id,
}) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{orderType}</td>
      <td>{numClothes}</td>
      <td>{pickUpdate}</td>
      <td>{totalCost}</td>
      <td>
        {isPaid ? (
          <span className="badge bg-success text-light p-2">Paid</span>
        ) : (
          <Link className="btn btn-primary" to={`${_id}`}>
            Pay Now
          </Link>
        )}
      </td>
    </tr>
  );
};

const Payment = () => {
  const dispatch = useDispatch();
  const [isPaymentLoading, setIsPaymentLoading] = useState(true);
  const { isOrderDataLoading, myOrders, user } = useSelector(
    (state) => state.globalState
  );

  useEffect(async () => {
    if (user) {
      const orders = await dispatch(getMyOrders(user.uid));

      if (orders.meta.requestStatus === "fulfilled") {
        setIsPaymentLoading(false);
      }
    }
  }, []);

  console.log(myOrders);

  if (isPaymentLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>payment</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order Type</th>
            <th scope="col">Total Clothes</th>
            <th scope="col">Pickup Date</th>
            <th scope="col">Cost</th>
            <th scope="col">Payment</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((item, index) => (
            <PaymentItem key={item._id} {...item} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
