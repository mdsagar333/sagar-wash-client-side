import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

// initializing firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// checking user sign in or not
export const checkUserSignInOrNot = createAsyncThunk(
  "global/getUser",
  async (thunkApi) => {
    // const res = await onAuthStateChanged(auth, (user) => {
    //   console.log(user);
    //   return user;
    // });
    const res = await new Promise((resolved, reject) => {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          return resolved(user);
        }
        reject(null);
      });
    });

    return res;
  }
);

// create user with email and password

export const createUserWithEmail = createAsyncThunk(
  "global/createUserWithEmail",
  async (user) => {
    const auth = getAuth();
    const { email, password, name } = user;
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    });

    const updatedUser = await updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      return auth.currentUser;
    });

    const registerUserInDb = await fetch(
      "https://murmuring-eyrie-08320.herokuapp.com/api/v1/users",
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: updatedUser.displayName,
          email: updatedUser.email,
          uid: updatedUser.uid,
          role: "user",
        }),
      }
    ).then((res) => res.json());

    console.log(registerUserInDb);

    return updatedUser;
  }
);

// login user with email password

export const loginUserWithEmail = createAsyncThunk(
  "global/loginUserWithEmail",
  async (user) => {
    const { email, password } = user;
    const loggedUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredential) => {
      const signedUser = userCredential.user;
      return signedUser;
    });

    return loggedUser;
  }
);

// signing out user
export const googleSignOut = createAsyncThunk(
  "global/googleSignOut",
  async (thunkApi) => {
    const auth = getAuth();
    signOut(auth).then(() => {});
  }
);

// signing in user using goolge
export const googleSignIn = createAsyncThunk(
  "global/googleSingin",
  async (thunkApi) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider)
      .then((result) => {
        return result.user;
      })
      .catch((err) => console.log(err));

    const newUser = {
      name: res?.displayName,
      uid: res?.uid,
      email: res?.email,
      role: "user",
    };

    const dbUser = await fetch(
      "https://murmuring-eyrie-08320.herokuapp.com/api/v1/users",
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    console.log(res);

    return res;
  }
);

export const loadServiceData = createAsyncThunk(
  "global/getServices",
  async () => {
    const res = await fetch(
      "https://murmuring-eyrie-08320.herokuapp.com/api/v1/services"
    ).then((result) => result.json());

    return res.services;
  }
);

// load single service

export const loadSingleService = createAsyncThunk(
  "global/getSingleService",
  async (id, thunkApi) => {
    const url = `https://murmuring-eyrie-08320.herokuapp.com/api/v1/services/${id}`;
    console.log(url);
    const service = await fetch(url).then((result) => result.json());

    return service.service;
  }
);

// creating order
export const createOrder = createAsyncThunk(
  "global/createOrder",
  async (info) => {
    const order = await fetch(
      "https://murmuring-eyrie-08320.herokuapp.com/api/v1/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }
    );

    return order;
  }
);
// get all order by user
export const getMyOrders = createAsyncThunk(
  "global/getMyOrders",
  async (userId) => {
    const url = `https://murmuring-eyrie-08320.herokuapp.com/api/v1/orders/${userId}`;
    const { orders } = await fetch(url).then((res) => res.json());
    console.log(orders);
    return orders;
  }
);

// get a single order

export const getOrderForPayment = createAsyncThunk(
  "global/getOrderForPayment",
  async (orderId) => {
    const url = `https://murmuring-eyrie-08320.herokuapp.com/api/v1/order/${orderId}`;
    const { order } = await fetch(url).then((res) => res.json());
    console.log(order);
    return order;
  }
);

// update order payment
export const updateOrderPayment = createAsyncThunk(
  "global/updateOrderPayment",
  async (id) => {
    const url = `https://murmuring-eyrie-08320.herokuapp.com/api/v1/update-order/${id}`;
    const updatedOrder = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ update: true }),
    }).then((res) => res.json());

    console.log(updatedOrder);
    return updatedOrder;
  }
);
// get all orders
export const getAllOrder = createAsyncThunk("global/getAllOrder", async () => {
  const { orders } = await fetch(
    "https://murmuring-eyrie-08320.herokuapp.com/api/v1/orders"
  ).then((res) => res.json());
  console.log(orders);
  return orders;
});

// get SIngle Order
export const getSingleOrder = createAsyncThunk(
  "global/getSingleOrder",
  async (id) => {
    const url = `https://murmuring-eyrie-08320.herokuapp.com/api/v1/order/${id}`;
    const { order } = await fetch(url).then((res) => res.json());
    return order;
  }
);

//delete an order
export const deleteAnOrder = createAsyncThunk(
  "global/deleteAnOrder",
  async (id) => {
    const url = `https://murmuring-eyrie-08320.herokuapp.com/api/v1/order/${id}`;
    const deleteOrder = await fetch(url, {
      method: "DELETE",
    });

    return deleteOrder;
  }
);

// get Adming

export const getAdmin = createAsyncThunk("global/getAdmin", async (id) => {
  const url = `https://murmuring-eyrie-08320.herokuapp.com/api/v1/admin/${id}`;
  console.log(url);
  const { isAdmin } = await fetch(url).then((res) => res.json());

  return isAdmin;
});

// get client secret

export const getClientSecretForPayment = createAsyncThunk(
  "global/getClientSecretPayment",
  async (price) => {
    const { clientSecret } = await fetch(
      "https://murmuring-eyrie-08320.herokuapp.com/create-payment-intent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ price }),
      }
    ).then((res) => res.json());
    console.log(clientSecret);
    return clientSecret;
  }
);

// initail state
const initialState = {
  services: [],
  user: null,
  isUserLoading: true,
  isDataLoading: true,
  isSingleServiceLoading: true,
  singleService: null,
  isOrderDataLoading: true,
  myOrders: [],
  singleOrder: null,
  paymentClientSecret: null,
  needToReload: 0,
  isAdmin: null,
  adminLoading: true,
  adminAllOrders: [],
};

// creating slice
export const globalStateSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setServices: (state) => {},

    setOrderService: (state, { payload }) => {
      state.orderService = { ...state.orderService, ...payload };
    },
    setIsNeedToReload: (state) => {
      state.needToReload = this.state.needToReload++;
    },
  },
  extraReducers: {
    [googleSignIn.pending]: (state) => {
      console.log("Signin google");
    },
    [googleSignIn.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [googleSignOut.pending]: () => {
      console.log("singout pending");
    },
    [googleSignOut.fulfilled]: (state, action) => {
      state.user = null;
    },
    [checkUserSignInOrNot.pending]: (state) => {
      console.log("on auth change pending");
      state.isUserLoading = true;
    },
    [checkUserSignInOrNot.fulfilled]: (state, { payload }) => {
      console.log("on auth change fullfiled", payload);

      if (payload) {
        state.user = payload;
      }
      state.isUserLoading = false;
    },
    [checkUserSignInOrNot.rejected]: (state, { payload }) => {
      console.log("on auth change rejected", payload);
      state.isUserLoading = false;
      state.user = null;
    },
    [loadServiceData.pending]: () => {
      console.log("Load data is pending");
    },
    [loadServiceData.fulfilled]: (state, { payload }) => {
      console.log("load data is fetched");
      if (payload) {
        state.services = [...payload];
      }
      state.isDataLoading = false;
    },
    [loadServiceData.rejected]: () => {
      console.log("Load data is rejected");
    },
    [createOrder.pending]: () => {
      console.log("Order creation pending");
    },
    [createOrder.fulfilled]: () => {
      console.log("Order created");
    },
    [createOrder.rejected]: (err) => {
      console.log(err);
    },
    [loadSingleService.pending]: (state) => {
      state.isSingleServiceLoading = true;
    },
    [loadSingleService.fulfilled]: (state, { payload }) => {
      state.isSingleServiceLoading = false;
      state.singleService = payload;
    },
    [getMyOrders.pending]: (state) => {
      state.isOrderDataLoading = true;
    },
    [getMyOrders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload;
      state.isOrderDataLoading = false;
    },
    [getOrderForPayment.pending]: () => {
      console.log("pending");
    },
    [getOrderForPayment.fulfilled]: (state, { payload }) => {
      console.log("fullfilled");
      state.singleOrder = payload;
    },
    [getClientSecretForPayment.pending]: () => {
      console.log("Payment intent panding");
    },
    [getClientSecretForPayment.fulfilled]: (state, { payload }) => {
      console.log("payment intent fullfilled", payload);
      state.paymentClientSecret = payload;
    },
    [updateOrderPayment.pending]: () => {
      console.log("update order payment pending");
    },
    [updateOrderPayment.fulfilled]: (state, { payload }) => {
      console.log("Order updated", payload);
    },
    [deleteAnOrder.pending]: () => {},
    [deleteAnOrder.fulfilled]: (state, { payload }) => {
      state.needToReload = state.needToReload + 1;
    },
    [createUserWithEmail.fulfilled]: (state, { payload }) => {
      console.log("user created");

      state.user = payload;
      state.isUserLoading = false;
    },
    [loginUserWithEmail.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [loginUserWithEmail.rejected]: (state, { payload }) => {
      console.log(payload);
    },
    [getAdmin.pending]: (state) => {
      state.adminLoading = true;
    },
    [getAdmin.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isAdmin = payload;
      state.adminLoading = false;
    },
    [getAdmin.rejected]: (state, { payload }) => {
      state.isAdmin = payload;
    },
    [getAllOrder.pending]: () => {
      console.log("All order pending");
    },
    [getAllOrder.fulfilled]: (state, { payload }) => {
      console.log("all order fullfilled", payload);
      state.adminAllOrders = payload;
    },
    [getSingleOrder.fulfilled]: (state, { payload }) => {
      state.singleOrder = payload;
    },
  },
});

export const { setServices, setOrderService } = globalStateSlice.actions;

export default globalStateSlice.reducer;
