"use client";
import { useFormStatus } from "react-dom";
import { updateGuest } from "../_lib/actions";
import { Guest } from "@/types/supabase";
import Image from "next/image";

function UpdateProfileForm({ guest, children }: { guest: Guest, children: React.ReactNode }) {



    const { fullName, email, nationality, nationalID, countryFlag } = guest;

    return (
        <form action={updateGuest} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
            <div className="space-y-2">
                <label>Full name</label>
                <input
                    defaultValue={fullName ? fullName : "Name not provided"}
                    name="fullName"
                    disabled
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <label>Email address</label>
                <input
                    defaultValue={email ? email : "Email not provided"}
                    name="email"
                    disabled
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from?</label>
                    <Image
                        src={countryFlag ? countryFlag : "/img/flags/default.png"}
                        alt="Country flag"
                        width={27}
                        height={20}
                        className="h-5 rounded-xs"
                    />
                </div>

                {children}
            </div>



            <div className="space-y-2">
                <label htmlFor="nationalID">National ID number</label>
                <input
                    defaultValue={nationalID ? nationalID : "National ID not provided"}
                    key={nationalID}
                    name="nationalID"
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs"
                />
            </div>

            <div className="flex justify-end items-center gap-6">
                <SubmitButton />
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer">
            {pending ? "Updating..." : "Update profile"}
        </button>
    )
}

export default UpdateProfileForm;