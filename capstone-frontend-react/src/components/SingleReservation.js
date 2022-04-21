import { Link, useNavigate } from "react-router-dom";
import DataService from "../services/data.service";
const SingleReservation = ({
  imageURL,
  restaurantName,
  time,
  date,
  guests,
  resid,
}) => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    deleteReservation(resid);
  };
  const deleteReservation = async (resid) => {
    console.log(resid);
    const response = await DataService.deleteReservation(resid);
    navigate("/myreservations");
  };
  return (
    <article>
      <h2>Your Reservation at:</h2>
      <div className="img-container">
        <img src={imageURL} alt={restaurantName} />
      </div>
      <div className="restaurant-footer">
        <h3>{restaurantName}</h3>

        <p>on: {date.split("T")[0].slice(1 - 5)}</p>
        <p>at: {time.replace(/(:\d{2}| [AP]M)$/, "")}</p>
        <p>for {guests} guests.</p>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Delete Reservation
        </button>
      </div>
    </article>
  );
};

export default SingleReservation;
