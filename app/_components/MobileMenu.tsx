"use client";

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import { navLinks } from "./SideNavigation";
import { signOutAction } from "../_lib/actions";

export function SheetSide({ session }: { session: any }) {

    return (
        <div className="flex flex-wrap gap-2">

            <Sheet key={"left"}>
                <div className="flex justify-between w-full">
                    <SheetTrigger render={
                        <Button variant="ghost" className="capitalize cursor-pointer rounded-none w-14 h-13">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#ffffff" viewBox="0 0 256 256" className="size-9"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                        </Button>
                    }
                    />
                    <Link href="/account">
                        <Button variant="ghost" className="capitalize cursor-pointer rounded-none w-14 h-13">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#ffffff" viewBox="0 0 256 256" className="size-7"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
                        </Button>
                    </Link>
                </div>


                <SheetContent
                    side={"left"}
                    className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh] p-9 flex flex-col justify-between"
                >
                    <div>
                        <SheetTitle className="mb-3 text-xl font-bold">Menu</SheetTitle>
                        <ul className="flex flex-col gap-2 items-left text-lg">
                            <li>
                                <SheetClose>
                                    <Link href="/" className="hover:text-primary-300 ">
                                        Home
                                    </Link>
                                </SheetClose>
                            </li>

                            <li>
                                <SheetClose>
                                    <Link href="/cabins" className="hover:text-primary-300">
                                        Cabins
                                    </Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose>
                                    <Link href="/about" className="hover:text-primary-300">
                                        About
                                    </Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose>
                                    <Link href="/account" className="hover:text-primary-300">
                                        Account
                                    </Link>
                                </SheetClose>
                            </li>
                        </ul>

                        {session?.user ?
                            <>
                                <SheetTitle className='mt-14 mb-3 text-xl font-bold'>Account Menu</SheetTitle>
                                <div className="no-scrollbar overflow-y-auto">
                                    <ul className='flex flex-col gap-2 text-lg'>
                                        {navLinks.map((link) => (
                                            <li key={link.name}>
                                                <SheetClose>
                                                    <Link href={link.href} className="hover:text-primary-300">
                                                        {link.name}
                                                    </Link>
                                                </SheetClose>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                            : null}
                    </div>
                    <div>

                        {session?.user ?
                            <SheetClose>
                                <p>Logged as {session.user.name}</p>
                                <form action={signOutAction}>
                                    <button className='cursor-pointer mt-4 hover:text-primary-300 text-lg text-left w-full'>
                                        Sign out
                                    </button>
                                </form>
                            </SheetClose>
                            : <p>Not logged in</p>
                        }
                    </div>


                </SheetContent>
            </Sheet>
        </div >
    )
}
