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
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const { setIsNeedToReload } = useSelector((state) => state.globalState);
  const handleDelete = () => {
    onOpenModal();
  };

  const handleConfirmDelete = async (id) => {
    const response = await dispatch(deleteAnOrder(id));
    if (response.meta.requestStatus === "fulfilled") {
    }
    onCloseModal();
  };
  return (
    <>
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
          <button className="btn" disabled={isPaid} onClick={handleDelete}>
            <MdDeleteOutline className="icon-delete" />
          </button>
        </td>
      </tr>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="contaner my-5">
          <h4>Are you sure, you want to delete?</h4>
          <div className="mt-4">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => handleConfirmDelete(_id)}
            >
              Confirm
            </button>
            <button className="btn btn-outline-primary" onClick={onCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const MyOrder = () => {
  const dispatch = useDispatch();
  const { isOrderDataLoading, myOrders, user, isUserLoading, needToReload } =
    useSelector((state) => state.globalState);

  useEffect(() => {
    dispatch(getMyOrders(user.uid));
  }, [needToReload]);
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
