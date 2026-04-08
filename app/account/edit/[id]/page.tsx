import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import UpdateButton from "@/app/_components/UpdateButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {

    const reservationId = params.id;
    const { numGuests, observations, cabinId } = await getBooking(reservationId)
    const { maxCapacity } = await getCabin(cabinId)

    return (
        <div className="pt-22 md:pt-13 mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-7">
                <h2 className="hidden md:block font-semibold text-2xl text-accent-400">
                    Edit Reservation #{reservationId}
                </h2>
                <Button className={"rounded-sm cursor-pointer"}>
                    <Link href="/account" className="flex items-center gap-1 text-gray-300">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#d1d5dc" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg></span>
                        <span className="mt-1">Back</span>
                    </Link>
                </Button>

                <h2 className="md:hidden font-semibold text-2xl text-accent-400 mt-5">
                    Edit Reservation #{reservationId}
                </h2>
            </div>

            <form action={updateReservation} className="bg-primary-900 py-8 px-4  sm:px-12 text-lg flex gap-6 flex-col" >

                <input type="hidden" name="reservationId" value={reservationId} />

                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        defaultValue={numGuests}
                        name="numGuests"
                        id="numGuests"
                        className="px-5 py-3 mt-2 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs"
                        required
                    >
                        <option value="" key="">
                            Select number of guests...
                        </option>
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        defaultValue={observations}
                        className="px-5 py-3 mt-2 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs"
                    />
                </div>

                <div className="flex justify-end items-center gap-6">
                    <UpdateButton />
                </div>
            </form>
        </div>
    );
}

