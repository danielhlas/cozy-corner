"use client";
import React, { useOptimistic } from 'react'
import ReservationCard from './ReservationCard'
import { deleteReservation } from '../_lib/actions'

export type userBookings = {
    id: number,
    created_at: string,
    startDate: string,
    endDate: string,
    numNights: number,
    numGuests: number,
    totalPrice: number,
    guestId: number,
    cabinId: number,
    cabins: { name: string, image: string }
}

function ReservationList({ bookings }: { bookings: userBookings[] }) {

    const [optimisticBookings, setOptimisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
        return curBookings.filter(booking => booking.id !== bookingId)
    })

    async function onDelete(bookingId: number) {
        setOptimisticDelete(bookingId);
        await deleteReservation(bookingId)
    }


    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard booking={booking} key={booking.id} onDelete={onDelete} />
            ))}
        </ul>
    )
}

export default ReservationList