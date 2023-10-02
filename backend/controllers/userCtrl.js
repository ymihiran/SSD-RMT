import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userCtrl = {

    register: async (req, res) => {
        const { name, email, password, mobile, user_role,
            research_area, reg_number

        } = req.body
        try {


            if (!name || !email || !password || !mobile || !user_role || !reg_number)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid email." })

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email is already exists." })

            if (password.length < 8)
                return res.status(400).json({ msg: "Password must be at least 8 characters." })

            //Encrypt the password
            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                name, email, password: passwordHash, mobile, user_role,
                research_area, reg_number
            })

            // const token = jwt.sign({ id: newUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" })

            await newUser.save();

            res.json({ msg: "Registration Successfull.Please login to continue!" })

        } catch (err) {

            return res.status(500).json({ msg: err.message })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "This email does not exist." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." });

            //Create refresh token and set it to the cookies
            const refreshtoken = createRefreshToken({ id: user._id })

            console.log("Refresh Token : " + refreshtoken);

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/',
               // sameSite: 'none',
                maxAge: 60 * 60 * 1000
            });



            // Set the CSRF token in a separate cookie
            // res.cookie('XSRF-TOKEN', req.csrfToken(), {
            //     httpOnly: true,
            //     path: '/user/refresh_token',
            //     maxAge: 60 * 60 * 1000, // Set to 1 hour
            // });


            res.status(200).json({ msg: "Login success!", refreshtoken });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    resetPassword: async (req, res) => {
        let userId = req.params.id;
        try {
            const { password } = req.body

            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate(userId, {
                password: passwordHash
            })

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getUserInforParam: async (req, res) => {
        let userId = req.params.id;
        try {
            const user = await Users.findById(userId).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deleteUser: async (req, res) => {
        let userId = req.params.id;
        try {
            await Users.findByIdAndDelete(userId)
            res.json({ msg: "Profile Deleted!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateUser: async (req, res) => {
        let userId = req.params.id;
        const { name, email, avatar, mobile, user_role, research_area, reg_number } = req.body
        const update = { name, email, avatar, mobile, user_role, research_area, reg_number }
        try {
            await Users.findByIdAndUpdate(userId, update)
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    allusers: async (req, res) => {

        Users.find().exec((err, Users) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to get all users",
                });
            }
            return res.status(200).json({
                success: true,
                existingUser: Users
            });
        });
    },

    panelMembers: async (req, res) => {
        let r_area = req.params.id;
        Users.find({ research_area: r_area, user_role: "Panel Member" }).exec((err, Users) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to get all users"
                });
            }
            return res.status(200).json({
                success: true,
                existingUser: Users
            });
        });
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //Add Function To Get Access Token based on previously issued refresh token for improved security
    getAccessToken: (req, res) => {
        try {

            const rf_token = req.cookies.refreshtoken;
            console.log(req.cookies);
            console.log("Token" + rf_token);
            if (!rf_token) {
                return res.status(400).json({ msg: "Please login now 1!" });
            }

            else {
                jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, decodedToken) => {
                    if (err) {
                        // If there's an error with the token (e.g., expired or invalid signature)
                        console.error("Token verification error:", err.message);
                        return res.status(401).json({ msg: "Invalid or expired token. Please login again." });
                    }
                
                    // If the token is valid, decodedToken contains the payload (user ID in your case)
                    const userId = decodedToken.id;
                
                    // Create a new access token for the user
                    const access_token = createAccessToken({ id: userId });
                
                    // Send the new access token in the response
                    res.json({ access_token });
                });
                
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },

}

//Email address type validation
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Create access token and refresh tokens and sign them
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};

const createRefreshToken = (payload) => {
    console.log("Payload : " + payload.id);
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};

export default userCtrl;