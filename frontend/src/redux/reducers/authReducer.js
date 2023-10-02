import ACTIONS from "../actions/";

const initialState = {
  user: [],
  isLogged: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
        isSupervisor: action.payload.isSupervisor,
        isCoSupervisor: action.payload.isCoSupervisor,
        isStudent: action.payload.isStudent,
        isPanelMember: action.payload.isPanelMember
      };
    default:
      return state;
  }
};

export default authReducer;
