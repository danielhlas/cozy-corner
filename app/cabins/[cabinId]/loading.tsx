import SkeletonElement from "../../skeletons/Skeleton";

function loading() {
    return (
        <div className="pt-18 md:pt-20 pb-6 max-w-6xl mx-auto animate-pulse">
            <div className="flex flex-col md:grid md:grid-cols-[3fr_4fr] gap-2 xs:gap-8 md:gap-20 border border-primary-800 py-3 px-3 sm:px-7 md:px-10 mb-24">
                {/* Image */}
                <div className="relative md:scale-[1.15] md:-translate-x-3 min-h-[35vh]">
                    <div className="h-70 md:h-130 bg-gray-600" />
                </div>

                <div>
                    {/* Title */}
                    <div className="flex justify-center md:justify-start mb-5 md:py-6 pb-1 bg-primary-950 md:w-[150%]">
                        <div className="w-1/3 h-15 md:h-20 bg-gray-600 rounded-sm" />
                    </div>

                    {/* Description */}
                    <p className="text-lg text-primary-300 mb-9">
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                        <div className="md:hidden">
                            <SkeletonElement type="text" />
                            <SkeletonElement type="text" />
                        </div>
                    </p>

                    <div className="flex flex-col gap-4 mb-7">
                        <div className="h-4 w-60 bg-gray-600 rounded-sm" />
                        <div className="h-4 w-60 bg-gray-600 rounded-sm" />
                        <div className="h-4 w-60 bg-gray-600 rounded-sm" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default loading