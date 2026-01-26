function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}

function getItem(key = "") {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log(error);

    return null;
  }
}

export const cache = { setItem, getItem };
