dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";

//Use CSRF Protection
//import csrf from "csurf";

const app = express();


// Enable security headers using helmet middleware
app.use(helmet());


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());


// CSRF protection middleware configuration
// const csrfProtection = csrf({
//   cookie: {
//     httpOnly: false, // Set the CSRF token as HTTP-only false
//     sameSite: "strict", // Apply same-site cookie attribute for added security
//     secure: false, // Set true to only set the cookie over HTTPS
//   },
// });

// Generate and send a CSRF token for each request

//*** Define All routes after this line to apply CSRF protection to them ***//


//app.use(csrfProtection);


// CSRF token verification middleware
// app.use((req, res, next) => {
//   //Use CSRF except for GET requests
//   if (req.method === "GET") {
//     return next();
//   } else {
//     res.locals.csrfToken = req.csrfToken(); // Send the CSRF token to the frontend
//     next();
//   }
// });

// Serve CSRF tokens
// app.get("/api/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });


//*** Define Routes Here ***/

// Document/ presentation Evaluate Route
import evaluationRouter from "./routes/EvaluationRoute.js";
app.use("/evaluation", evaluationRouter);

// Supervisor/Co supervisor Route
import supervisorRouter from "./routes/SupervisorRoute.js";
app.use("/supervisor", supervisorRouter);

// Topic Register Route
import topicRouter from "./routes/topicregs.js";
app.use("/topic", topicRouter);

// Marking Schema Route
import markingRouter from "./routes/markingschemes.js";

app.use("/markingScheme", markingRouter);

// Evaluated Topics Route
import evaluatedTopicRouter from "./routes/evaluatedtopics.js";
app.use("/evaluatedTopic", evaluatedTopicRouter);


//User Routes
import userRouter from "./routes/userRoute.js";
app.use("/user", userRouter);

import panelRouter from "./routes/PanelMemberRoute.js";
app.use("/panel", panelRouter);

//Submit Type Route
import SubmitTypeRouter from "./routes/SubmitTypeRoute.js";
app.use("/docType", SubmitTypeRouter);

//Upload Image
import uploadImgRouter from "./routes/uploadRoute.js";
app.use("/api", uploadImgRouter);

import router from "./routes/SubmitTypeRoute.js";
app.use("/docType", router);

//Student Group Route
import createRouter from "./routes/StudentGroupRoute.js";
app.use("/stdGroup", createRouter);

//Submit Doc Route
import docRouter from "./routes/SubmitDocRoute.js";
app.use("/document", docRouter);

import uploadRouter from "./routes/UploadTemplateRoute.js";
app.use("/template", uploadRouter);

//request co supervisor
import request from "./routes/ReqRoute.js";
app.use("/request", request);

//send msg to db
import msg from "./routes/chatForumRoute.js";
app.use("/chat", msg);

import reply from "./routes/chatReplyRoute.js";
app.use("/chatReplies", reply);

//server run in this port 8070
const PORT = process.env.PORT || 8070;

//Connect data base
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
