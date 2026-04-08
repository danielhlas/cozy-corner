import Link from "next/link";

export default function Page() {
    return (
        <div className="pt-24 md:pt-13 text-center space-y-6">
            <h1 className="text-3xl font-semibold">
                Thank you for your reservation!
            </h1>
            <Link
                href="/account"
                className="underline text-xl text-accent-500 inline-block"
            >
                Check your reservations &rarr;
            </Link>
        </div>
    );
}
