import React, { useState } from "react";
import DataService from "../services/data.service";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
const CreateRestaurant = () => {
  const currentuser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const [owner, setOwner] = useState("");
  const [restaurant, setRestaurant] = useState({
    openTime: "",
    closeTime: "",
    description: "",
    imageURL: "https://picsum.photos/300/300?grayscale",
    restaurantName: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRestaurant({ ...restaurant, [name]: value });
  };
  const handleRadioChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setOwner(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { openTime, closeTime, description, imageURL, restaurantName } =
      restaurant;
    createsRestaurant(
      openTime,
      closeTime,
      description,
      imageURL,
      restaurantName,
      owner
    );
  };
  const createsRestaurant = async (
    openTime,
    closeTime,
    description,
    imageURL,
    restaurantName,
    owner
  ) => {
    const response = await DataService.createRestaurant(
      openTime,
      closeTime,
      description,
      imageURL,
      restaurantName,
      owner,
      currentuser
    );
    const rid = response.data.restaurantID;
    navigate("/edittables/" + rid);
  };
  return (
    <section className="section">
      <section className="reservation reservation-small">
        <form className="setup-form">
          <h2>Create Restaurant</h2>
          <div className="form-control">
            <label htmlFor="restaurantName">Enter restaurant name.</label>
            <input
              type="text"
              name="restaurantName"
              id="restaurantName"
              value={restaurant.restaurantName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="openTime">Open Time</label>
            <select
              name="openTime"
              id="openTime"
              className="form-input"
              value={restaurant.openTime}
              onChange={handleChange}
              type="text"
              required
            >
              <option value="">Please select a time</option>
              <option value="1">1AM</option>
              <option value="2">2AM</option>
              <option value="3">3AM</option>
              <option value="4">4AM</option>
              <option value="5">5AM</option>
              <option value="6">6AM</option>
              <option value="7">7AM</option>
              <option value="8">8AM</option>
              <option value="9">9AM</option>
              <option value="10">10AM</option>
              <option value="11">11AM</option>
              <option value="12">12PM</option>
              <option value="13">1PM</option>
              <option value="14">2PM</option>
              <option value="15">3PM</option>
              <option value="16">4PM</option>
              <option value="17">5PM</option>
              <option value="18">6PM</option>
              <option value="19">7PM</option>
              <option value="20">8PM</option>
              <option value="21">9PM</option>
              <option value="22">10PM</option>
              <option value="23">11PM</option>
              <option value="24">12PM</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="closeTime">Close Time</label>
            <select
              name="closeTime"
              id="closeTime"
              className="form-input"
              value={restaurant.closeTime}
              onChange={handleChange}
              type="number"
              required
            >
              <option value="">Please select a time</option>
              <option value="1">1AM</option>
              <option value="2">2AM</option>
              <option value="3">3AM</option>
              <option value="4">4AM</option>
              <option value="5">5AM</option>
              <option value="6">6AM</option>
              <option value="7">7AM</option>
              <option value="8">8AM</option>
              <option value="9">9AM</option>
              <option value="10">10AM</option>
              <option value="11">11AM</option>
              <option value="12">12PM</option>
              <option value="13">1PM</option>
              <option value="14">2PM</option>
              <option value="15">3PM</option>
              <option value="16">4PM</option>
              <option value="17">5PM</option>
              <option value="18">6PM</option>
              <option value="19">7PM</option>
              <option value="20">8PM</option>
              <option value="21">9PM</option>
              <option value="22">10PM</option>
              <option value="23">11PM</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="imageURL">Image URL</label>
            <input
              name="imageURL"
              id="imageURL"
              className="form-input"
              value={restaurant.imageURL}
              onChange={handleChange}
              type="text"
              required
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="description">Short Description</label>
            <textarea
              name="description"
              id="description"
              className="form-input"
              value={restaurant.description}
              onChange={handleChange}
              type="password"
              required
              rows="5"
            ></textarea>
            <label>
              <input
                className="radio"
                type="radio"
                value="Yes"
                name="owner"
                onChange={handleRadioChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                className="radio"
                type="radio"
                value="No"
                name="owner"
                onChange={handleRadioChange}
              />{" "}
              No
            </label>
          </div>

          <br></br>

          <br />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Create Restaurant
          </button>
        </form>
      </section>
    </section>
  );
};

export default CreateRestaurant;
