const PROFILE_KEY = "profile";
export function getBy(name) {
  if (localStorage) {
    let storage = localStorage.getItem(name);
    if (storage) {
      return JSON.parse(storage);
    }
  }
  return null;
}

export function setBy(name, object) {
  if (localStorage) {
    localStorage.setItem(name, JSON.stringify(object));
  }
}

export function getProfile() {
  return getBy(PROFILE_KEY);
}

export function setProfile(object) {
  return new Promise((resolve, reject) => {
    setBy(PROFILE_KEY, object);

    setTimeout(() => {
      resolve();
    }, 50);
  });
}

export function removeBy(name) {
  localStorage.removeItem(name);
}

export function removeProfile() {
  removeBy(PROFILE_KEY);
}

export function existKey(key) {
  if (localStorage.getItem(key) === null) {
    return false;
  } else {
    return true;
  }
}


export default {
  getBy,
  setBy,
  getProfile,
  setProfile,
  removeBy,
  removeProfile,
  existKey
};
