import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  setOrderService,
  createOrder,
  loadSingleService,
} from "../../globalState/GlobalStateSlice";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Loading from "../Shared/Loading";
import Header from "../Home/Header/Header";
import Footer from "../Home/Footer/Footer";

const SingleService = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const [confirmMessage, setConfirmMessage] = useState("");
  const { isSingleServiceLoading, user, singleService } = useSelector(
    (state) => state.globalState
  );
  const totalRef = useRef();
  const [orderInfo, setOrderInfo] = useState({
    numClothes: 1,
    pickUpdate: "",
    isFolded: "",
    totalCost: 0,
    userPhone: "",
    userAddress: "",
    userEmail: "",
    userInstruction: "",
    userName: "",
    userUid: null,
    isPaid: false,
    orderType: "",
  });
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleChange = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderInfo({
      ...orderInfo,
      totalCost: parseFloat(totalRef.current.innerHTML),
      orderType: type,
    });
    onOpenModal();
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setConfirmMessage("");
    const response = await dispatch(createOrder(orderInfo));
    console.log(response);
    if (response.meta.requestStatus === "fulfilled") {
      setConfirmMessage("Your order is created.");
    }
    onCloseModal();
  };

  useEffect(() => {
    dispatch(loadSingleService(serviceId));
  }, [serviceId]);

  useEffect(() => {
    if (user) {
      setOrderInfo({
        ...orderInfo,
        userName: user.displayName || "",
        userEmail: user.email || "",
        userUid: user.uid,
      });
    }
  }, [user]);

  if (isSingleServiceLoading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  // destructuring service property
  const { image, _id, servieTitle, perItem, text, type } = singleService;
  const total = perItem * parseInt(orderInfo.numClothes || 1);

  return (
    <>
      <Header />
      <div className="container mt-5">
        {confirmMessage && (
          <p className="alert alert-success">{confirmMessage}</p>
        )}
        <div className="row gx-5">
          <div className="col-12 col-md-6">
            <img src={image} alt="" className="img-fluid mb-4" />
            <p>{text}</p>
          </div>
          <div className="col-12 col-md-6">
            <h1 className="text-capitalize mb-5">{servieTitle}</h1>

            <form onSubmit={handleSubmit}>
              <h5 className="text-muted text-capitalize fw-bold">
                Choose Order Type
              </h5>
              <div className="">
                <p>
                  Per Item <span className="badge bg-primary">${perItem}</span>
                </p>
                <p>
                  Total Cost: $
                  <span className="badge bg-primary" ref={totalRef}>
                    {orderInfo.isFolded === "yes"
                      ? (total + (total / 100) * 10).toFixed(2)
                      : total}
                  </span>
                </p>
              </div>

              <div className="row my-4">
                <div className="col-12 col-md-6">
                  <h6 className="text-muted text-capitalize fw-bold">
                    Number of clothes
                  </h6>
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleChange}
                    name="numClothes"
                    value={orderInfo.numClothes}
                    min="1"
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <h6 className="text-muted text-capitalize fw-bold">
                    Folded (Extra 10% Applicable)
                  </h6>
                  <select
                    className="form-select fw-bold"
                    aria-label="Default select example"
                    onChange={handleChange}
                    name="isFolded"
                    value={orderInfo.isFolded}
                    required
                  >
                    <option value="" defaultValue>
                      Select Your Option
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div className="my-3">
                <h6 className="text-muted text-capitalize fw-bold">
                  Pick Up Date
                </h6>
                <input
                  type="date"
                  className="form-control"
                  name="pickUpdate"
                  onChange={handleChange}
                  value={orderInfo.pickUpdate}
                  required
                />
              </div>
              <button className="btn btn-primary text-capitalize mt-4">
                Confirm Order
              </button>
            </form>
          </div>
        </div>
        {/* modal */}
        <Modal open={open} onClose={onCloseModal} center>
          <div className="container">
            <h3>Mailing Address</h3>
            <form>
              <div className="mt-4" style={{ maxWidth: "700px" }}>
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        name="userName"
                        className="form-control"
                        value={orderInfo.userName}
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        name="userEmail"
                        className="form-control"
                        value={orderInfo.userEmail}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="number"
                        name="userPhone"
                        className="form-control"
                        required
                        value={orderInfo.userPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="">Address</label>
                      <input
                        type="address"
                        name="userAddress"
                        className="form-control"
                        value={orderInfo.userAddress}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <p htmlFor="">Special Instructions</p>
                      <textarea
                        name="userInstruction"
                        id=""
                        cols="20"
                        rows="5"
                        placeholder="Enter your instruction"
                        value={orderInfo.userInstruction}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-primary mt-3 ms-2"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default SingleService;
