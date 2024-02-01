
import analytics from "@react-native-firebase/analytics";

export default {
  APP_TITLE: "Avis de passage",
  HOW_WAS_YOUR_LAST_DELIVERY: "How was your last delivery?",
  NOTE_A_DELIVERY: "NOTE A DELIVERY",
  REVIEWS: "Reviews",
  PROFILE: "Profile",
  MY_REVIEWS: "My review",
  REQUIRED: "Required",
  COMPANY: "Company",
  COMPANY_LIST: "Company List",
  SELECT_COMPANY: "Select Company",
  DATE: "Date",
  SELECT_DATE: "Select Date",
  NOTE: "Note",
  POSTAL_CODE: "Postal Code",
  ENTER_POSTAL_CODE: "Enter postal Code",
  CITY: "City",
  ENTER_CITY: "Enter city",
  COMMENT: "Comment",
  ENTER_COMMENT: "Enter comment",
  CHOOSE_AN_IMAGE: "Cheese an image",
  ADDITIONAL_PHOTO: "Additional photo",
  PACKAGE_NUMBER: "Package number",
  ENTER_PACKAGE_NUMBER: "Enter package number",
  SUBMIT_A_COMPLAINT: "Submit a complaint",
  EMAIL: "Email",
  ENTER_EMAIL: "Enter email",
  ENTER_YOUR_EMAIL: "Enter your email",
  ENTER_YOUR_PASSWORD: "Enter your password",
  SHOPPING_WEBSITE: "Shopping website",
  ENTER_SHOPPING_WEBSITE: "ex: Amazon, CDiscount, Zalando",
  CANCEL_CAP: "CANCEL",
  CANCEL: "Cancel",
  DONE_CAP: "DONE",
  TAKE_A_NEW_PHOTO: "Take a new photo",
  OPEN_GALLERY: "Open Gallery",
  PLEASE_SELECT_COMPANY_NAME: "Please select company name",
  PLEASE_ENTER_POSTAL_CODE: "Please enter postal code",
  PLEASE_ENTER_CITY: "Please enter city",
  RECENT_REVIEWS: "Recent Reviews",
  ABOUT_US: "About Us",
  TERM_CONDITIONS: "Term & Conditions",
  PRIVACY_POLICY: "Privacy Policy",
  LOGIN: "Log In",
  LOGOUT: "Log Out",
  DELETE_ACCOUNT: "Delete Account",
  USER_NAME: "User Name",
  USER_EMAIL: "User Email",
  SIGN_IN_WITH_EMAIL: "Sign In with email",
  SIGN_IN: "Sign In",
  SIGN_UP_WITH_EMAIL: "Sign Up with Email",
  SIGN_UP: "Sign Up",
  NEW_USER_REGISTER: "New user? Register",
  PASSWORD: "Password",
  CONFIRM_PASSWORD: "Confirm Password",
  EMAIL_VALIDATION_MSG: "Please enter your email",
  USERNAME_VALIDATION_MSG: "Please enter user name",
  PASSWORD_VALIDATION_MSG: "Please enter password",
  PASSWORD_CORRECT_VALIDATION_MSG: "Please enter correct confirm password",
  PASSWORD_LENGTH_VALIDATION_MSG: "Password must be at least 8 characters long",
  AUTH_EVENT: "Auth",
  SIGN_UP_EMAIL: 'Sign Up with Email',
  EMAIL_SIGN_UP_TEXT: 'Sign up with Email',
  EMAIL_SIGN_IN_TEXT: 'Sign in with Email',
  INVALID_VALIDATION_MSG: "Invalid email/password!",
  MANY_REQ_TITLE_MSG: "Too many login attempts",
  MANY_REQ_VALIDATION_MSG: "Please wait a few minutes and try logging in again",
  SIGN_IN_EMAIL: 'Sign In with Email',
  EMAIL_ALREADY_VALIDATION_MSG: "Email address is already in use",
  EMAIL_INVALID_VALIDATION_MSG: "Email address is invalid",
  ACCOUNT_DELETED: "Account deleted",
  ACCOUNT_DELETED_MESSAGE: "Your account has been deleted. Please contact support for assistance",
  BTN_RESEND: "Resend email",
  BTN_LOGIN: "Login",
  BTN_PROCEED: "Proceed",
  VERIFICATION_ALERT_TITLE: "Email verification required",
  VERIFICATION_MESSAGE: "Please check your email first to confirm your email address, then return to the app and press the proceed button to continue with the sign-up process",
  EMAIL_VERIFICATION_MSG: "Email is not verified yet, go to your email and verified",
}

export const ScreenName = {
  SPLASH_SCREEN : "SplashScreen",
  MAIN_SCREEN : "MainScreen",
  ADD_REVIEW_SCREEN : "AddReviewScreen",
  PROFILE_SCREEN : "ProfileScreen",
  SIGN_IN_SCREEN : "SignInScreen",
  SIGN_UP_SCREEN : "SignUpScreen",
}


export const firebaseAnalytic = (name, parameters) => {
  try {
    // analytics().logEvent(name, parameters);
  } catch (e) {
    console.log("Firebase analytics error:", e)
  }

}
