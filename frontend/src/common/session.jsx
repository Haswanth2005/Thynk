const storeInSession = (key, value) => {
  try {
    sessionStorage.setItem(key, value)
  } catch (e) {
    console.warn("Storage access denied:", e)
  }
}

const lookInSession = (key) => {
  try {
    return sessionStorage.getItem(key)
  } catch (e) {
    console.warn("Storage access denied:", e)
    return null
  }
}

const removeFromSession = (key) => {
  try {
    return sessionStorage.removeItem(key)
  } catch (e) {
    console.warn("Storage access denied:", e)
  }
}

const logOutUser = () => {
  try {
    sessionStorage.clear()
  } catch (e) {
    console.warn("Storage access denied:", e)
  }
}

export {storeInSession, lookInSession, removeFromSession, logOutUser}