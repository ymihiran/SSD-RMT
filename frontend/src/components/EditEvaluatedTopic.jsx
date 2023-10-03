import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import emailjs from "emailjs-com";
import { Store } from "react-notifications-component";
import { useSelector } from "react-redux";

export default function EvaluateTopic() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  const { user } = auth;
  const [tid, settid] = useState();
  const [id, setid] = useState();
  const [groupID, setgroupID] = useState(localStorage.getItem("groupID"));
  const [groupName, setgroupName] = useState();
  const [rField, setrField] = useState();
  const [rTopic, setrTopic] = useState();
  const [leaderEmail, setleaderEmail] = useState();
  const [comment, setacomment] = useState();
  const [Evaluation, setEvaluation] = useState();
  const [request, setRequest] = useState([]);

  let history = useHistory();

  function authenticate() {
    if (user.user_role !== "Panel Member" && user.user_role === "Supervisor") {
      history.push("/login");
      Store.addNotification({
        title: "You are not allowed!",
        message:
          "You are not allowed to access this page! Please login as Panel Member",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        type: "danger",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 2500,
          onScreen: true,
          showIcon: true,
        },

        width: 400,
      });
    }
  }

  setTimeout(() => {
    authenticate();
  }, 0);

  const getData = async (path) => {
    await axios
      .get(path)
      .then((res) => {
        setRequest(res.data.topicRouter);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    setEvaluation(localStorage.getItem("Evaluation"));
    setid(localStorage.getItem("ID"));

    const path =
      "http://localhost:8070/topic/group/" + localStorage.getItem("groupID");
    console.log(path);

    getData(path);

    console.log(request.groupName);

    settid(request.tid);
    setgroupID(request.groupID);
    setgroupName(request.groupName);
    setrField(request.rField);
    setrTopic(request.rTopic);
    setleaderEmail(request.leaderEmail);
    setacomment(request.comment);
  }, []);

  function submitData(e) {
    e.preventDefault();
    settid("1111");
    const newTopic = {
      tid,
      groupID,
      groupName,
      rField,
      rTopic,
      leaderEmail,
      comment,
      Evaluation,
    };

    let path = "http://localhost:8070/evaluatedTopic/" + id;

    axios
      .put(path, newTopic)
      .then(() => {
        Store.addNotification({
          title: "Evaluation Sent Successfully.",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          type: "success",
          insert: "top",
          container: "top-right",

          dismiss: {
            duration: 1500,
            onScreen: true,
            showIcon: true,
          },

          width: 400,
        });
        e.target.reset();
        history.push("/EvaluatedTopicList");
      })
      .catch((err) => {
        alert(err);
      });
    document.getElementById("subBut").click();
  }

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tc03vnm",
        "template_ajm9ro9",
        e.currentTarget,
        "-utNmr2eLLLW4jLyR"
      )
      .then(
        (result) => {
          console.log("Mail Sent");
        },
        (error) => {
          console.log("Oops... Something went wrong. Email was not sent");
        }
      );
  }

  return (
    <div className="topic-container">
      <div style={{ backgroundColor: "#0F0934" }}>
        <div>
          <img
            className="img-side"
            src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"
          ></img>
        </div>

        <div className="s-from-container">
          <form>
            <div className="mb-3">
              <label className="s-form-label">Group ID</label>
              <input
                className="s-input"
                disabled
                type="text"
                style={{ width: "450px" }}
                id="cUName"
                value={groupID}
              />
            </div>

            <div className="mb-3">
              <label className="s-form-label">Group Name</label>
              <input
                className="s-input"
                disabled
                type="text"
                style={{ width: "450px" }}
                id="cName"
                value={request.groupName}
              />
            </div>

            <div className="mb-3">
              <label className="s-form-label">Research Field</label>

              <input
                className="s-input"
                disabled
                type="text"
                style={{ width: "450px" }}
                id="cName"
                value={request.rField}
              />
            </div>

            <div className="mb-3">
              <label className="s-form-label">Research Topic</label>
              <input
                className="s-input"
                disabled
                type="text"
                style={{ width: "450px" }}
                id="cName"
                value={request.rTopic}
              />
            </div>

            <div className="mb-3">
              <label className="s-form-label">Group Leader's email</label>
              <input
                className="s-input"
                disabled
                type="text"
                style={{ width: "450px" }}
                id="cName"
                value={request.leaderEmail}
              />
            </div>

            <div className="mb-3">
              <label className="s-form-label">Comments (Optional)</label>
              <input
                className="s-input"
                disabled
                type="text"
                style={{ width: "450px", height: "100px" }}
                id="cName"
                value={request.comment}
              />
            </div>
          </form>
        </div>
      </div>

      <div style={{ backgroundColor: "white" }}>
        <div className="t-list-head-container">
          <label className="h-text"> EVALUATE</label> <br />
          <label className="h-text">
            {" "}
            <label style={{ color: "#FF5631" }}> RESEARCH</label> PROJECT
          </label>{" "}
          <br />
          <label className="h-text">TOPIC</label>
        </div>

        <div className="t-from-container" style={{ marginLeft: "20%" }}>
          <button
            className="btn btn-success"
            style={{
              backgroundColor: "#00D8BE",
              fontSize: "2rem",
              marginLeft: "10%",
            }}
          >
            Download Topic Details
          </button>{" "}
          <br /> <br />
          <form onSubmit={submitData}>
            <div className="mb-3">
              <label className="t-form-label">Comments</label>
              <input
                type="text"
                name="message"
                style={{ width: "450px", height: "100px" }}
                id="cName"
                required
                value={Evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
              />
            </div>

            <input
              type="hidden"
              name="mail"
              style={{ width: "450px", height: "100px" }}
              id="gid"
              value={request.leaderEmail}
            />

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#0F0934",
                width: "200px",
                fontWeight: "bold",
                marginLeft: "45%",
              }}
            >
              Submit
            </button>
          </form>
          <form onSubmit={sendEmail}>
            <input type="hidden" name="mail" value={request.leaderEmail} />
            <input type="hidden" name="message" value={Evaluation} />
            <button hidden id="subBut">
              Send Email
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
