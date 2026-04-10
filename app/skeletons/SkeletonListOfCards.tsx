import SkeletonCabinCard from "./SkeletonCabinCard"

function SkeletonListOfCards() {
    return (
        <div className="mt-5 grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCabinCard key={index} />
            ))}
        </div>
    )
}

export default SkeletonListOfCards