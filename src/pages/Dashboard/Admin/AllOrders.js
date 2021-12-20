import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrder } from "../../../globalState/GlobalStateSlice";
import Loading from "../../Shared/Loading";
import OrderItem from "../Shared/OrderItem";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { adminAllOrders, needToReload } = useSelector(
    (state) => state.globalState
  );
  const [adminOrderLoading, setAdminOrderLoading] = useState(true);

  console.log(adminAllOrders);
  useEffect(async () => {
    const orders = await dispatch(getAllOrder());
    console.log(orders);
    if (orders.meta.requestStatus === "fulfilled") {
      setAdminOrderLoading(false);
    }
  }, [needToReload]);

  return (
    <div>
      <h1>All Orders</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order Type</th>
            <th scope="col">Total Clothes</th>
            <th scope="col">Pickup Date</th>
            <th scope="col">Cost</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Payment</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {adminOrderLoading ? (
          <Loading />
        ) : (
          <tbody>
            {adminAllOrders.map((item, index) => (
              <OrderItem key={item._id} {...item} index={index} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default AllOrders;
