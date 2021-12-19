import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import Header from "../Home/Header/Header";

const Register = () => {
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

                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      id="typeName-2"
                      className="form-control form-control-lg"
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
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Password
                    </label>
                  </div>

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
                    Register
                  </button>

                  <hr className="my-3" />

                  <button
                    className="btn btn-lg btn-block btn-primary"
                    style={{ backgroundColor: "#dd4b39" }}
                    type="submit"
                  >
                    <i className="fab fa-google me-2"></i> Sign in with google
                  </button>
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
