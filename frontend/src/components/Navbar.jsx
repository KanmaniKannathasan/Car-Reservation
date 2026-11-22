import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-brand"
                >
                    Car Reservation System
                </Link>

                <div className="nav-links">

                    {user.role === "admin" ? (
                        <Link to="/admin">
                            Admin
                        </Link>
                    ) : (
                        <Link to="/profile">
                            Profile
                        </Link>
                    )}

                    <span className="welcome-text">
                        Welcome, {user.name}
                    </span>

                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;