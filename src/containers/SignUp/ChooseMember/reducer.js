import axios from "axios";
import { createSlice } from "redux-starter-kit";
import history from "../../../configs/routes/history";
import { getBy } from "../../../utils/LocalStorageUtils";
import { apiConfig } from "../../../configs/api/api";
import {cardValues} from "../../../configs/common/cardValues"

const initialState = {
  values: [],
  item: []
};

const token = getBy("token");
const server = axios.create({
  baseURL: apiConfig.url,
  headers: { Authorization: "Bearer " + token }
});

export const goBack = () => dispatch => {
  history.push("/");
};

export const getData = () => dispatch => {

         return cardValues;

};

const signupSlice = createSlice({
  slice: "signup",
  initialState: initialState,
  reducers: {
    getChooseMember: (state, action) => {
      state.values = action.payload.state;
    },
    getChooseMemberItem: (state, action) => {
      state.item = action.payload.state;
    }
  }
});

const { reducer, actions } = signupSlice;
export const { getChooseMember, getChooseMemberItem } = actions;
export default reducer;
