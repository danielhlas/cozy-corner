import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation';
import Link from 'next/link';
import Image from 'next/image';
import { userBookings } from './ReservationList';

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

type ReservationCardProps = {
  booking: userBookings,
  onDelete: (bookingId: number) => void
}



function ReservationCard({ booking, onDelete }: ReservationCardProps) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins: { name, image },

  } = booking;
  //Converting string dates to Date type
  if (!startDate || !endDate) throw new Error("Invalid startDate or endDate")
  if (!numGuests) throw new Error("Invalid numGuests")
  const startDateConverted = parseISO(startDate);
  const endDateConverted = parseISO(endDate);

  return (
    <div className='flex md:flex-row flex-col border border-primary-800'>
      <div className='flex flex-col'>

        <div className='relative h-32 aspect-square'>
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className='object-cover border-r border-primary-800'
          />
        </div>

        {isPast(new Date(startDateConverted)) ? (
          <span className='lg:hidden bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-xs text'>
            past
          </span>
        ) : (
          <span className='lg:hidden bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-xs'>
            upcoming
          </span>
        )}

      </div>
      <div className='grow px-6 py-3 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>
            {numNights} nights in Cabin {name}
          </h3>

          {isPast(new Date(startDateConverted)) ? (
            <span className='hidden lg:flex  bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold items-center rounded-xs'>
              past
            </span>
          ) : (
            <span className='hidden lg:flex  bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold items-center rounded-xs'>
              upcoming
            </span>
          )}
        </div>

        <p className='text-lg text-primary-300'>
          {format(new Date(startDateConverted), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDateConverted))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDateConverted), 'EEE, MMM dd yyyy')}
        </p>

        <div className='flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:mt-auto'>
          <p className='text-xl font-semibold text-accent-400'>${totalPrice}</p>

          <div>
            <span className='text-primary-300'>&bull;</span>
            <span className='text-lg text-primary-300 ps-2'>
              {numGuests} guest{numGuests > 1 && 's'}
            </span>
          </div>

          <p className='lg:ml-auto text-sm text-primary-400'>
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>

        </div>
      </div>


      {/* Edit and delete buttons */}
      <div className='flex md:flex-col flex-row border-l border-primary-800 w-full md:w-[100px] '>
        {!isPast(new Date(startDate)) ?
          <>
            <Link
              href={`/account/edit/${id}`}
              className='group flex items-center justify-center md:justify-start gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 border-1 md:border-b-0 py-2'
            >
              <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
              <span className='mt-1'>Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>

          : <div className='flex items-center justify-center h-full'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-primary-600 group-hover:text-primary-800">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
          </div>

        }
      </div>
    </div >
  );
}

export default ReservationCard;
