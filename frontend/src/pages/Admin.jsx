import { useNavigate } from "react-router-dom";

function Admin({ user }) {

    const navigate = useNavigate();

    return (
        <div className="dashboard-container">

            <div className="dashboard-header">

                <h1>Admin Dashboard</h1>

                <p>
                    Welcome, {user.name}
                </p>

            </div>

            <div className="dashboard-grid">

                <div className="dashboard-card">

                    <h2>Reservations</h2>

                    <p>
                        View, create and cancel
                        customer reservations.
                    </p>

                    <button
                        className="primary-button"
                        onClick={() =>
                            navigate(
                                "/admin/reservations"
                            )
                        }
                    >
                        Manage Reservations
                    </button>

                </div>

                <div className="dashboard-card">

                    <h2>Cars</h2>

                    <p>
                        Add, update and delete cars
                        from the rental inventory.
                    </p>

                    <button
                        className="primary-button"
                        onClick={() =>
                            navigate("/admin/cars")
                        }
                    >
                        Manage Cars
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Admin;