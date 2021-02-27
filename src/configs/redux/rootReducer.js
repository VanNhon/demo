import auth from "../../containers/Auth/reducer";
import login from "../../containers/Login/reducer";
import perkU from "../../containers/SignUp/PerkU/reducer";
import dashboard from "../../containers/Dashboard/reducer";
import payment from "../../containers/SignUp/AddPayment/reducer";
import signup from "../../containers/SignUp/ChooseMember/reducer";
import perkPrime from "../../containers/SignUp/PerkPrime/reducer";
import subscriber from "../../containers/SignUp/PerkFamily/reducer";
import confirmation from "../../containers/SignUp/Confirmation/reducer";
import dependent from "../../containers/SignUp/PerkFamily/Dependents/reducer";
import loginCredentials from "../../containers/SignUp/LoginCredentials/reducer";
export const rootReducer = {
  auth,
  login,
  perkU,
  signup,
  payment,
  dashboard,
  perkPrime,
  dependent,
  subscriber,
  confirmation,
  loginCredentials
};
