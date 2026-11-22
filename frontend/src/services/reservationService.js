const API_URL = "http://localhost:5001/api/reservations";

const getToken = () => {
    return localStorage.getItem("token");
};

// Get reservations
export const getReservations = async () => {

    const response = await fetch(
        API_URL,
        {
            method: "GET",
            headers: {
                Authorization: getToken()
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to load reservations"
        );
    }

    return data;
};

// Create reservation
export const createReservation = async (reservationData) => {

    const response = await fetch(
        API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: getToken()
            },

            body: JSON.stringify(reservationData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to create reservation"
        );
    }

    return data;
};

// Cancel reservation
export const cancelReservation = async (reservationId) => {

    const response = await fetch(
        `${API_URL}/${reservationId}/cancel`,
        {
            method: "PATCH",

            headers: {
                Authorization: getToken()
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            "Failed to cancel reservation"
        );
    }

    return data;
};