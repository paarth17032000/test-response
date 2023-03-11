import { GET_PEOPLE_DATA } from "../../constants";

export const globalReducer = (state = { peoplesdata: null }, action) => {
  switch (action.type) {
    case GET_PEOPLE_DATA:
      return { ...state, peoplesdata: action?.data };
    default:
      return state;
  }
};
