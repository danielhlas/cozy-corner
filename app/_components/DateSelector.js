"use client";

import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { useWindowWidth } from "../hooks/useWindowWidth";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}


function DateSelector({ settings, bookedDates, cabin }) {
  const width = useWindowWidth();

  const { range, setRange, resetRange } = useReservation();
  const clearedRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const regularPrice = cabin.regularPrice;
  const discount = cabin.discount;
  const numNights = differenceInDays(clearedRange?.to, clearedRange?.from);
  const cabinPrice = regularPrice * (numNights - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        onSelect={setRange}
        selected={clearedRange}
        disabled={(curDate) => isPast(curDate) || bookedDates.some((date) => isSameDay(date, curDate))}
        className="py-10 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        numberOfMonths={width > 1024 && width < 1150 ? 1 : 2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-4 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-xl font-bold uppercase">Total</span>{" "}
                <span className="text-xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 hover:bg-accent-600  py-2 px-4 text-sm font-semibold cursor-pointer"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
