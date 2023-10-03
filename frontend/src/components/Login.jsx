import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "./utils/notification/Notification";
import { dispatchLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

function Login() {
  const initialState = {
    email: "",
    password: "",
    err: "",
    success: "",
  };

  const [user, setUser] = useState(initialState);

  const dispatch = useDispatch();
  const history = useHistory();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8070/user/login", {
        email,
        password,
      });

      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
      window.location.reload();
      document.cookie = "refreshtoken=" + res.data.refreshtoken;
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    console.log(response);
    try {
      const res = await axios.post("http://localhost:8070/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

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
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <br></br> <br></br>
          <form onSubmit={handleSubmit}>
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
                value={email}
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
                value={password}
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
          <br></br>
          <br></br>
          <div>
            
            <GoogleLogin
              clientId="389472249003-m71iinf8p0reaih8q9hdo6qdjs78gfhq.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />{" "}
          
          </div>

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
