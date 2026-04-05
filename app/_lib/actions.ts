"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { newReservationDataType } from "../_components/ReservationForm";


export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}


export async function updateGuest(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const nationalID = (formData.get("nationalID") as string) || ""
    const nationalityWithFlag = (formData.get("nationality") as string) || ""

    const [nationality, countryFlag] = nationalityWithFlag.split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
        throw new Error("Please provide a valid national ID");
    }

    const updateData = { nationality, countryFlag, nationalID }
    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session?.user?.guestId)

    if (error) {
        throw new Error('Guest could not be updated');
    }

    revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId: number) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const userBookings = await getBookings(session?.user?.guestId)
    const userBookingsIds = userBookings.map(booking => booking.id)
    if (!userBookingsIds.includes(bookingId)) {
        throw new Error("You are not authorized to delete this booking");
    }

    const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

    if (error) throw new Error("Booking could not be deleted");

    revalidatePath('/account');
    redirect("/account");
}



export async function updateReservation(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const reservationId = Number(formData.get("reservationId"));

    const userBookings = await getBookings(session.user.guestId)
    const userBookingsIds = userBookings.map(booking => booking.id)
    if (!userBookingsIds.includes(reservationId)) {
        throw new Error("You are not authorized to update this booking");
    }
    //Get and test form data
    const numGuests = Number(formData.get("numGuests"));
    const observations = (formData.get("observations") as string) || ""

    if (!/^[a-zA-Z0-9\s, .áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]{0,800}$/.test(observations)) {
        throw new Error("Please use only letters and numbers in your observations");
    }


    //Update booking in Supabase
    const { data, error } = await supabase
        .from('bookings')
        .update({ numGuests, observations })
        .eq('id', reservationId)
        .select()
        .single()

    if (error) throw new Error('Booking could not be updated');

    revalidatePath(`/account/edit/${reservationId}`);
    redirect("/account");
}



export async function createReservation(newReservationData: newReservationDataType, formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const newBooking = {
        ...newReservationData,
        numGuests: Number(formData.get("numGuests")),
        observations: formData.get("observations"),
    }

    const { error } = await supabase
        .from('bookings')
        .insert([newBooking])

    if (error) { throw new Error('Booking could not be created'); }
    revalidatePath(`/cabins${newBooking.cabinId}`);
    redirect("/account/thankyou");
}