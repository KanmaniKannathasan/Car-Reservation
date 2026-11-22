import { useState } from "react";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import AdminCars from "./pages/AdminCars";
import AdminReservations from "./pages/AdminReservations";

function App() {

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });


    // Update user after login
    const handleLogin = (loggedInUser) => {

        setUser(loggedInUser);
    };


    // Logout
    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);
    };


    return (
        <>

            {user && (
                <Navbar
                    user={user}
                    onLogout={handleLogout}
                />
            )}


            <Routes>


                // Login

                <Route
                    path="/login"
                    element={
                        user ? (

                            user.role === "admin" ? (

                                <Navigate
                                    to="/admin"
                                    replace
                                />

                            ) : (

                                <Navigate
                                    to="/profile"
                                    replace
                                />

                            )

                        ) : (

                            <Login
                                onLogin={handleLogin}
                            />

                        )
                    }
                />


                // Register

                <Route
                    path="/register"
                    element={
                        user ? (

                            <Navigate
                                to="/"
                                replace
                            />

                        ) : (

                            <Register />

                        )
                    }
                />


                // Admin dashboard

                <Route
                    path="/admin"
                    element={
                        user &&
                        user.role === "admin" ? (

                            <Admin
                                user={user}
                            />

                        ) : (

                            <Navigate
                                to="/login"
                                replace
                            />

                        )
                    }
                />


                // Admin cars

                <Route
                    path="/admin/cars"
                    element={
                        user &&
                        user.role === "admin" ? (

                            <AdminCars />

                        ) : (

                            <Navigate
                                to="/login"
                                replace
                            />

                        )
                    }
                />


                // Admin reservations

                <Route
                    path="/admin/reservations"
                    element={
                        user &&
                        user.role === "admin" ? (

                            <AdminReservations user={user}/>

                        ) : (

                            <Navigate
                                to="/login"
                                replace
                            />

                        )
                    }
                />


                // User profile

                <Route
                    path="/profile"
                    element={
                        user &&
                        user.role === "user" ? (

                            <Profile
                                user={user}
                            />

                        ) : (

                            <Navigate
                                to="/login"
                                replace
                            />

                        )
                    }
                />


                // Home

                <Route
                    path="/"
                    element={
                        user ? (

                            user.role === "admin" ? (

                                <Navigate
                                    to="/admin"
                                    replace
                                />

                            ) : (

                                <Navigate
                                    to="/profile"
                                    replace
                                />

                            )

                        ) : (

                            <Navigate
                                to="/login"
                                replace
                            />

                        )
                    }
                />


                // Unknown route

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />


            </Routes>

        </>
    );
}

export default App;