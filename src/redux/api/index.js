import axios from "axios";

// Base URL
const url = "https://swapi.dev";

export const getPeopleData = (query) => {
  if (query === null) {
    return axios.get(`${url}/api/people`);
  } else return axios.get(`${url}/api/people/${query}`);
};
