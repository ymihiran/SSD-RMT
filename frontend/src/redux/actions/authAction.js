import ACTIONS from './index.js'
import axios from 'axios'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('http://localhost:8070/user/infor', {
        headers: { Authorization: token }
    })
    return res;
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.user_role === "Admin" ? true : false,
            isSupervisor: res.data.user_role === "Supervisor" ? true : false,
            isCoSupervisor: res.data.user_role === "Co-Supervisor" ? true : false,
            isStudent: res.data.user_role === "Student" ? true : false,
            isPanelMember: res.data.user_role === "Panel Member" ? true : false
        }
    }
}