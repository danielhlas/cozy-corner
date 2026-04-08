import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png"

export default function Home() {
  return (
    <>
      <Image src={bg} fill placeholder="blur" className="object-cover object-top h-dvh" alt="Mountains and forests with two cabins" />

      <div className="relative z-1 text-center">
        <h1 className="text-base/19 text-step-7 text-primary-50 mb-10 tracking-tight font-normal pt-60 md:pt-36 ">
          Welcome to Cozy Corner
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-step-0 font-semibold hover:bg-accent-600 transition-all"
        >
          Explore our cabins
        </Link>
      </div>
    </>
  );
}
