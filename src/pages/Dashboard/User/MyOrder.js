import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyOrders,
  deleteAnOrder,
} from "../../../globalState/GlobalStateSlice";
import Loading from "../../Shared/Loading";
import { MdDeleteOutline } from "react-icons/md";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const OrderItem = ({
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
          <span className={`${isPaid ? "badge bg-success p-2" : ""}`}>
            Paid
          </span>
        ) : (
          "Not Paid"
        )}
      </td>
      <td>
        <button className="btn" disabled={isPaid} onClick={() => {}}>
          <MdDeleteOutline className="icon-delete" />
        </button>
      </td>
    </tr>
  );
};

const MyOrder = () => {
  const dispatch = useDispatch();
  const { isOrderDataLoading, myOrders, user, isUserLoading } = useSelector(
    (state) => state.globalState
  );

  useEffect(() => {
    dispatch(getMyOrders(user.uid));
  }, []);
  if (isOrderDataLoading) {
    return <Loading />;
  }

  if (myOrders.length === 0) {
    return (
      <>
        <h1>You haven't made any order yet!</h1>
      </>
    );
  }
  return (
    <>
      <div className="container">
        <h1>My Orders</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order Type</th>
              <th scope="col">Total Clothes</th>
              <th scope="col">Pickup Date</th>
              <th scope="col">Cost</th>
              <th scope="col">Payment</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((item, index) => (
              <OrderItem key={item._id} {...item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyOrder;
