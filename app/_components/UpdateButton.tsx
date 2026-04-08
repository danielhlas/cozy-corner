"use client";

import { useFormStatus } from "react-dom";

function UpdateButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} className="bg-accent-500 mx-auto px-4 sm:px-8 py-2 sm:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer">
            {pending ? "Updating..." : "Update reservation"}
        </button>
    )
}

export default UpdateButton;
