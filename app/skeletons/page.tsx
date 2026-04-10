
import SkeletonElement from "./Skeleton";
import SkeletonListOfCards from "./SkeletonListOfCards";

export const metadata = {
    title: "Skeleton",
}

export default async function Page() {
    return (
        <div className="mt-20 animate-pulse">

            <div className="skeleton-wrapper">
                <div className="skeleton-article">
                    <div className="w-70 h-7 mb-5 bg-gray-600 mt-2.5 rounded-sm" />
                    <div className="h-2" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />


                    <div className="lg:hidden">
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                    </div>
                    <div className="md:hidden">
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                    </div>
                    <div className="sm:hidden">
                        <SkeletonElement type="text" />
                    </div>
                </div>
            </div>

            {/* filter */}
            <div className="flex justify-end">
                <div className="mt-7 mb-1 h-15 xs:h-10 w-full xs:w-9/10 sm:w-7/10 lg:w-5/10 border-primary-800 border" />
            </div>

            <SkeletonListOfCards />
        </div>
    );
}
