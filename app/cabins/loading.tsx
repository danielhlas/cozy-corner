import Spinner from "../_components/Spinner";
import SkeletonIntroduction from "../skeletons/SkeletonIntroduction";

function loading() {
    return (
        <div className="mt-20">
            <SkeletonIntroduction />
        </div>
    )
}

export default loading