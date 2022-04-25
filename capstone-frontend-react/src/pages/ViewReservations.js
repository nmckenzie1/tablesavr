import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import DataService from "../services/data.service";

import { useGlobalContext } from "../context";
import { useState } from "react";

const ViewReservations = () => {
  const { rid } = useParams();
  const { loading, SetLoading } = useGlobalContext();
  const [reservations, setReservations] = useState([]);
  const [request, setRequest] = useState({ date: "" });
  const [checked, setChecked] = useState(true);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRequest({ ...request, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    getReservationsByRestaurant();
  };
  const getReservationsByRestaurant = async () => {
    const response = await DataService.getReservationsByRestaurant(
      rid,
      request.date,
      checked
    );

    setReservations(response.data);
  };

  //   if (loading) {
  //     return <Loading />;
  //   }

  return (
    <React.Fragment>
      <section className="reservation reservation-small">
        <form className="setup-form">
          <div className="form-control">
            <label htmlFor="date"> Select Date To View Reservations</label>
            <input
              name="date"
              id="date"
              className="form-input"
              value={request.date}
              onChange={handleChange}
              type="date"
              required
            ></input>
            Print Reservations?
            <input
              name="checked"
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(!checked)}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            View Reservations
          </button>
        </form>
      </section>

      <section className="reservation reservation-small">
        <h2>My Reservations</h2>
        {reservations.map((item) => {
          return (
            <div className="reservation-container" key={item.reservationID}>
              <Link
                className="reservation-item"
                to={`/reservation/${item.reservationID}`}
              >
                {item.lastName} | Time:{" "}
                {item.time.replace(/(:\d{2}| [AP]M)$/, "")} | Guests:{" "}
                {item.guests}
              </Link>
            </div>
          );
        })}
      </section>
    </React.Fragment>
  );
};
export default ViewReservations;
