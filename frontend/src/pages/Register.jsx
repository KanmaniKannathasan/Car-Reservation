import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";


function Register() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });


    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setMessage("");


        try {

            await registerUser(formData);


            setMessage(
                "Registration successful. Redirecting to login..."
            );


            setTimeout(() => {

                navigate("/login");

            }, 1000);


        } catch (error) {

            setError(error.message);

        }

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>Create Account</h1>

                <p>
                    Register for a new account
                </p>


                {error && (

                    <div className="auth-error">
                        {error}
                    </div>

                )}


                {message && (

                    <div className="auth-success">
                        {message}
                    </div>

                )}


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
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
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Register
                    </button>

                </form>


                <p className="auth-link">

                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );
}


export default Register;