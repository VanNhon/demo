import axios from "axios";
import {isEmpty} from "lodash";
import {createSlice} from "redux-starter-kit";
import {apiConfig} from "../../configs/api/api";
import history from "../../configs/routes/history";
import {getFirstName} from "../Dashboard/reducer";
import {updateAuth, resetAuth} from "../Auth/reducer";
// import { setBy } from "../../utils/LocalStorageUtils"; import { wait } from
// "../../utils/ApiUtils";
const initialState = {
    username: "",
    password: "",
    isValid: 1,
    isLoading: false,
    isShowMessage: false,
    isFocus: true
};

export const signup = () => dispatch => {
    history.push("/signup_choosemembership");
};
export const loginUser = payload => dispatch => {
    console.log("------------login-----------");
    let {username, password} = payload;
    dispatch(fetchUserRequest());

    if (isEmpty(username) || isEmpty(password)) {
        dispatch(fetchUserEmpty());
        dispatch(resetAuth());
    } else {
        axios
            .post(apiConfig.url + "/signin", {
            username: username,
            password: password
        })
            .then(res => {
                localStorage.setItem("token", JSON.stringify(res.data.token));
                let auth = {
                    isAuth: true,
                    profile: res.data.profile_data
                };
                dispatch(fetchUserSuccess());
                dispatch(updateAuth(auth));
                dispatch(getFirstName(auth.profile.firstname));
                history.push("/dashboard");
            })
            .catch(err => {
                dispatch(fetchUserFailure());
                dispatch(resetAuth());
            });
    }
};

const loginSlice = createSlice({
    slice: "login",
    initialState: initialState,
    reducers: {
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
        fetchUserEmpty: state => {
            state.isLoading = false;
            state.isValid = -1;
            state.isShowMessage = true;
            state.isFocus = true;
        },
        validateUserInfo: (state, action) => {
            state.isValid = 0;
        }
    }
});

const {actions, reducer} = loginSlice;
// Export the action
export const {
    validateUserInfo,
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
    fetchUserEmpty
} = actions;
// Export the reducer
export default reducer;
