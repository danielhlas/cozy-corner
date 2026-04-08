import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[1fr] md:grid-cols-[16rem_1fr] h-full lg:gap-10">
            <div className="hidden md:flex pt-12">

                <SideNavigation />
            </div>
            <div className="py-1">
                {children}
            </div>
        </div>
    )
}