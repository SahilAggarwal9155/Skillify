// import AuthForm from "./AuthForm";
import Analytics from "../../assets/images/svg/13246824_5191077.svg";
import SignUp from "./AuthFirebase";

const SignupPage = () => {
  return (
    <SignUp
      title="Create Account"
      subtitle="Welcome, please enter your details."
      onSuccessPath="/"
      type="signup"
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkPath="/login"
      analyticsImage={Analytics}
    />
  );
};

export default SignupPage;
