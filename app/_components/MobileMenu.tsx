"use client"

import { useState } from "react" // 1. Přidán useState
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { navLinks } from "./SideNavigation"

function MobileMenu() {
    // 2. Definice stavu pro otevření/zavření
    const [open, setOpen] = useState(false)

    // Pomocná funkce pro zavření menu
    const closeMenu = () => setOpen(false)

    return (
        <div className="flex flex-wrap gap-5">
            {/* 3. Propojení stavu s komponentou Sheet */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon-lg" className="rounded-none cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256">
                            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                        </svg>
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="left"
                    className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
                >
                    <SheetHeader>
                        <SheetTitle className="mb-3">Menu</SheetTitle>
                        <SheetDescription>
                            <ul className="flex flex-col items-left gap-4">
                                <li>
                                    {/* 4. Nahrazení SheetClose za onClick handler */}
                                    <Link href="/cabins" onClick={closeMenu} className="hover:text-accent-400 transition-colors">
                                        Cabins
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" onClick={closeMenu} className="hover:text-accent-400 transition-colors">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account" onClick={closeMenu} className="hover:text-accent-400 transition-colors">
                                        Account
                                    </Link>
                                </li>
                            </ul>
                        </SheetDescription>
                    </SheetHeader>

                    <SheetHeader className="mt-6">
                        <SheetTitle className="mb-3">Guest Area</SheetTitle>
                        <SheetDescription>
                            <ul className="flex flex-col items-left gap-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            onClick={closeMenu}
                                            className="hover:text-accent-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileMenu