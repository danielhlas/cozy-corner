"use client";
import { format } from 'date-fns';
import { useReservation } from './ReservationContext';

function ReservationReminder() {

  const { range, resetRange } = useReservation();

  if (!range?.from || !range?.to) return null;

  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center'>
      <p>
        <span>👋</span> Don't forget to reserve your dates <br /> from{' '}
        {format(new Date(range.from), 'MMM dd yyyy')} to{' '}
        {format(new Date(range.to), 'MMM dd yyyy')}
      </p>
      <button onClick={resetRange} className='rounded-full px-5 py-3 cursor-pointer bg-accent-400 hover:bg-accent-300 transition-all'>
        Clear selected dates
      </button>
    </div>
  );
}

export default ReservationReminder;
