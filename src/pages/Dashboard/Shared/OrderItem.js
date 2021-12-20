import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { deleteAnOrder } from "../../../globalState/GlobalStateSlice";
import { Link } from "react-router-dom";

const OrderItem = ({
  orderType,
  numClothes,
  pickUpdate,
  isPaid,
  totalCost,
  index,
  userName,
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
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{orderType}</td>
      <td>{numClothes}</td>
      <td>{pickUpdate}</td>
      <td>{totalCost}</td>
      <td>{userName}</td>
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
        <Link to={`order-details/${_id}`}>
          <CgDetailsMore className="icon-delete" />
        </Link>
      </td>
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
    </tr>
  );
};

export default OrderItem;
