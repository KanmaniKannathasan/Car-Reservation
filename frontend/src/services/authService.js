const API_URL = "http://localhost:5001/api/users";


export const registerUser = async (userData) => {

    const response = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password,
            }),
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            data.message ||
            "Registration failed"
        );

    }


    return data;
};


export const loginUser = async (loginData) => {

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                email: loginData.email,
                password: loginData.password,
            }),
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            data.message ||
            "Login failed"
        );

    }


    return data;
};


export const getAccount = async () => {

    const token =
        localStorage.getItem("token");


    const response = await fetch(
        `${API_URL}/account`,
        {
            method: "GET",

            headers: {
                Authorization: token,
            },
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            data.message ||
            "Failed to get account"
        );

    }


    return data;
};