import React from 'react';
import SkeletonElement from "../skeletons/Skeleton";

export default function Loading() {
    return (
        <>
            <div className="pt-20 mb-10 animate-pulse">
                {/*Title */}
                <div className="h-9 w-2/5 bg-gray-600 rounded-lg md:mt-0 mt-6 mb-7" />

                {/*Main content */}
                <div className="flex flex-col md:flex-row mb-15 md:gap-11">

                    {/*Left side - text */}
                    <div className="w-full md:w-1/2">
                        <div>
                            <SkeletonElement type="text" />
                            <SkeletonElement type="text" />
                            <SkeletonElement type="text" />
                            <div className="lg:hidden">
                                <SkeletonElement type="text" />
                            </div>
                        </div>

                        <div className="mt-10">
                            <SkeletonElement type="text" />
                            <SkeletonElement type="text" />
                            <SkeletonElement type="text" />
                            <div className="lg:hidden">
                                <SkeletonElement type="text" />
                            </div>
                        </div>

                        <div className="mt-10">
                            <SkeletonElement type="text" />
                            <SkeletonElement type="text" />
                            <div className="lg:hidden">
                                <SkeletonElement type="text" />
                            </div>
                        </div>
                    </div>

                    {/*Right side - img */}
                    <div className="w-full md:w-1/2 h-110 lg:h-130 bg-gray-600  mt-12 md:mt-0" />

                </div>
            </div>



            {/*Title */}


            {/*Main content */}
            <div className="flex flex-col md:flex-row mb-15 md:gap-11">

                {/*img */}
                <div className="w-full hidden md:block md:w-1/2 h-110 lg:h-130 bg-gray-600  mt-12 md:mt-0" />

                {/*text */}
                <div className="w-full md:w-1/2">
                    <div className="h-9 w-3/5 bg-gray-600 rounded-lg md:mt-0 mt-6 mb-7" />
                    <div>
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                        <div className="lg:hidden">
                            <SkeletonElement type="text" />
                        </div>
                    </div>

                    <div className="mt-10">
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                        <div className="lg:hidden">
                            <SkeletonElement type="text" />
                        </div>
                    </div>

                    <div className="mt-10">
                        <SkeletonElement type="text" />
                        <SkeletonElement type="text" />
                        <div className="lg:hidden">
                            <SkeletonElement type="text" />
                        </div>
                    </div>
                </div>

                <div className="w-full md:hidden md:w-1/2 h-110 lg:h-130 bg-gray-600  mt-12 md:mt-0" />

            </div>
        </>

    );

}