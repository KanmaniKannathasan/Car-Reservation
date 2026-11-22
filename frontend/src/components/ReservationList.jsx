function ReservationList({
    reservations,
    onCancelReservation
}) {

    if (reservations.length === 0) {

        return (
            <div className="card">

                <h2>Reservations</h2>

                <p>
                    No reservations found.
                </p>

            </div>
        );
    }


    return (
        <div className="card">

            <h2>
                Reservations
            </h2>

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                User Name
                            </th>

                            <th>
                                Customer
                            </th>

                            <th>
                                Car Type
                            </th>

                            <th>
                                Car
                            </th>

                            <th>
                                Start
                            </th>

                            <th>
                                End
                            </th>

                            <th>
                                Days
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {reservations.map(
                            (reservation) => (

                                <tr
                                    key={reservation._id}
                                >

                                    <td>
                                        {
                                            reservation.userId
                                                ?.name || "-"
                                        }
                                    </td>

                                    <td>
                                        {
                                            reservation.customerName
                                        }
                                    </td>

                                    <td>
                                        {
                                            reservation.carType
                                        }
                                    </td>

                                    <td>
                                        {
                                            reservation.carId
                                                ?.registrationNumber
                                            || "-"
                                        }
                                    </td>

                                    <td>
                                        {new Date(
                                            reservation.startDateTime
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {new Date(
                                            reservation.endDateTime
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {
                                            reservation.numberOfDays
                                        }
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                reservation.status ===
                                                "CONFIRMED"
                                                    ? "status confirmed"
                                                    : "status cancelled"
                                            }
                                        >
                                            {
                                                reservation.status
                                            }
                                        </span>

                                    </td>

                                    <td>

                                        {reservation.status ===
                                            "CONFIRMED" && (

                                            <button
                                                className="cancel-button"
                                                onClick={() =>
                                                    onCancelReservation(
                                                        reservation
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ReservationList;