import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import DataService from "../services/data.service";
import AuthService from "../services/auth.service";

const ReservationList = () => {
  const [reservations, setReservations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const currentuserid = AuthService.getCurrentUser();

  useEffect(() => {
    async function getReservations() {
      DataService.getAllReservations(currentuserid).then((response) => {
        console.log(response.data);
        setReservations(response.data);
      });
    }
    getReservations();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (reservations.length == 0) {
    return (
      <section className="reservation reservation-small">
        <h2>No reservations found!</h2>
        <Link to={`/restaurant`} className="btb btn-primary btn-details">
          Click Here to make one!
        </Link>
      </section>
    );
  }
  return (
    <section className="section">
      <section className="reservation reservation-small">
        <h2>My Reservations</h2>
        {reservations.map((item) => {
          return (
            <div className="reservation-container" key={item.reservationID}>
              <Link
                className="reservation-item"
                to={`/reservation/${item.reservationID}`}
              >
                {item.restaurantName} | Date:{" "}
                {item.date.split("T")[0].slice(1 - 5)} | for {item.guests}
                {/* | Time:{" "} */}
                {/* {item.time.replace(/(:\d{2}| [AP]M)$/, "")} | Guests:{" "}
                {item.guests} */}
              </Link>
            </div>
          );
        })}
      </section>
    </section>
  );
};
export default ReservationList;
