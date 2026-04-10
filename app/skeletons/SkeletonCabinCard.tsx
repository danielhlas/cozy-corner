import SkeletonElement from "./Skeleton";

const SkeletonCabinCard = () => {
    return (

        <div className="flex border-primary-800 border h-50">
            <div className="relative flex-1">
                <div className="grid grid-cols-[2fr_7fr]">

                    {/*Left side: image */}
                    <div>
                        <div className="h-50 bg-gray-600" />
                    </div>

                    {/*Right side: text */}
                    <div className="flex flex-col justify-between">
                        <div className="py-3 px-5">
                            <SkeletonElement type="title" />
                            <div className="w-3/4 ">
                                <SkeletonElement type="text" />
                            </div>
                        </div>

                        <div className="flex w-full justify-end ">
                            <div className="border-t-1 border-l-1 border-primary-800 w-40 h-10" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCabinCard;