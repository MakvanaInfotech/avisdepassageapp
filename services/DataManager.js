let userData = null;
let profilePicture = null;
let userName = ""

export const setUser = (user) => {
    userData = user
};

export const getUser = () => {
    return userData;
};

export const setProfileUri = (profile) => {
    profilePicture = profile
};

export const getProfileUri = () => {
    return profilePicture;
};

export const setUserName = (name) => {
    userName = name
};

export const getUserName = () => {
    return userName;
};
