import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login({ onLogin }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setError("");

            const data = await loginUser(formData);

            console.log("LOGIN RESPONSE:", data);

            // Store JWT token
            localStorage.setItem(
                "token",
                data.token
            );

            // Store logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            console.log(
                "TOKEN:",
                data.token
            );

            console.log(
                "USER:",
                data.user
            );

            // Tell App that login was successful
            if (onLogin) {
                onLogin(data.user);
            }

            // Redirect based on role
            if (data.user.role === "admin") {

                navigate("/admin");

            } else {

                navigate("/profile");
            }

        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            setError(error.message);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Login</h1>

                <p>
                    Sign in to your Car Rental account
                </p>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    <button
                        className="primary-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <p className="auth-link">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;