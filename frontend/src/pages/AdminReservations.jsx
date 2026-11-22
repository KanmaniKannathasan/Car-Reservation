import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ReservationForm
    from "../components/ReservationForm";

import ReservationList
    from "../components/ReservationList";

import {
    getReservations,
    createReservation,
    cancelReservation
} from "../services/reservationService";


function AdminReservations({ user }) {

    const navigate = useNavigate();

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
                    `Cancel reservation for ${reservation.customerName}?`
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
                Manage Reservations
            </h1>

            <p>
                View, create and cancel
                customer reservations.
            </p>


            <button
                className="secondary-button"
                onClick={() =>
                    navigate("/admin")
                }
            >
                Back to Dashboard
            </button>


            <br />
            <br />


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

export default AdminReservations;