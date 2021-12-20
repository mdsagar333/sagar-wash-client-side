import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import Header from "../Home/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmail } from "../../globalState/GlobalStateSlice";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError("");
    setLoading(true);
    console.log(user);
    const response = await dispatch(createUserWithEmail(user));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/", { replace: true });
      setLoading(false);
      return;
    }
    setIsError(response.error.message);
    setLoading(false);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
        <div className="container py-3 ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-4 text-center">
                  <h3 className="mb-3">Register</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-2">
                      <input
                        type="text"
                        id="typeName-2"
                        className="form-control form-control-lg"
                        value={user.name}
                        name="name"
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="typeName-2">
                        Name
                      </label>
                    </div>
                    <div className="form-outline mb-2">
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        value={user.email}
                        name="email"
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Email
                      </label>
                    </div>

                    <div className="form-outline mb-2">
                      <input
                        type="password"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        value={user.password}
                        name="password"
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Password
                      </label>
                    </div>
                    {isError && <p className="alert alert-danger">{isError}</p>}

                    {/* <!-- Checkbox --> */}
                    <div className="form-check d-flex justify-content-start mb-2">
                      <p>
                        Already have an account? Please{" "}
                        <Link to="/login">Login</Link>
                      </p>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block w-100"
                      type="submit"
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
