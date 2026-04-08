"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservation } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import { CabinType, Guest } from "@/types/supabase";
import z from "zod";
import { DateRange } from "react-day-picker";

export type newReservationDataType = {
  startDate: Date,
  endDate: Date,
  numNights: number,
  cabinPrice: number,
  extrasPrice: number,
  totalPrice: number,
  status: string,
  hasBreakfast: boolean,
  isPaid: boolean,
  cabinId: number,
  guestId: number
}

type ReservationFormProps = {
  cabin: CabinType,
  user: {
    name?: string | null;
    image?: string | null;
    guestId: number;
  }
}

const CabinSchema = z.object({
  id: z.number(),
  description: z.string(),
  discount: z.number(),
  image: z.string(),
  maxCapacity: z.number(),
  name: z.string(),
  regularPrice: z.number(),
});


const UserSchema = z.object({
  guestId: z.number(),
  image: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
});

function ReservationForm({ cabin, user }: ReservationFormProps) {
  console.log("CABIN", cabin)
  //test data from cabin
  const resultCabin = CabinSchema.safeParse(cabin);
  if (!resultCabin.success) {
    return <p>Chyba při načítání dat chaty.</p>;
  }
  const { regularPrice, discount, maxCapacity, id: cabinId } = resultCabin.data;

  //test data from user
  const resultUser = UserSchema.safeParse(user);
  if (!resultUser.success) {
    return <p>Chyba při načítání dat uživatele.</p>;
  }
  const { guestId, image, name } = resultUser.data;

  const { range } = useReservation();

  const numNights = range?.from && range?.to ? differenceInDays(range?.to, range?.from) : 0;
  const cabinPrice = numNights * (regularPrice - discount);
  const extrasPrice = 0;

  const newReservationData: newReservationDataType = {
    startDate: range?.from as Date,
    endDate: range?.to as Date,
    numNights,
    cabinPrice,
    extrasPrice,
    totalPrice: cabinPrice + extrasPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    cabinId,
    guestId: guestId
  }
  const createReservationWithData = createReservation.bind(null, newReservationData)

  return (
    <div className='bg-primary-900'>
      <div className='bg-primary-800 text-primary-300 px-4 sm:px-16 flex justify-between items-center'>
        <p className="pt-4 pb-3">Logged in as</p>

        <div className='flex gap-3 items-center pt-4 pb-3'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={image ?? undefined}
            alt={name ?? ""}
          />
          <p>{name || ""}</p>
        </div>
      </div>

      <form action={createReservationWithData} className='bg-primary-900 py-10 px-2 sm:px-7 md:px-16 text-mdsm:text-lg flex gap-5 flex-col'>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 mt-1.5 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='mt-1.5 px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          <SubmitButton range={range} />
        </div>
      </form>
    </div>
  );
}



function SubmitButton({ range }: { range: DateRange | undefined }) {
  const { pending } = useFormStatus();

  return (
    <button disabled={!range?.from || !range?.to || pending} className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer'>
      {pending ? "Reserving..." : "Reserve now"}
    </button>
  )
}

export default ReservationForm;
