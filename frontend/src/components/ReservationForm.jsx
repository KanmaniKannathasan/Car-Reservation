import { useState } from "react";

function ReservationForm({
    user,
    onCreateReservation
}) {

    const isAdmin =
        user?.role === "admin";

    const [customerName, setCustomerName] =
        useState(
            isAdmin
                ? ""
                : user?.name || ""
        );

    const [carType, setCarType] =
        useState("SEDAN");

    const [startDate, setStartDate] =
        useState("");

    const [startTime, setStartTime] =
        useState("");

    const [numberOfDays, setNumberOfDays] =
        useState(1);

    const [loading, setLoading] =
        useState(false);


    // Create reservation
    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        const startDateTime =
            `${startDate}T${startTime}:00`;

        const reservationData = {
            customerName:
                isAdmin
                    ? customerName
                    : user.name,

            carType,

            startDateTime,

            numberOfDays:
                Number(numberOfDays)
        };


        const success =
            await onCreateReservation(
                reservationData
            );


        if (success) {

            if (isAdmin) {
                setCustomerName("");
            }

            setCarType("SEDAN");
            setStartDate("");
            setStartTime("");
            setNumberOfDays(1);
        }

        setLoading(false);
    };


    return (
        <div className="card">

            <h2>
                Create Reservation
            </h2>


            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>
                        Customer Name
                    </label>


                    {isAdmin ? (

                        <input
                            type="text"
                            value={customerName}
                            onChange={(event) =>
                                setCustomerName(
                                    event.target.value
                                )
                            }
                            placeholder="Enter customer name"
                            required
                        />

                    ) : (

                        <input
                            type="text"
                            value={user.name}
                            disabled
                        />

                    )}

                </div>


                <div className="form-group">

                    <label>
                        Car Type
                    </label>

                    <select
                        value={carType}
                        onChange={(event) =>
                            setCarType(
                                event.target.value
                            )
                        }
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
                        Start Date
                    </label>

                    <input
                        type="date"
                        value={startDate}
                        onChange={(event) =>
                            setStartDate(
                                event.target.value
                            )
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Start Time
                    </label>

                    <input
                        type="time"
                        value={startTime}
                        onChange={(event) =>
                            setStartTime(
                                event.target.value
                            )
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Number of Days
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={numberOfDays}
                        onChange={(event) =>
                            setNumberOfDays(
                                event.target.value
                            )
                        }
                        required
                    />

                </div>


                <button
                    className="primary-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Creating..."
                        : "Reserve Car"}
                </button>

            </form>

        </div>
    );
}

export default ReservationForm;