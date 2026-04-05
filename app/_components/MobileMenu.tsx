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
import SignOutButton from "./SignOutButton";
import { navLinks } from "./SideNavigation";
import { signOutAction } from "../_lib/actions";

export function SheetSide({ session }: { session: any }) {

    return (
        <div className="flex flex-wrap gap-2">

            <Sheet key={"left"}>
                <SheetTrigger render={
                    <Button variant="outline" className="capitalize cursor-pointer rounded-none w-11 h-11">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                    </Button>
                } />


                <SheetContent
                    side={"left"}
                    className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh] p-9 flex flex-col justify-between"
                >
                    <div>
                        <SheetTitle className="mb-3 text-xl font-bold">Menu</SheetTitle>
                        <ul className="flex flex-col gap-2 items-left">
                            <li>
                                <SheetClose>
                                    <Link href="/cabins" className="hover:text-primary-300 text-[1.05rem]">
                                        Cabins
                                    </Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose>
                                    <Link href="/about" className="hover:text-primary-300 text-[1.05rem]">
                                        About
                                    </Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose>
                                    <Link href="/account" className="hover:text-primary-300 text-[1.05rem]">
                                        Account
                                    </Link>
                                </SheetClose>
                            </li>
                        </ul>

                        {session?.user ?
                            <>
                                <SheetTitle className='mt-14 mb-3 text-xl font-bold'>Account Menu</SheetTitle>
                                <div className="no-scrollbar overflow-y-auto">
                                    <ul className='flex flex-col gap-2'>
                                        {navLinks.map((link) => (
                                            <li key={link.name}>
                                                <SheetClose>
                                                    <Link href={link.href} className="hover:text-primary-300 text-[1.05rem]">
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
                            <>
                                <p>Logged as {session.user.name}</p>
                                <form action={signOutAction}>
                                    <button className='cursor-pointer mt-4 hover:text-primary-300 text-[1.05rem]'>
                                        Sign out
                                    </button>
                                </form>
                            </>
                            : <p>Not logged in</p>
                        }
                    </div>


                </SheetContent>
            </Sheet>
        </div>
    )
}
