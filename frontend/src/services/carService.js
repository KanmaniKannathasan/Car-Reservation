const API_URL = "http://localhost:5001/api/cars";

const getToken = () => {
    return localStorage.getItem("token");
};

// Get all cars
export const getCars = async () => {

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
            "Failed to load cars"
        );
    }

    return data;
};

// Add car
export const createCar = async (carData) => {

    const response = await fetch(
        API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: getToken()
            },

            body: JSON.stringify(carData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to create car"
        );
    }

    return data;
};

// Update car
export const updateCar = async (
    carId,
    carData
) => {

    const response = await fetch(
        `${API_URL}/${carId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: getToken()
            },

            body: JSON.stringify(carData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to update car"
        );
    }

    return data;
};

// Delete car
export const deleteCar = async (carId) => {

    const response = await fetch(
        `${API_URL}/${carId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: getToken()
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to delete car"
        );
    }

    return data;
};