import axios from "axios";
import { resetAuth } from "../Auth/reducer";
import { createSlice } from "redux-starter-kit";
import { apiConfig } from "../../configs/api/api";
import history from "../../configs/routes/history";
import { getBy } from "../../utils/LocalStorageUtils";
import { removeBy } from "../../utils/LocalStorageUtils";

const initialState = {
  dashboardInfo: {},
  firstName: ""
};

const token = getBy("token");
const server = axios.create({
  baseURL: apiConfig.url,
  headers: { Authorization: "Bearer " + token }
});

export const logoff = () => dispatch => {
  removeBy("token");
  dispatch(resetAuth());
  server.get("/signout").then(res => {
    history.push("/");
  });
};
const dasboardSlice = createSlice({
  slice: "dasboard",
  initialState: initialState,
  reducers: {
    getFirstName: (state, { payload }) => {
      state.firstName = payload;
    },
    updateDashboard: (state, { payload }) => {
      state.dashboardInfo = payload;
    }
  }
});

const { actions, reducer } = dasboardSlice;

// Export the action
export const { updateDashboard, getFirstName } = actions;

// Export the reducer
export default reducer;
