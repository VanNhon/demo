import { createSlice } from "redux-starter-kit";
import { setParent } from "../AddPayment/reducer";
import history from "../../../configs/routes/history";
import { userInfo } from "../../../components/UserInfoCard/userInfo";

const userInfoState = Object.assign(
  {
    id: 0,
    role_id: 2,
    membership_id: 1,
    parent_id: null,
    gender: 0,
    dayOfBirth: null
  },

  userInfo
);

const initialState = { userInfoState };

export const paymentInfoU = payload => dispatch => {
  dispatch(setParent(payload));
  history.push("/signup_addpayment");
};

export const updateUserInfo = payload => dispatch => {
  dispatch(updateState(payload));
};

export const updateId = payload => dispatch => {
  dispatch(updateUserId(payload));
};

export const updateButtonGender = payload => dispatch => {
  dispatch(updateGender(payload));
};

export const updateCalender = payload => dispatch => {
  dispatch(updateDate(payload));
};
const perkUSlice = createSlice({
  slice: "perkU",
  initialState: initialState,
  reducers: {
    updateState: (state, action) => {
      state.userInfoState = action.payload;
    },
    updateGender: (state, action) => {
      state.userInfoState.gender = action.payload.idGender;
    },
    updateDate: (state, action) => {
      state.userInfoState.dayOfBirth = action.payload.dayOfBirth;
    },
    updateUserId: (state, action) => {
      state.userInfoState.id = action.payload;
    }
  }
});

const { actions, reducer } = perkUSlice;
// Export the action
export const { updateState, updateGender, updateDate, updateUserId } = actions;
// Export the reducer
export default reducer;
