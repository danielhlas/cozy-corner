import { Josefin_Sans, Inter } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import MobileMenu from "./_components/MobileMenu";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const josefin = Josefin_Sans({
    subsets: ["latin"],
    display: "swap",
})

export const metadata = {
    title: {
        template: "%s / Cozy Corner",
        default: "Welcome / Cozy Corner",
    },
    description: "Cozy Corner - reserve a cabin today!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={cn("font-sans", inter.variable)}>
            <body className={`bg-primary-950 text-primary-100 min-h-screen ${josefin.className} grid grid-cols-[1rem_1fr] md:block `}>
                <div className="hidden md:flex md:flex-col">
                    <Header />
                </div>
                <div className="flex flex-col md:hidden">
                    <MobileMenu />
                </div>
                <div className="px-8 py-12">
                    <main className="max-w-7xl mx-auto my-0">
                        <ReservationProvider>
                            {children}
                        </ReservationProvider>
                    </main>
                </div>
            </body>
        </html>
    )
}