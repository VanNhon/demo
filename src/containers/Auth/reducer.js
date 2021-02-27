import { createSlice } from "redux-starter-kit";

const initialState = {
  isAuth: false,
  profile: {}
};

const authSlice = createSlice({
  slice: "auth",
  initialState: initialState,
  reducers: {
    updateAuth: (state, { payload }) => {
      state = payload;
    },
    resetAuth: state => {
      state = initialState;
    }
  }
});

const { actions, reducer } = authSlice;
// Export the action
export const { updateAuth, resetAuth } = actions;
// Export the reducer
export default reducer;
