import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import DataService from "../services/data.service";
import AuthService from "../services/auth.service";
import { useGlobalContext } from "../context";
import Swal from "sweetalert2";
let today = new Date();
today.getDate();

let dd = today.toLocaleDateString("en-CA");
const RestaurantUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [reservation, setReservation] = useState({
    amount: "",
    time: "",
    date: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReservation({ ...reservation, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReservations();
  };

  const fetchReservations = async (url) => {
    setLoading(true);

    try {
      const uid = AuthService.getCurrentUser();

      const { amount, time, date } = reservation;

      const data = await DataService.getReservation(
        id,
        amount,
        date,
        time,
        uid
      );

      if (data.status === 201) {
        Swal.fire({
          text: data.data,
          icon: "success",
          iconColor: "black",
          toast: true,
          confirmButtonColor: "#062f4f",
        });
        setLoading(false);
        navigate("/myreservations");
      } else if (data.status === 200) {
        Swal.fire({
          text: data.data,
          icon: "warning",
          iconColor: "black",
          toast: true,
          confirmButtonColor: "#062f4f",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setLoading(true);

    async function getRestaurant() {
      try {
        const response = await DataService.getRestaurantByID(id);

        if (response.data) {
          setRestaurant(response.data);
        } else {
          setRestaurant(null);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getRestaurant();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!restaurant) {
    return <h2 className="section-title">no restaurant to display</h2>;
  }

  const { restaurantName, imageURL, openTime, closeTime, description } =
    restaurant;

  let open = openTime.replace(/(:\d{2}| [AP]M)$/, "");
  let close = closeTime.replace(/(:\d{2}| [AP]M)$/, "");
  let intopen = parseInt(openTime);
  let intclose = parseInt(closeTime);
  if (intclose === 0) {
    intclose = 24;
  }
  return (
    <section className="reservation reservation-small">
      <form className="setup-form" onSubmit={handleSubmit}>
        <h2>{restaurantName}</h2>
        {isAdmin && <Link to={`/edittables/${id}`}>Edit restaurant</Link>}

        <div className="form-control">
          <label htmlFor="amount">number of guests</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={reservation.amount}
            onChange={handleChange}
            className="form-input"
            min={1}
            max={12}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="date">date</label>
          <input
            name="date"
            id="date"
            className="form-input"
            value={reservation.date}
            onChange={handleChange}
            type="date"
            min={dd}
            required
          ></input>
        </div>

        <div className="form-control">
          <label htmlFor="time">select time</label>
          <select
            name="time"
            id="time"
            className="form-input"
            value={reservation.time}
            onChange={handleChange}
            type="number"
            min={open}
            required
          >
            <option value="">Please select a time</option>
            {intopen <= 1 && 1 < intclose && <option value="1">1AM</option>}
            {intopen <= 2 && 2 < intclose && <option value="2">2AM</option>}
            {intopen <= 3 && 3 < intclose && <option value="3">3AM</option>}
            {intopen <= 4 && 4 < intclose && <option value="4">4AM</option>}
            {intopen <= 5 && 5 < intclose && <option value="5">5AM</option>}
            {intopen <= 6 && 6 < intclose && <option value="6">6AM</option>}
            {intopen <= 7 && 7 < intclose && <option value="7">7AM</option>}
            {intopen <= 8 && 8 < intclose && <option value="8">8AM</option>}
            {intopen <= 9 && 9 < intclose && <option value="9">9AM</option>}
            {intopen <= 10 && 10 < intclose && <option value="10">10AM</option>}
            {intopen <= 11 && 11 < intclose && <option value="11">11AM</option>}
            {intopen <= 12 && 12 < intclose && <option value="12">12PM</option>}
            {intopen <= 13 && 13 < intclose && <option value="13">1PM</option>}
            {intopen <= 14 && 14 < intclose && <option value="14">2PM</option>}
            {intopen <= 15 && 15 < intclose && <option value="15">3PM</option>}
            {intopen <= 16 && 16 < intclose && <option value="16">4PM</option>}
            {intopen <= 17 && 17 < intclose && <option value="17">5PM</option>}
            {intopen <= 18 && 18 < intclose && <option value="18">6PM</option>}
            {intopen <= 19 && 19 < intclose && <option value="19">7PM</option>}
            {intopen <= 20 && 20 < intclose && <option value="20">8PM</option>}
            {intopen <= 21 && 21 < intclose && <option value="21">9PM</option>}
            {intopen <= 22 && 22 < intclose && <option value="22">10PM</option>}
            {intopen <= 23 && 23 < intclose && <option value="23">11PM</option>}
          </select>
        </div>
        {error && (
          <p className="error">
            can't generate reservation, please try different options
          </p>
        )}
        <button type="submit" className="btn btn-primary">
          reserve
        </button>
      </form>
    </section>
  );
};
export default RestaurantUser;
