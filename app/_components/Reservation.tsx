import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import { getSettings, getBookedDatesByCabinId, getGuest } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import { SafeCabinType } from "../cabins/[cabinId]/page";


async function Reservation({ cabin }: { cabin: SafeCabinType }) {
    const session = await auth();
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(String(cabin.id)),
    ]);



    return (
        (session?.user ?
            <div className="grid grid-col-1 lg:grid-cols-2 border border-primary-800 min-h-[400px]">
                <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
                <ReservationForm cabin={cabin} user={session.user} />
            </div>
            : <LoginMessage />)

    )
}

export default Reservation