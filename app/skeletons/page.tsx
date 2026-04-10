
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
                    <div className="w-1/2 h-7 mb-[15px] bg-gray-600 mt-2.5 rounded-sm" />
                    <div className="h-2" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <SkeletonElement type="text" />
                    <div className="md:hidden">
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <div className="mt-7 mb-1 h-10 w-full md:w-[45%] border-primary-800 border" />
            </div>

            <SkeletonListOfCards />
        </div>
    );

}
