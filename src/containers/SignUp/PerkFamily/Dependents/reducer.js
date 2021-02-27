import { createSlice } from "redux-starter-kit";
import { setParent } from "../../AddPayment/reducer";
import history from "../../../../configs/routes/history";
import { userInfo } from "../../../../components/UserInfoCard/userInfo";

const userInfoState = Object.assign(
  {
    index: -1,
    isSameAddress: false,
    role_id: 2,
    membership_id: 3,
    parent_id: null,
    gender: 0,
    dayOfBirth: null
  },

  userInfo
);

const initialState = {
  arrayObjects: [userInfoState, userInfoState],
  member: null
};

export const updateParentId = payload => dispatch => {
  dispatch(updateParent(payload));
};

export const paymentInfoFamily = payload => dispatch => {
  dispatch(setParent(payload));
  history.push("/signup_addpayment");
};

export const addMoreDependent = () => dispatch => {
  dispatch(addUserDependent());
};

export const deleteMoreDependent = payload => dispatch => {
  dispatch(deleteUserDependent(payload));
};

export const updateUserInfo = payload => dispatch => {
  dispatch(updateState(payload));
};

export const updateCheckSameAddress = payload => dispatch => {
  dispatch(updateSameAddress(payload));
};

export const updateButtonGender = payload => dispatch => {
  dispatch(updateGender(payload));
};

export const updateCalender = payload => dispatch => {
  dispatch(updateDate(payload));
};

const dependentSlice = createSlice({
  slice: "dependent",
  initialState: initialState,
  reducers: {
    addUserDependent: state => {
      state.arrayObjects.push(userInfoState);
    },
    deleteUserDependent: (state, actions) => {
      const newArrayObjects = state.arrayObjects.filter(
        (item, index) => index !== actions.payload
      );
      state.arrayObjects = newArrayObjects;
    },
    setParentMember: (state, { payload }) => {
      state.member = payload;
    },
    updateState: (state, action) => {
      state.arrayObjects[action.payload.index] = action.payload;
    },
    updateSameAddress: (state, action) => {
      state.arrayObjects[action.payload].isSameAddress = !state.arrayObjects[
        action.payload
      ].isSameAddress;
    },
    updateGender: (state, action) => {
      state.arrayObjects[action.payload.selectIndex].gender =
        action.payload.idGender;
    },
    updateDate: (state, action) => {
      state.arrayObjects[action.payload.selectIndex].dayOfBirth =
        action.payload.dayOfBirth;
    },
    updateParent: (state, action) => {
      state.arrayObjects[action.payload.index].parent_id =
        action.payload.parentId;
    }
  }
});

const { actions, reducer } = dependentSlice;
// Export the action
export const {
  addUserDependent,
  deleteUserDependent,
  setParentMember,
  updateState,
  updateSameAddress,
  updateGender,
  updateDate,
  updateParent
} = actions;
// Export the reducer
export default reducer;
