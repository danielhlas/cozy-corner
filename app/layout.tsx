import { Josefin_Sans, Inter } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import { SheetSide } from "./_components/MobileMenu";
import { cn } from "@/lib/utils";
import { auth } from "./_lib/auth";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <html lang="en" className={cn("font-sans", inter.variable)}>
            <body className={`bg-primary-950 text-primary-100 min-h-screen ${josefin.className} block`}>
                <div className="hidden md:block">
                    <Header />
                </div>
                <div className="block md:hidden z-10 border-b-1 border-b-primary-900 h-13 w-full fixed top-0 bg-primary-950/98">
                    <SheetSide session={session} />
                </div>
                <div className="px-4 xs:px-6 md:px-10">
                    <main className="max-w-7xl mx-auto">
                        <ReservationProvider>
                            {children}
                        </ReservationProvider>
                    </main>
                </div>
            </body>
        </html>
    )
}