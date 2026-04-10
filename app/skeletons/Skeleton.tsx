type SkeletonType = 'text' | 'title' | 'avatar' | 'thumbnail';

const skeletonStyles: Record<SkeletonType, string> = {
    text: "w-full h-3",
    title: "w-1/2 h-5 mb-[15px]",
    avatar: "w-25 h-25 rounded-full",
    thumbnail: "w-25 h-25"
};

function Skeleton({ type }: { type: SkeletonType }) {
    const variantClasses = skeletonStyles[type];

    return (
        <div className={`bg-gray-600 mt-[14px] rounded-sm  ${variantClasses}`} />
    );
}

export default Skeleton;
