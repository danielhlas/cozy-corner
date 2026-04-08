import SignInButton from "@/app/_components/SignInButton";

export default function Page() {
    return (
        <div className="pt-20 md:pt-13 flex flex-col gap-10 mt-10 items-center">
            <h2 className="text-3xl font-semibold text-center md:text-left">
                Sign in to access your guest area
            </h2>
            <SignInButton />
        </div>
    );
}
