import axios from "axios";
import { GET_ERRORS } from "./types";

// Register user with data from /form
export const signup = (data, history) => dispatch => {
  axios
    .post("/signup", data)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Create collision report from /collision
export const collisioncreate = (data, history) => dispatch => {
  axios
    .post("/collision", data)
    .then(res => console.log("Coll crate"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Images
export const imageExport = img => dispatch => {
  axios
    .post("/image", img)
    .then(res => console.log("Image export"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
