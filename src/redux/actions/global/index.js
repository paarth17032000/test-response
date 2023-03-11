import * as api from "../../api";
import { GET_PEOPLE_DATA } from "../../constants";

export const GetPeopleData = (query) => async (dispatch) => {
  try {
    const queryData = query ? query : null;
    const { data } = await api.getPeopleData(queryData);
    dispatch({ type: GET_PEOPLE_DATA, data });
    return data;
  } catch (e) {
    console.log(e);
  }
};
