"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";


function Filter() {
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get("capacity") ?? "all";

    const router = useRouter();
    const pathname = usePathname();

    function handleFilter(filter: string) {
        const params = new URLSearchParams(searchParams);
        params.set("capacity", filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    return (
        <div className="border border-primary-800 flex">
            <Button filterName="all" currentFilter={currentFilter} handleFilter={handleFilter}>
                All cabins
            </Button>
            <Button filterName="small" currentFilter={currentFilter} handleFilter={handleFilter}>
                1&mdash;3 guests
            </Button>
            <Button filterName="medium" currentFilter={currentFilter} handleFilter={handleFilter}>
                4&mdash;7 guests
            </Button>
            <Button filterName="large" currentFilter={currentFilter} handleFilter={handleFilter}>
                8&mdash;12 guests
            </Button>

        </div>
    );
}

export default Filter;



type ButtonProps = {
    filterName: string;
    handleFilter: (filter: string) => void;
    currentFilter: string;
    children: React.ReactNode;
}
function Button({ filterName, handleFilter, currentFilter, children }: ButtonProps) {
    return (
        <button className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${filterName === currentFilter ? "bg-primary-700 text-primary-50" : ""}`} onClick={() => handleFilter(filterName)}>
            {children}
        </button>
    )
}
