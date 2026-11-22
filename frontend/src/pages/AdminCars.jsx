import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCars,
    createCar,
    updateCar,
    deleteCar
} from "../services/carService";

function AdminCars() {

    const navigate = useNavigate();

    const [cars, setCars] = useState([]);

    const [formData, setFormData] = useState({
        registrationNumber: "",
        type: "SEDAN",
        active: true
    });

    const [editingCar, setEditingCar] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    // Load cars
    useEffect(() => {

        const fetchCars = async () => {

            try {

                const data = await getCars();

                setCars(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        };


        fetchCars();

    }, []);


    // Load cars again after create, update or delete
    const loadCars = async () => {

        try {

            const data = await getCars();

            setCars(data);

        } catch (error) {

            setError(error.message);
        }
    };


    // Handle input changes
    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData({
            ...formData,

            [name]:
                name === "active"
                    ? value === "true"
                    : value
        });
    };


    // Add or update car
    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setError("");
            setMessage("");


            if (editingCar) {

                await updateCar(
                    editingCar._id,
                    formData
                );

                setMessage(
                    "Car updated successfully"
                );

            } else {

                await createCar(
                    formData
                );

                setMessage(
                    "Car added successfully"
                );
            }


            setFormData({
                registrationNumber: "",
                type: "SEDAN",
                active: true
            });


            setEditingCar(null);


            await loadCars();


        } catch (error) {

            setError(error.message);
        }
    };


    // Edit car
    const handleEdit = (car) => {

        setEditingCar(car);


        setFormData({
            registrationNumber:
                car.registrationNumber,

            type:
                car.type,

            active:
                car.active
        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // Cancel edit
    const handleCancelEdit = () => {

        setEditingCar(null);


        setFormData({
            registrationNumber: "",
            type: "SEDAN",
            active: true
        });
    };


    // Delete car
    const handleDelete = async (carId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this car?"
        );


        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setMessage("");


            await deleteCar(carId);


            setMessage(
                "Car deleted successfully"
            );


            await loadCars();


        } catch (error) {

            setError(error.message);
        }
    };


    return (

        <div className="app">

            <h1>
                Manage Cars
            </h1>

            <p>
                Add, update and delete cars
                from the reservation system.
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


            <div className="card">

                <h2>
                    {editingCar
                        ? "Edit Car"
                        : "Add Car"}
                </h2>


                <form onSubmit={handleSubmit}>


                    <div className="form-group">

                        <label>
                            Registration Number
                        </label>

                        <input
                            type="text"
                            name="registrationNumber"
                            value={
                                formData.registrationNumber
                            }
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Car Type
                        </label>

                        <select
                            name="type"
                            value={
                                formData.type
                            }
                            onChange={handleChange}
                        >

                            <option value="SEDAN">
                                Sedan
                            </option>

                            <option value="SUV">
                                SUV
                            </option>

                            <option value="VAN">
                                Van
                            </option>

                        </select>

                    </div>


                    <div className="form-group">

                        <label>
                            Status
                        </label>

                        <select
                            name="active"
                            value={
                                String(
                                    formData.active
                                )
                            }
                            onChange={handleChange}
                        >

                            <option value="true">
                                Active
                            </option>

                            <option value="false">
                                Inactive
                            </option>

                        </select>

                    </div>


                    <button
                        className="primary-button"
                        type="submit"
                    >
                        {editingCar
                            ? "Update Car"
                            : "Add Car"}
                    </button>


                    {editingCar && (

                        <button
                            className="secondary-button"
                            type="button"
                            onClick={
                                handleCancelEdit
                            }
                        >
                            Cancel Edit
                        </button>

                    )}

                </form>

            </div>


            <div className="card">

                <h2>
                    Cars
                </h2>


                {loading ? (

                    <p>
                        Loading cars...
                    </p>

                ) : cars.length === 0 ? (

                    <p>
                        No cars found.
                    </p>

                ) : (

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Registration
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {cars.map((car) => (

                                    <tr key={car._id}>

                                        <td>
                                            {
                                                car.registrationNumber
                                            }
                                        </td>

                                        <td>
                                            {
                                                car.type
                                            }
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    car.active
                                                        ? "status confirmed"
                                                        : "status cancelled"
                                                }
                                            >
                                                {car.active
                                                    ? "ACTIVE"
                                                    : "INACTIVE"}
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="primary-button"
                                                onClick={() =>
                                                    handleEdit(car)
                                                }
                                            >
                                                Edit
                                            </button>

                                            {" "}

                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        car._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminCars;