import React, { useState } from "react";
import DataService from "../services/data.service";
import AuthService from "../services/auth.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Restaurant from "../components/Restaurant";
const MyRestaurants = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const uid = AuthService.getCurrentUser();
      const response = await DataService.getUserRestaurants(uid);
      if (response.data) {
        if (response.data) {
        }
        console.log(response);
        const newRestaurants = response.data.map((item) => {
          const {
            restaurantID,
            restaurantName,
            openTime,
            closeTime,
            imageURL,
            description,
          } = item;
          return {
            id: "owner" + restaurantID,
            name: restaurantName,
            open: openTime,
            close: closeTime,
            image: imageURL,
            description: description,
          };
        });

        setRestaurants(newRestaurants);
      } else {
        setRestaurants([]);
        return <h2>No Restaurants to display</h2>;
      }
    } catch (error) {
      alert(error);
      navigate("/restaurant");
    }
  };
  return (
    <React.Fragment>
      <section className="section">
        <div className="restaurants-center">
          {restaurants.map((item) => {
            return <Restaurant key={item.id} {...item} />;
          })}
        </div>
      </section>
    </React.Fragment>
  );
};
export default MyRestaurants;
