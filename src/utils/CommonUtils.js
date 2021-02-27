import _ from "lodash";
import moment from "moment";

export function safeToString(object) {
  return `${object ? object : ""}`;
}

export function validateEmail(email) {
  // eslint-disable-next-line
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateNIC(nic) {
  let re = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]{1}?\s*$/;
  return re.test(String(nic).toLowerCase());
}

export function removeAllSpace(str) {
  if (str) {
    return str.replace(/\s/g, "");
  }
  return "";
}

export function formatNIC(str) {
  if (str) {
    str = removeAllSpace(str);
    let parts = str.match(/[\s\S]{1,2}/g) || [];
    return parts.join(" ");
  }
  return "";
}

export function convertNumberToStringUK(number) {
  if ((number && _.isNumber(number)) || number === 0) {
    return number.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP"
    });
  } else {
    return "";
  }
}

export function getRandomColor() {
  return (
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")"
  );
}

export function charIsNumber(str) {
  let re = /^[0-9]+$/;
  return re.test(String(str).toLowerCase());
}

export function removeCharacterOutOfNumber(number) {
  let index = -1;
  _.map(`${number}`, (c, i) => {
    if (!charIsNumber(c) && c !== "." && index === -1) {
      index = i;
    }
  });
  if (index > -1 && number) {
    return `${number}`.substring(0, index);
  }
  return number;
}

export function cloneObjectWithPredefined(objPredefined, destination) {
  return _.mapValues(objPredefined, (v, k) => {
    return _.has(destination, k) ? _.get(destination, k) : v;
  });
}

export function allLetter(str) {
  let re = /^[A-Za-z]+$/;
  return re.test(String(str).toLowerCase());
}

export function validateMMYY(str) {
  return moment(str, "MM/YYYY", true).isValid();
}

export function validatePhoneNumber(str) {
  let re = /^\d{10}$/;
  str = removeAllSpace(str);
  return re.test(String(str).toLowerCase());
}

export default {
  allLetter,
  removeAllSpace,
  validatePhoneNumber,
  validateMMYY,
  safeToString,
  validateEmail,
  convertNumberToStringUK,
  getRandomColor,
  charIsNumber,
  removeCharacterOutOfNumber,
  cloneObjectWithPredefined
};
