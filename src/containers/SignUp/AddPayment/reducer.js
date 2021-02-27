import axios from "axios";
import { createSlice } from "redux-starter-kit";
import { apiConfig } from "../../../configs/api/api";
import history from "../../../configs/routes/history";
import { getUser } from "../LoginCredentials/reducer";
const initialState = {
  infoPayment: {
    cc: "",
    expDate: "",
    cvv: 0,
    cardHolder: "",
    streetAddress: "",
    ciTyTown: "",
    state: "",
    zipCode: ""
  },
  member: null
};
export const submit = payload => dispatch => {
  axios
    .post(apiConfig.url + "/payments", {
      user_id: payload.id,
      cc_: payload.cc,
      exp_date: payload.expDate,
      cvv: payload.cvv,
      cardholder_name: payload.cardHolder,
      street_address: payload.streetAddress,
      city_town: payload.ciTyTown,
      state: payload.state,
      zip_code: payload.zipCode
    })
    .then(res => {
      // console.log("success!", res.data);
      history.push("/signup_logincredentials");
    });
};

export const pushUser = payload => dispatch => {
  dispatch(getUser(payload));
};

export const updateState = payload => dispatch => {
  dispatch(updatePayment(payload));
};
const paymentSlice = createSlice({
  slice: "payment",
  initialState: initialState,
  reducers: {
    setParent: (state, { payload }) => {
      state.member = payload;
    },
    updatePayment: (state, { payload }) => {
      state.infoPayment = payload;
    }
  }
});

const { reducer, actions } = paymentSlice;
export const { setParent, updatePayment } = actions;
// Export the reducer
export default reducer;
