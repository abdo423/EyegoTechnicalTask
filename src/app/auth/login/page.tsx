import LoginForm from "@/components/loginForm";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};
export default Page;