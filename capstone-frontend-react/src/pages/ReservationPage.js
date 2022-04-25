import SingleReservation from "../components/SingleReservation";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DataService from "../services/data.service";
import Loading from "../components/Loading";

const ReservationPage = () => {
  const { resid } = useParams();

  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState({
    date: "",
    time: "",
    guests: "",
    reservationID: "",
  });
  const [restaurant, setRestaurant] = useState({
    restaurantName: "",
    imageURL: "",
  });

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const reservationData = await DataService.getReservationByID(resid);

      const restaurantData = await DataService.getRestaurantByName(
        reservationData.data.restaurantName
      );
      const { date, time, guests, reservationID } = reservationData.data;
      const { restaurantName, imageURL } = restaurantData.data[0];
      setReservation({
        date: date,
        time: time,
        guests: guests,
        reservationID: reservationID,
      });
      setRestaurant({ restaurantName: restaurantName, imageURL: imageURL });
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="reservation reservation-small">
      <SingleReservation
        restaurantName={restaurant.restaurantName}
        date={reservation.date}
        time={reservation.time}
        guests={reservation.guests}
        imageURL={restaurant.imageURL}
        resid={reservation.reservationID}
      />
    </section>
  );
};
export default ReservationPage;
