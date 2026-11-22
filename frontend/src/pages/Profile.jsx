import { useEffect, useState } from "react";

import ReservationForm
    from "../components/ReservationForm";

import ReservationList
    from "../components/ReservationList";

import {
    getReservations,
    createReservation,
    cancelReservation
} from "../services/reservationService";


function Profile({ user }) {

    const [reservations, setReservations] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [message, setMessage] =
        useState("");


    // Load reservations when page opens
    useEffect(() => {

        const fetchReservations = async () => {

            try {

                const data =
                    await getReservations();

                setReservations(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        };


        fetchReservations();

    }, []);


    // Reload reservations after create or cancel
    const loadReservations = async () => {

        try {

            const data =
                await getReservations();

            setReservations(data);

        } catch (error) {

            setError(error.message);
        }
    };


    // Create reservation
    const handleCreateReservation =
        async (reservationData) => {

            try {

                setError("");
                setMessage("");

                await createReservation(
                    reservationData
                );

                setMessage(
                    "Reservation created successfully"
                );

                await loadReservations();

                return true;

            } catch (error) {

                setError(error.message);

                return false;
            }
        };


    // Cancel reservation
    const handleCancelReservation =
        async (reservation) => {

            const confirmed =
                window.confirm(
                    "Are you sure you want to cancel this reservation?"
                );

            if (!confirmed) {
                return;
            }


            try {

                setError("");
                setMessage("");

                await cancelReservation(
                    reservation._id
                );

                setMessage(
                    "Reservation cancelled successfully"
                );

                await loadReservations();

            } catch (error) {

                setError(error.message);
            }
        };


    return (

        <div className="app">

            <h1>
                My Profile
            </h1>


            <div className="card">

                <h2>
                    Account Information
                </h2>

                <p>
                    <strong>
                        Name:
                    </strong>{" "}
                    {user.name}
                </p>

                <p>
                    <strong>
                        Email:
                    </strong>{" "}
                    {user.email}
                </p>

                <p>
                    <strong>
                        Role:
                    </strong>{" "}
                    {user.role}
                </p>

            </div>


            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {message && (

                <div className="success-message">
                    {message}
                </div>

            )}


            <ReservationForm
                user={user}
                onCreateReservation={
                    handleCreateReservation
                }
            />


            {loading ? (

                <div className="card">

                    <p>
                        Loading reservations...
                    </p>

                </div>

            ) : (

                <ReservationList
                    reservations={
                        reservations
                    }
                    onCancelReservation={
                        handleCancelReservation
                    }
                />

            )}

        </div>
    );
}


export default Profile;