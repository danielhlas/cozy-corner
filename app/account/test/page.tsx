
import SkeletonElement from "../../skeletons/Skeleton";


export default async function Page() {
    return (
        <div className="pt-23 md:pt-14 animate-pulse">
            <div className="w-1/2 md:w-[40%] h-7 bg-gray-600 mb-6 rounded-full" />

            <div className="mb-10">
                <SkeletonElement type="text" />
                <div className="block lg:hidden w-4/5">
                    <SkeletonElement type="text" />
                </div>
            </div>

            {/* form */}
            <div className="bg-primary-900 py-6 px-12 flex gap-6 flex-col">
                <div>
                    <div className="bg-gray-600 mt-[10px] rounded-full mb-1.5 w-1/5 h-4.5" />

                    <div className="w-full h-13 bg-gray-600" />
                </div>

                <div>
                    <div className="bg-gray-600 mt-[8px] rounded-full mb-1.5 w-1/5 h-4.5" />
                    <div className="w-full h-13 bg-gray-600" />
                </div>

                <div>
                    <div className="bg-gray-600 mt-[8px] rounded-full mb-1.5 w-1/5 h-4.5" />
                    <div className="w-full h-13 bg-gray-600" />
                </div>


                <div>
                    <div className="bg-gray-600 mt-[8px] rounded-full mb-1.5 w-1/5 h-4.5" />
                    <div className="w-full h-13 bg-gray-600" />
                </div>

                {/* button */}
                <div className="flex justify-end items-center">
                    <div className="w-[184px] h-14 bg-gray-600" />
                </div>
            </div>


        </div>
    );

}
