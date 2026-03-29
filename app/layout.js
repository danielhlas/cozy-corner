import { Josefin_Sans } from "next/font/google";
import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`bg-primary-950 text-primary-100 min-h-screen flex flex-col ${josefin.className}`}>
                <Header />
                <div className="flex-1 px-8 py-12">
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