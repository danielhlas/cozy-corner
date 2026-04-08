"use client";

import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { SettingsType, CabinType } from "@/types/supabase";
import { SafeCabinType } from "../cabins/[cabinId]/page";
import { DateRange } from "react-day-picker";


function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! })
    )
  );
}

type DateSelectorProps = {
  settings: SettingsType,
  bookedDates: Date[],
  cabin: SafeCabinType,
}

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const width = useWindowWidth();

  const { range, setRange, resetRange } = useReservation();
  const clearedRange = isAlreadyBooked(range, bookedDates) ? undefined : range;
  const regularPrice = cabin.regularPrice
  const discount = cabin.discount;
  const numNights = clearedRange?.to && clearedRange?.from ? differenceInDays(clearedRange?.to, clearedRange?.from) : 0;
  const totalPrice = (regularPrice - discount) * numNights

  const { minBookingLength, maxBookingLength } = settings;
  if (minBookingLength === null || maxBookingLength === null) {
    throw new Error("Settings not loaded");
  }

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
        numberOfMonths={width < 700 || (width > 1024 && width < 1150) ? 1 : 2}
      />

      <div className="flex items-center justify-between px-4 sm:px-8 bg-accent-500 text-primary-800 h-[72px]">

        <div className="flex items-baseline gap-3 md:gap-5">
          {/* price per night */}
          <div>
            {discount > 0 ? (
              <div className="">
                <span className="text-step-2">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700 ps-1">
                  ${regularPrice}
                </span>
              </div>
            ) : (
              <span className="text-step-2">${regularPrice}</span>
            )}
            <span>/night</span>
          </div>

          {numNights ? (
            <>
              {/* num of nights */}
              <div className="bg-accent-600 px-1 text-2xl flex ">
                <span>&times;</span>
                <span className="mt-1">{numNights}</span>
              </div>

              {/* total price */}
              <div className="pe-3">
                <span className="text-step-0 font-bold uppercase">Total</span>{" "}
                <span className="text-step-1 font-semibold">${totalPrice}</span>
              </div>
            </>
          ) : null}
        </div>

        {/* clear button */}
        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 hover:bg-accent-600 py-2 px-4 text-sm font-semibold cursor-pointer"
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
