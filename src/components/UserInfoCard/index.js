import axios from "axios";
import classNames from "classnames";
import React, {Component} from "react";
import NumberFormat from "react-number-format";
import {
    Grid,
    withStyles,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogActions
} from "@material-ui/core";
import styles from "./styles";
import Space from "./../Space";
import Calendar from "./../Calendar";
import FormError from "./../FormError";
import ButtonGroup from "./../ButtonGroup";
import {wait} from "../../utils/ApiUtils";
import {apiConfig} from "../../configs/api/api";
import {message} from "../../configs/common/message";
import {validateEmail, allLetter, charIsNumber, validatePhoneNumber, removeAllSpace} from "../../utils/CommonUtils";

class UserInfoCard extends Component {
    state = {
        isSave: false,
        date: "",
        gender: null,
        isLoading: false,
        openDialog: false,
        genderValues: [],

        phone: {
            value: "",
            errorMessage: ""
        },
        schoolEmail: {
            value: "",
            errorMessage: ""
        },
        personalEmail: {
            value: "",
            errorMessage: ""
        },
        addressEmail: {
            value: "",
            errorMessage: ""
        },
        firstName: {
            value: "",
            errorMessage: ""
        },
        lastName: {
            value: "",
            errorMessage: ""
        },
        middleInitial: {
            value: "",
            errorMessage: ""
        },
        cityTown: {
            value: "",
            errorMessage: ""
        },
        streetAddress: {
            value: "",
            errorMessage: ""
        },
        state: {
            value: "",
            errorMessage: ""
        },
        zipCode: {
            value: "",
            errorMessage: ""
        },
        dob: {
            errorMessage: ""
        }
    };

    validateInput = (name, check) => {
        if (name === "phone") {
            if (validatePhoneNumber(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.PHONE_NUMBER_INVALID};
            }
        } else if (name === "schoolEmail") {
            if (validateEmail(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.EMAIL_INVALID};
            }
        } else if (name === "personalEmail") {
            if (validateEmail(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.EMAIL_INVALID};
            }
        } else if (name === "addressEmail") {
            if (validateEmail(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.EMAIL_INVALID};
            }
        } else if (name === "firstName") {
            if (allLetter(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.FIRST_NAME_INVALID};
            }
        } else if (name === "middleInitial") {
            if (allLetter(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.MIDDLE_INITIAL_INVALID};
            }
        } else if (name === "lastName") {
            if (allLetter(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.LAST_NAME_INVALID};
            }
        } else if (name === "cityTown") {
            if (allLetter(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.CITY_TOWN_INVALID};
            }
        } else if (name === "streetAddress") {
            if (charIsNumber(check) === false && check !== "") {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.STREET_ADDRESS_INVALID};
            }
        } else if (name === "state") {
            if (allLetter(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.STATE_INVALID};
            }
        } else if (name === "zipCode") {
            if (allLetter(check)) {
                return {errorMessage: ""};
            } else {
                return {errorMessage: message.ZIP_CODE_INVALID};
            }
        }
    };
    handleDate = () => {
        const newState = {
            ...this.state.dob
        };
        newState.errorMessage = "";
        this.setState({dob: newState});
    }
    handleInput = event => {
        const {name, value} = event.target;
        const newState = {
            ...this.state[name]
        };
        newState.value = value;
        this.setState({[name]: newState});
    };

    handleInputValidation = event => {
        const {name} = event.target;
        const {errorMessage} = this.validateInput(name, this.state[name].value);
        const newState = {
            ...this.state[name]
        };
        newState.errorMessage = errorMessage;
        this.setState({[name]: newState});
    };

    /*
  -------------------------------------------------------------------
   */
    handleOpenDialog = () => {
        this.setState({openDialog: true});
    };

    handleCloseDialog = () => {
        this.setState({openDialog: false});
    };
    handleDelete = index => {
        wait(1).then(() => {
            this
                .props
                .deletePress(index);
            if (index !== this.props.lengthArray - 1) {
                this.txtFirstName.value = this.props.userInfo.firstName;
                this.txtMiddleInitial.value = this.props.userInfo.middleInitial;
                this.txtLastName.value = this.props.userInfo.lastName;
                this.txtStreetAddress.value = this.props.userInfo.streetAddress;
                this.txtCityTown.value = this.props.userInfo.ciTyTown;
                this.txtState.value = this.props.userInfo.state;
                this.txtZipCode.value = this.props.userInfo.zipCode;
                this.txtPhoneNumber.value = this.props.userInfo.phoneNumber;
                this.txtEmailAddress.value = this.props.userInfo.emailAddress;
            }
            this.handleCloseDialog();
        });
    };

    handelEditClick = () => {
        this.setState({
            isSave: !this.state.isSave,
            isLoading: !this.state.isLoading
        });
    };
    handelCheckInput = () => {
        if (this.props.userInfo.dayOfBirth === null) {
            const newState = {
                ...this.state.dob
            };
            newState.errorMessage = message.DATE_INVALID;
            this.setState({dob: newState});
        }
        if (this.txtPhoneNumber.value === "") {
            const newState = {
                ...this.state.phone
            };
            newState.errorMessage = message.PHONE_NUMBER_INVALID;
            this.setState({phone: newState});
        }
        if (this.txtFirstName.value === "") {
            const newState = {
                ...this.state.firstName
            };
            newState.errorMessage = message.FIRST_NAME_INVALID;
            this.setState({firstName: newState});
        }
        if (this.txtLastName.value === "") {
            const newState = {
                ...this.state.lastName
            };
            newState.errorMessage = message.LAST_NAME_INVALID;
            this.setState({lastName: newState});
        }
        if (this.txtStreetAddress.value === "") {
            const newState = {
                ...this.state.streetAddress
            };
            newState.errorMessage = message.STREET_ADDRESS_INVALID;
            this.setState({streetAddress: newState});
        }
        if (this.txtCityTown.value === "") {
            const newState = {
                ...this.state.cityTown
            };
            newState.errorMessage = message.CITY_TOWN_INVALID;
            this.setState({cityTown: newState});
        }
        if (this.txtState.value === "") {
            const newState = {
                ...this.state.state
            };
            newState.errorMessage = message.STATE_INVALID;
            this.setState({state: newState});
        }
        if (this.txtZipCode.value === "") {
            const newState = {
                ...this.state.zipCode
            };
            newState.errorMessage = message.ZIP_CODE_INVALID;
            this.setState({zipCode: newState});
        }
        if (this.txtEmailSchool && this.txtEmailSchool.value === "") {
            const newState = {
                ...this.state.schoolEmail
            };
            newState.errorMessage = message.EMAIL_INVALID;
            this.setState({schoolEmail: newState});
        }
        if (this.txtEmailAddress && this.txtEmailAddress.value === "") {
            const newState = {
                ...this.state.addressEmail
            };
            newState.errorMessage = message.EMAIL_INVALID;
            this.setState({addressEmail: newState});
        }
    };
    handelSaveClick = () => {
        this.handelCheckInput();
        const {dayOfBirth} = this.props.userInfo;
        const {
            phone,
            schoolEmail,
            personalEmail,
            addressEmail,
            firstName,
            lastName,
            middleInitial,
            cityTown,
            streetAddress,
            state,
            zipCode
        } = this.state;

        if (dayOfBirth !== null && phone.errorMessage === "" && phone.value !== "" && schoolEmail.errorMessage === "" && schoolEmail.value !== "" && personalEmail.errorMessage === "" && addressEmail.errorMessage === "" && addressEmail.value !== "" && firstName.errorMessage === "" && firstName.value !== "" && lastName.errorMessage === "" && lastName.value !== "" && middleInitial.errorMessage === "" && cityTown.errorMessage === "" && cityTown.value !== "" && streetAddress.errorMessage === "" && streetAddress.value !== "" && state.errorMessage === "" && state.value !== "" && zipCode.errorMessage === "" && zipCode.value !== "") {
            this.setState({
                isLoading: !this.state.isLoading
            });

            wait(500).then(() => {
                this.setState({
                    isSave: !this.state.isSave
                });
                const userInfoSave = [];
                let {
                    dayOfBirth,
                    gender,
                    isSameAddress,
                    role_id,
                    membership_id,
                    parent_id
                } = this.props.userInfo;
                if (!dayOfBirth) {
                    dayOfBirth = "";
                }
                const dob = dayOfBirth.slice(1, dayOfBirth.length - 1);

                userInfoSave.role_id = role_id;
                userInfoSave.membership_id = membership_id;
                userInfoSave.parent_id = parent_id;
                userInfoSave.firstName = this.txtFirstName.value;
                userInfoSave.middleInitial = this.txtMiddleInitial.value;
                userInfoSave.lastName = this.txtLastName.value;
                userInfoSave.streetAddress = this.txtStreetAddress.value;
                userInfoSave.gender = gender;
                userInfoSave.dayOfBirth = dayOfBirth;
                userInfoSave.ciTyTown = this.txtCityTown.value;
                userInfoSave.state = this.txtState.value;
                userInfoSave.zipCode = this.txtZipCode.value;
                userInfoSave.phoneNumber = removeAllSpace(this.txtPhoneNumber.value);
                userInfoSave.isSameAddress = isSameAddress;
                userInfoSave.emailSchool = this.txtEmailSchool
                    ? this.txtEmailSchool.value
                    : null;
                userInfoSave.emailPersonal = this.txtEmailPersonal
                    ? this.txtEmailPersonal.value
                    : null;
                userInfoSave.emailAddress = this.txtEmailAddress
                    ? this.txtEmailAddress.value
                    : null;
                if (this.props.isFamilyDepend) {
                    userInfoSave.index = this.props.index;
                    userInfoSave.parent_id = this.props.member.id.id;
                    console.log("handleUpdateParentId", this.props.member.id.id);
                    this
                        .props
                        .handleUpdateParentId(this.props.member.id.id, this.props.index);
                }

                axios.post(apiConfig.url + "/users", {
                    role_id: role_id,
                    membership_id: membership_id,
                    parent_id: userInfoSave.parent_id,
                    gender_id: gender + 1,
                    firstname: this.txtFirstName.value,
                    middle_initial: this.txtMiddleInitial.value,
                    lastname: this.txtLastName.value,
                    date_of_birth: dob,
                    street_address: this.txtStreetAddress.value,
                    state: this.txtState.value,
                    zip_code: this.txtZipCode.value,
                    email_address_school: this.txtEmailSchool
                        ? this.txtEmailSchool.value
                        : null,
                    email_address_personal: this.txtEmailPersonal
                        ? this.txtEmailPersonal.value
                        : null,
                    email_address: this.txtEmailAddress
                        ? this.txtEmailAddress.value
                        : null,
                    phone_number: removeAllSpace(this.txtPhoneNumber.value),
                    is_delete: 0,
                    is_active: 1
                }).then(res => {
                    if (!this.props.isFamilyDepend) {
                        this
                            .props
                            .handleUpdateUserId(res.data.user.id);
                        const {id} = this.props.userInfo;
                        userInfoSave.id = id;
                    }
                    this
                        .props
                        .handleUserInfoCard(userInfoSave);
                });
            });
        }
    };

    handelChangeCheck = () => {
        wait(1).then(() => {
            this
                .props
                .handleUpdateSameAddress(this.props.index);
        }).then(() => {
            if (this.props.userInfo.isSameAddress) {
                this.txtStreetAddress.value = this.props.member.streetAddress;
                this.txtCityTown.value = this.props.member.ciTyTown;
                this.txtState.value = this.props.member.state;
                this.txtZipCode.value = this.props.member.zipCode;
                this.txtEmailAddress.value = this.props.member.emailAddress;
                this.txtPhoneNumber.value = this.props.member.phoneNumber;
            } else {
                this.txtStreetAddress.value = "";
                this.txtCityTown.value = "";
                this.txtState.value = "";
                this.txtZipCode.value = "";
                this.txtEmailAddress.value = "";
                this.txtPhoneNumber.value = "";
            }
        });
    };

    componentDidMount() {
        axios
            .get(apiConfig.url + "/genders")
            .then(res => {
                this.setState({genderValues: res.data.state});
            })
            .catch(err => {
                return err;
            });
        this.txtFirstName.value = this.props.userInfo.firstName;
        this.txtMiddleInitial.value = this.props.userInfo.middleInitial;
        this.txtLastName.value = this.props.userInfo.lastName;
        this.txtStreetAddress.value = this.props.userInfo.streetAddress;
        this.txtCityTown.value = this.props.userInfo.ciTyTown;
        this.txtState.value = this.props.userInfo.state;
        this.txtZipCode.value = this.props.userInfo.zipCode;
        this.txtPhoneNumber.value = this.props.userInfo.phoneNumber;

        if (this.txtEmailAddress) {
            this.txtEmailAddress.value = this.props.userInfo.emailAddress;
        }
        if (this.txtEmailPersonal) {
            this.txtEmailPersonal.value = this.props.userInfo.emailPersonal;
        }
        if (this.txtEmailSchool) {
            this.txtEmailSchool.value = this.props.userInfo.emailSchool;
        }
        if (this.props.isStudent) {
            const newState = {
                ...this.state.addressEmail
            };
            newState.value = " ";
            this.setState({addressEmail: newState});
        } else {
            const newState = {
                ...this.state.schoolEmail
            };
            newState.value = " ";
            this.setState({schoolEmail: newState});
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeouter);
        this.setState = (state, callback) => {
            return;
        };
    }

    handleUpdateGender = gender => {
        this
            .props
            .handleUpdateGender(gender, this.props.index);
    };

    handleUpdateDate = day => {
        this
            .props
            .handleUpdateDate(day, this.props.index);
    };

    render() {
        const {classes, isFamilyDepend, isStudent, userInfo, index} = this.props;
        const {isSave, isLoading, openDialog, genderValues} = this.state;
        const propsGenderValues = genderValues;
        return (
            <Grid item>
                <Space/>
                <Grid container spacing={8} justify="center" className={classes.root}>
                    <Grid item>
                        <Grid item>
                            <Grid container justify="space-between">
                                <Grid item>
                                    <TextField
                                        name="firstName"
                                        className={classes.widthTextField}
                                        placeholder="First Name*"
                                        inputRef={node => (this.txtFirstName = node)}
                                        disabled={isSave}
                                        onChange={this.handleInput}
                                        onBlur={this.handleInputValidation}
                                        error={this.state.firstName.errorMessage === ""
                                        ? false
                                        : true}/>
                                    <FormError errorMessage={this.state.firstName.errorMessage}/>
                                </Grid>
                                <Space/>
                                <Grid item>
                                    <TextField
                                        name="middleInitial"
                                        className={classes.widthTextField}
                                        placeholder="Middle Initial"
                                        inputRef={node => (this.txtMiddleInitial = node)}
                                        disabled={isSave}
                                        onChange={this.handleInput}
                                        onBlur={this.handleInputValidation}
                                        error={this.state.middleInitial.errorMessage === ""
                                        ? false
                                        : true}/>
                                    <FormError errorMessage={this.state.middleInitial.errorMessage}/>
                                </Grid>
                                <Space/>
                                <Grid item>
                                    <TextField
                                        name="lastName"
                                        className={classes.widthTextField}
                                        placeholder="Last Name*"
                                        inputRef={node => (this.txtLastName = node)}
                                        disabled={isSave}
                                        onChange={this.handleInput}
                                        onBlur={this.handleInputValidation}
                                        error={this.state.lastName.errorMessage === ""
                                        ? false
                                        : true}/>
                                    <FormError errorMessage={this.state.lastName.errorMessage}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Space/>
                        <Grid container>
                            <Grid container justify="space-between">
                                <Grid item>
                                    <Calendar
                                        onMouseDown={this.handleDate}
                                        errorMessage={this.state.dob.errorMessage}
                                        disabled={isSave}
                                        day={userInfo.dayOfBirth}
                                        handleUpdateDate={this.handleUpdateDate}/>
                                </Grid>
                                <Grid
                                    item
                                    className={isFamilyDepend
                                    ? classes.marginTopBreakPoint1
                                    : classes.marginTopBreakPoint2}>
                                    <ButtonGroup
                                        gender={userInfo.gender}
                                        values={propsGenderValues}
                                        disabled={isSave}
                                        handleUpdateGender={this.handleUpdateGender}
                                        index={index}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        {isFamilyDepend === true
                            ? (
                                <Grid>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        userInfo.isSameAddress
                                    }
                                    onChange = {
                                        this.handelChangeCheck
                                    }
                                    inputRef = {
                                        node => (this.check = node)
                                    } />}
                                        label="same address as subscriber"
                                        disabled={isSave}/>
                                </Grid>
                            )
                            : (<Space/>)}
                        <Grid>
                            <TextField
                                name="streetAddress"
                                placeholder="Street Address*"
                                fullWidth
                                className={classes.borderInput}
                                disabled={isSave}
                                inputRef={node => (this.txtStreetAddress = node)}
                                onChange={this.handleInput}
                                onBlur={this.handleInputValidation}
                                error={this.state.streetAddress.errorMessage === ""
                                ? false
                                : true}/>
                            <FormError errorMessage={this.state.streetAddress.errorMessage}/>
                        </Grid>
                        <Space/>
                        <Grid>
                            <TextField
                                name="cityTown"
                                placeholder="City/Town*"
                                fullWidth
                                className={classes.borderInput}
                                disabled={isSave}
                                inputRef={node => (this.txtCityTown = node)}
                                onChange={this.handleInput}
                                onBlur={this.handleInputValidation}
                                error={this.state.cityTown.errorMessage === ""
                                ? false
                                : true}/>
                            <FormError errorMessage={this.state.cityTown.errorMessage}/>
                        </Grid>
                        <Space/>
                        <Grid container>
                            <Grid item md={5} className={classes.marginTopBreakPoint1}>
                                <TextField
                                    name="state"
                                    placeholder="State*"
                                    className={classNames(classes.borderInput, classes.marginRight20)}
                                    disabled={isSave}
                                    inputRef={node => (this.txtState = node)}
                                    onChange={this.handleInput}
                                    onBlur={this.handleInputValidation}
                                    error={this.state.state.errorMessage === ""
                                    ? false
                                    : true}/>
                                <FormError errorMessage={this.state.state.errorMessage}/>
                            </Grid>
                            <Grid item md={7} className={classes.marginTopBreakPoint1}>
                                <TextField
                                    name="zipCode"
                                    placeholder="Zip Code*"
                                    className={classNames(classes.borderInput)}
                                    disabled={isSave}
                                    inputRef={node => (this.txtZipCode = node)}
                                    onChange={this.handleInput}
                                    onBlur={this.handleInputValidation}
                                    error={this.state.zipCode.errorMessage === ""
                                    ? false
                                    : true}/>
                                <FormError errorMessage={this.state.zipCode.errorMessage}/>
                            </Grid>
                        </Grid>
                        <Space/> {isStudent === true
                            ? (
                                <Grid>
                                    <Grid>
                                        <TextField
                                            name="schoolEmail"
                                            placeholder="Email Address (school email)*"
                                            fullWidth
                                            className={classes.borderInput}
                                            disabled={isSave}
                                            inputRef={node => (this.txtEmailSchool = node)}
                                            onChange={this.handleInput}
                                            onBlur={this.handleInputValidation}
                                            error={this.state.schoolEmail.errorMessage === ""
                                            ? false
                                            : true}/>
                                        <FormError errorMessage={this.state.schoolEmail.errorMessage}/>
                                    </Grid>
                                    <Space/>
                                    <Grid>
                                        <TextField
                                            name="personalEmail"
                                            placeholder="Email Address (personal email)"
                                            fullWidth
                                            className={classes.borderInput}
                                            disabled={isSave}
                                            inputRef={node => (this.txtEmailPersonal = node)}
                                            onBlur={this.handleInputValidation}
                                            onChange={this.handleInput}
                                            error={this.state.personalEmail.errorMessage === ""
                                            ? false
                                            : true}/>
                                        <FormError errorMessage={this.state.personalEmail.errorMessage}/>
                                    </Grid>
                                </Grid>
                            )
                            : (
                                <Grid>
                                    <TextField
                                        name="addressEmail"
                                        placeholder="Email Address*"
                                        fullWidth
                                        className={classes.borderInput}
                                        disabled={isSave}
                                        inputRef={node => (this.txtEmailAddress = node)}
                                        onBlur={this.handleInputValidation}
                                        onChange={this.handleInput}
                                        error={this.state.addressEmail.errorMessage === ""
                                        ? false
                                        : true}/>
                                    <FormError errorMessage={this.state.addressEmail.errorMessage}/>
                                </Grid>
                            )}
                        <Space/>
                        <Grid>
                            <NumberFormat
                                customInput={TextField}
                                format="### ### ####"
                                name="phone"
                                placeholder="Phone Number*"
                                fullWidth
                                className={classes.borderInput}
                                disabled={isSave}
                                inputRef={node => (this.txtPhoneNumber = node)}
                                onChange={this.handleInput}
                                onBlur={this.handleInputValidation}
                                error={this.state.phone.errorMessage === ""
                                ? false
                                : true}/>
                            <FormError errorMessage={this.state.phone.errorMessage}/>
                        </Grid>
                        <Space/>
                        <Grid container item justify="flex-end">
                            <Grid item>
                                {isSave === false
                                    ? (
                                        <Button
                                            onClick={this.handelSaveClick}
                                            variant="outlined"
                                            className={classes.button}
                                            disabled={isLoading}>
                                            {isLoading && <CircularProgress size="13px"/>}
                                            Save
                                        </Button>
                                    )
                                    : (
                                        <Button
                                            onClick={this.handelEditClick}
                                            variant="outlined"
                                            className={classes.button}>
                                            Edit
                                        </Button>
                                    )}
                                {isFamilyDepend && (
                                    <Button
                                        onClick={this.handleOpenDialog}
                                        variant="outlined"
                                        className={classNames(classes.button, classes.marginLeft20)}>
                                        Delete
                                    </Button>
                                )}
                            </Grid>
                            <Dialog
                                open={openDialog}
                                onClose={this.handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                <DialogTitle id="alert-dialog-title">
                                    {"Are you sure you want to delete member AAAA ?"}
                                </DialogTitle>

                                <DialogActions>
                                    <Button
                                        onClick={() => this.handleDelete(index)}
                                        variant="outlined"
                                        autoFocus
                                        className={classes.button}>
                                        Ok
                                    </Button>
                                    <Button
                                        onClick={this.handleCloseDialog}
                                        variant="outlined"
                                        className={classes.button}>
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(UserInfoCard);
