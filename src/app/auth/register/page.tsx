import LoginForm from "@/components/loginForm";

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="w-full max-w-md">
        <h1>register</h1>
        <LoginForm />
      </div>
    </div>
  );
};
export default Register;