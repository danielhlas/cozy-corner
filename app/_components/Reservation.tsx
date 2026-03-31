import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import { getSettings, getBookedDatesByCabinId } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import { Cabin } from "@/types/supabase";

async function Reservation({ cabin }: { cabin: Cabin }) {
    const session = await auth();
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(String(cabin.id)),
    ]);

    return (
        <div className="grid grid-col-1 lg:grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
            {session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
        </div>
    )
}

export default Reservation