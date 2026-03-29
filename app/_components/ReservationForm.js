"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservation } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function ReservationForm({ cabin, user }) {
  const { range } = useReservation();


  const numNights = differenceInDays(range?.to, range?.from);
  const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
  const extrasPrice = 0;
  const newReservationData = {
    startDate: range?.from,
    endDate: range?.to,
    numNights,
    cabinPrice,
    extrasPrice,
    totalPrice: cabinPrice + extrasPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    cabinId: cabin.id,
    guestId: user.guestId
  }
  const createReservationWithData = createReservation.bind(null, newReservationData)

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-4 items-center py-3'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form action={createReservationWithData} className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map((x) => (
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
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-xs rounded-xs'
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

function SubmitButton({ range }) {
  const { pending } = useFormStatus();

  return (
    <button disabled={!range?.from || !range?.to || pending} className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer'>
      {pending ? "Reserving..." : "Reserve now"}
    </button>
  )
}

export default ReservationForm;
