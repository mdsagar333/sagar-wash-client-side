import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./pages/Home/Footer/Footer";
import Header from "./pages/Home/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import {
  checkUserSignInOrNot,
  loadServiceData,
} from "./globalState/GlobalStateSlice";
import { useDispatch } from "react-redux";
import SingleService from "./pages/SignleService/SingleService";
import PrivateRoute from "./pages/Shared/PrivateRoute/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyOrder from "./pages/Dashboard/User/MyOrder";
import Payment from "./pages/Dashboard/User/Payment";
import Checkout from "./pages/Dashboard/Checkout/Checkout";
import { useSelector } from "react-redux";
import Loading from "./pages/Shared/Loading";

function App() {
  const dispatch = useDispatch();
  const { isUserLoading } = useSelector((state) => state.globalState);

  useEffect(() => {
    console.log("from app use effect");
    dispatch(checkUserSignInOrNot());
  });

  useEffect(() => {
    dispatch(loadServiceData());
  }, []);

  if (isUserLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="service">
          <Route
            path=":serviceId"
            element={
              <PrivateRoute>
                <SingleService />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="my-orders"
            element={
              <PrivateRoute>
                <MyOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="payment"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="payment/:paymentId"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          ></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
