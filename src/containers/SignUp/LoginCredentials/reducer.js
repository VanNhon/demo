import axios from "axios";
import { isEmpty } from "lodash";
import { createSlice } from "redux-starter-kit";
import { apiConfig } from "../../../configs/api/api";
import history from "../../../configs/routes/history";
import { getUserSignUp } from "../Confirmation/reducer";

const initialState = {
  user: null,
  username: "",
  password: "",
  rePassword: "",
  isValid: 1,
  isLoading: false,
  isShowMessage: false,
  isFocus: true
};

export const pushUser = payload => dispatch => {
  dispatch(getUserSignUp(payload));
};

export const completeSignUp = payload => dispatch => {
  let { username, password, rePassword, userId } = payload;
  dispatch(fetchUserRequest());

  if (isEmpty(username) || isEmpty(password)) {
    dispatch(fetchUserEmpty());
  } else if (rePassword !== password) {
    dispatch(validatePassword());
  } else {
    axios
      .post(apiConfig.url + "/users/check-user", {
        username: username
      })
      .then(res => {
        dispatch(fetchUserExist());
      })
      .catch(() => {
        axios
          .put(apiConfig.url + "/users/update/username-pw", {
            id: userId,
            username: username,
            password: password
          })
          .then(res => {
            dispatch(fetchUserSuccess());
            history.push("/signup_confirmationscreen");
          });
      });
  }
};
const loginSlice = createSlice({
  slice: "loginCredentials",
  initialState: initialState,
  reducers: {
    getUser: (state, { payload }) => {
      state.user = payload;
    },
    fetchUserRequest: state => {
      state.isLoading = true;
      state.isShowMessage = false;
      state.isFocus = false;
    },
    fetchUserSuccess: state => {
      state.isLoading = false;
      state.isValid = 1;
    },
    fetchUserFailure: state => {
      state.isLoading = false;
      state.isValid = 0;
      state.isShowMessage = true;
      state.isFocus = true;
    },
    fetchUserExist: state => {
      state.isLoading = false;
      state.isValid = 0;
      state.isShowMessage = true;
      state.isFocus = true;
    },
    fetchUserEmpty: state => {
      state.isLoading = false;
      state.isValid = 2;
      state.isShowMessage = true;
      state.isFocus = true;
    },
    validatePassword: (state, action) => {
      state.isLoading = false;
      state.isValid = 3;
      state.isShowMessage = true;
      state.isFocus = true;
    }
  }
});

const { reducer, actions } = loginSlice;
export const {
  getUser,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchUserExist,
  fetchUserEmpty,
  validatePassword
} = actions;

// Export the reducer
export default reducer;
