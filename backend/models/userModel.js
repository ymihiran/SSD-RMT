import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dl99x/image/upload/v1646240499/images_hiwgpp.png",
    },

    mobile: {
      type: String,
      default: "",
    },

    user_role: {
      type: String,
      default: "Student",
    },
    research_area: {
      type: String,
      default: "",
    },
    reg_number: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);
export default Users;
