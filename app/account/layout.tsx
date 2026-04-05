import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
            <div className="hidden md:flex">
                <SideNavigation />
            </div>
            <div className="py-1">
                {children}
            </div>
        </div>
    )
}