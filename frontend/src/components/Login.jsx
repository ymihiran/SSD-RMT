import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//import { showErrMsg, showSuccessMsg } from "./utils/notification/Notification";
import { dispatchLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();

  const { email, password } = user;

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  async function signIn(event) {
    event.preventDefault();

    const config = {
      headers: {
        "const-Type": "application/json",
      },
    };
    // try {
    //   const res = await axios.post(
    //     "http://localhost:8070/user/login",
    //     { email, password },
    //     config
    //   );
    //   //localStorage.setItem("userAuthToken", `${data.token}`);
    //   //localStorage.setItem("user", JSON.stringify(data.result));
    //   localStorage.setItem("firstLogin", true);

    //   history.push("/");
    // } catch (error) {
    //   if (error.response.status === 404) {
    //     alert("Invalid Registration Number");
    //   } else if (error.response.status === 400) {
    //     alert("Email or Password Incorrect");
    //   } else {
    //     alert("Authentication Failed "+ error.response.status );
    //   }
    // }

    try {
      await axios.post(
        "http://localhost:8070/user/login",
        { email, password },
        config
      );

      setUser({ ...user });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      setUser({ ...user });
    }
  }

  return (
    <div className="topic-container">
      <div style={{ backgroundColor: "#0F0934" }}>
        <div>
          <img
            className="img-side"
            alt="logo"
            src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"
          ></img>
        </div>

        <div className="t-title-container">
          <label className="sideLable" style={{ color: "#FF5631" }}>
            SLIIT{" "}
          </label>{" "}
          <br className="br1" />
          <label className="sideLable">Research</label>
          <br className="br1" />
          <label className="sideLable">Management </label>{" "}
          <br className="br1" />
          <label className="sideLable">Tool. </label> <br className="br1" />
        </div>

        <div className="sublable-container">
          <label className="subLable">Don't Have An Account?</label>
        </div>
        <br />
        <Link to="/register">
          <button type="submit" className="side-btn">
            Signup Here
          </button>
        </Link>
      </div>
      <div style={{ backgroundColor: "white" }}>
        <br></br>
        <h1 className="Hfont" style={{ color: "#322B5F", fontWeight: "bold" }}>
          Login
        </h1>{" "}
        <br></br>
        <br></br>
        <center>
          <h3 style={{ fontWeight: "bold" }}>Welcome Again!</h3>{" "}
        </center>
        <div className="reg-from-container">
          <form onSubmit={signIn}>
            <div className="mb-3">
              <label
                className="t-form-label"
                style={{ color: "#322B5F", fontWeight: "bold" }}
              >
                Email Address
              </label>
              <input
                style={{ width: "450px" }}
                className="t-form-control"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChangeInput}
                required
              />
            </div>
            <br></br>
            <div className="mb-3">
              <label
                className="t-form-label"
                style={{ color: "#322B5F", fontWeight: "bold" }}
              >
                Password
              </label>
              <input
                style={{ width: "450px" }}
                className="t-form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChangeInput}
                required
              />
            </div>

            <br></br>
            <button
              type="submit"
              className="l-btn-accept"
              style={{ width: "200px", fontWeight: "bold" }}
            >
              Login
            </button>
          </form>
          <div className="bottom-t-container">
            <label className="bottom-t" style={{ color: "#FF5631" }}>
              {" "}
              SLIIT
            </label>{" "}
            <label className="bottom-t"> Research</label> <br />
            <label className="bottom-t"> Management Tool</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
