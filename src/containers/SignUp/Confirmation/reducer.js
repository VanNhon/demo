import { createSlice } from "redux-starter-kit";
import { loginUser } from "../../Login/reducer";

const initialState = {
  user: null
};
export const logIn = payload => dispatch => {
  dispatch(loginUser(payload));
};
const authSlice = createSlice({
  slice: "confirmation",
  initialState: initialState,
  reducers: {
    getUserSignUp: (state, { payload }) => {
      state.user = payload;
    }
  }
});

const { reducer, actions } = authSlice;
export const { getUserSignUp } = actions;

// Export the reducer
export default reducer;
