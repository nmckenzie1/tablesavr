import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../context";
import Restaurant from "../components/Restaurant";
import UserService from "../services/data.service";
import { useEffect } from "react";

const RestaurantSearch = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setLoading,
    loading,
    setIsAdmin,
    isAdmin,
  } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const searchValue = React.useRef("");
  React.useEffect(() => {
    setSearchTerm("   ");
    searchValue.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const searchRestaurant = () => {
    setSearchTerm(searchValue.current.value);
  };

  const fetchRestaurants = async () => {
    setLoading(true);
    if (!isLoggedIn) {
      if (localStorage.getItem("userid")) {
        setIsLoggedIn(true);
        setSearchTerm(" ");
      }
    }
    try {
      const response = await UserService.getAllRestaurants(searchTerm);

      if (response.data) {
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
            id: restaurantID,
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
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRestaurants();
  }, [searchTerm]);
  return (
    <React.Fragment>
      <section className="section search">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name"> search for a restaurant</label>
            <input
              type="text"
              id="name"
              ref={searchValue}
              onChange={searchRestaurant}
            />
            {isAdmin && <Link to={`/createrestaurant`}>Create restaurant</Link>}
            <br />
            <Link to={`/myrestaurants`}>My Restaurants</Link>
          </div>
        </form>
      </section>
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
export default RestaurantSearch;
