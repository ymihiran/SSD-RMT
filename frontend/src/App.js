import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import NotFound from "./components/utils/NotFound/NotFound";
import UploadTemplate from "./components/UploadTemplate";

import SubmitTopic from "./components/SubmitTopic";
import EvaluateTopic from "./components/EvlauateTopic";
import AcceptTopic from "./components/AcceptTopic";
import TopicList from "./components/TopicList";
import StdTopicList from "./components/StdTopicList";
import AddMarking from "./components/AddMarking";

import EditTopic from "./components/EditTopic";
import Main from "./components/Main";
import { ReactNotifications } from "react-notifications-component";

import SubmitDocs from "./components/SubmitDocs";
import AllStudentGroup from "./components/AllStudentGroup";

import AllCreateTypes from "./components/AllCreateTypes";

import MarkingList from "./components/MarkingList";
import EditMarking from "./components/EditMarking";
import EvaluatedTopicList from "./components/EvaluatedTopicList";
import EditEvaluatedTopic from "./components/EditEvaluatedTopic";

import DocumentEvaluation from "./components/DocumentEvaluation";
import AllDocuments from "./components/AllDocuments";
import RequestCoSupervisor from "./components/RequestCoSupervisor";

import DownloadTemplate from "./components/DownloadTemplate";

import StudentGroup from "./components/StudentGroup";


import AllSubmitDoc from "./components/AllSubmitDoc";
import chatForum from "./components/chatForum";
import chatGroupSupervisor from "./components/chatGroupSupervisor";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProfileUpdate from "./components/ProfileUpdate";
import AllUsers from "./components/AllUsers";
import PanelMembers from "./components/CheckPanelMembers";
import SelectPanelMembers from "./components/SelectPanelMembers";
import Header from "./components/Header";

//ADD REDUX FOR STATE MANAGEMENT
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";



function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("http://localhost:8070/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <div>


      <Router>
        <ReactNotifications />
        <Header />
        {/* <Routes> */}
        <Route path="/" exact component={Main} />

        <Route
          path="/updateadmin/:id"
          exact
          component={isAdmin ? ProfileUpdate : NotFound}
        />

        <Route
          path="/profile"
          exact
          component={isLogged ? Profile : NotFound}
        />
        <Route
          path="/panelmembers"
          exact
          component={isAdmin ? PanelMembers : NotFound}
        />
        <Route
          path="/selectpanel"
          exact
          component={isAdmin ? SelectPanelMembers : NotFound}
        />
        <Route
          path="/allprof"
          exact
          component={isAdmin ? AllUsers : NotFound}
        />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/SubmitTopic" component={SubmitTopic} />
        <Route path="/EvaluateTopic" component={EvaluateTopic} />
        <Route path="/EvaluatedTopicList" component={EvaluatedTopicList} />
        <Route path="/EditEvaluatedTopic" component={EditEvaluatedTopic} />
        <Route path="/AcceptTopic" component={AcceptTopic} />
        <Route path="/TopicList" component={TopicList} />
        <Route path="/StdTopicList" component={StdTopicList} />
        <Route path="/AddMarking" component={AddMarking} />
        <Route path="/EditTopic" component={EditTopic} />
        <Route path="/SubmitDocs" component={SubmitDocs} />
        <Route path="/AllStudentGroup" component={AllStudentGroup} />

        <Route path="/AllCreateTypes" component={AllCreateTypes} />
        <Route path="/MarkingList" component={MarkingList} />
        <Route path="/EditMarking" component={EditMarking} />
        <Route path="/doc" exact component={DocumentEvaluation} />
        <Route path="/allDoc" component={AllDocuments} />
        <Route
          path="/reqCoSuper"
          exact
          component={isLogged ? RequestCoSupervisor : Login}
        />

        <Route path="/DownloadTemplate" component={DownloadTemplate} />
        <Route path="/StudentGroup" component={StudentGroup} />
        <Route path="/UploadTemplate" component={UploadTemplate} />
        <Route path="/chat" exact component={isLogged ? chatForum : Login} />
        <Route path="/chatGroup" exact component={chatGroupSupervisor} />

        <Route path="/AllSubmitDoc" component={AllSubmitDoc} />
        {/* </Routes> */}
      </Router>
    </div>
  );
}
export default App;
