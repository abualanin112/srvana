import SignupForm from "@/components/layout/SignupForm";
import CustomLogo from "@/components/ui/CustomLogo";

export default function Signup() {
  return (
    <div className="bg-background w-full flex min-h-screen flex-col items-center justify-center gap-4 p-6 md:p-10">
      <div className="flex w-[35vw] min-w-[400px] flex-col gap-8">
        <CustomLogo className="w-50 self-center text-primary" />
        <SignupForm />
      </div>
    </div>
  );
}
