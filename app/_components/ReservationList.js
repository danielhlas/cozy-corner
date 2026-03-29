"use client";
import React, { useOptimistic } from 'react'
import ReservationCard from './ReservationCard'
import { deleteReservation } from '../_lib/actions'

function ReservationList({ bookings }) {


    const [optimisticBookings, setOptimisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
        return curBookings.filter(booking => booking.id !== bookingId)
    })

    async function onDelete(bookingId) {
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