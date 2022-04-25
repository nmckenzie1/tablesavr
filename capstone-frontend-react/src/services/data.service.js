import axios from "axios";
const API_URL = "http://localhost:8080/api/";

const token = localStorage.getItem("jwtToken");
axios.defaults.headers.common["Authorization"] = token;
const getAllRestaurants = (searchterm) => {
  return axios.get(API_URL + "restaurant/" + searchterm);
};
const getAllReservations = (currentuserid) => {
  return axios.get(API_URL + "getreservations?userID=" + currentuserid);
};
const getReservation = (id, amount, date, time, uid) => {
  return axios.get(
    API_URL +
      "reservation?id=" +
      id +
      "&amount=" +
      amount +
      "&date=" +
      date +
      "&time=" +
      time +
      ":00:00&uid=" +
      uid
  );
};
const getReservationByID = (reservationID) => {
  return axios.get(
    API_URL + "getreservationbyID?reservationID=" + reservationID
  );
};
const getReservationsByRestaurant = (rid, date, checked) => {
  return axios.get(
    API_URL +
      "getReservationsByRestaurant?restaurantID=" +
      rid +
      "&date=" +
      date +
      "&checked=" +
      checked
  );
};
const getRestaurantByID = (id) => {
  return axios.get(API_URL + "restaurantbyid/" + id);
};
const getRestaurantByName = (name) => {
  return axios.get(API_URL + "restaurant/" + name);
};
const getTables = (rid) => {
  return axios.get(API_URL + "gettables/?rid=" + rid);
};
const createTable = (maxGuests, tableLabel, restaurantID) => {
  return axios.post(
    API_URL +
      "createtable?maxGuests=" +
      maxGuests +
      "&tableLabel=" +
      tableLabel +
      "&restaurantID=" +
      restaurantID
  );
};
const deleteTable = (tableID) => {
  return axios.delete(API_URL + "deletetable?tableID=" + tableID);
};
const deleteReservation = (reservationID) => {
  return axios.delete(API_URL + "deleteres?resID=" + reservationID);
};
const updateRestaurant = (
  rid,
  openTime,
  closeTime,
  description,
  imageURL,
  restaurantName
) => {
  return axios.put(
    API_URL +
      "update?id=" +
      rid +
      "&openTime=" +
      openTime +
      "&closeTime=" +
      closeTime +
      "&description=" +
      description +
      "&imageURL=" +
      imageURL +
      "&restaurantName=" +
      restaurantName
  );
};
const getUserInfo = (currentuserid) => {
  return axios.get(API_URL + "user/" + currentuserid);
};
const getUserRestaurants = (uid) => {
  return axios.get(API_URL + "restaurants/myrestaurants?userID=" + uid);
};
const setUserInfo = (currentuserid, firstName, lastName, username) => {
  return axios.put(
    API_URL +
      "user/edit?id=" +
      currentuserid +
      "&firstName=" +
      firstName +
      "&lastName=" +
      lastName +
      "&username=" +
      username
  );
};
const createRestaurant = (
  openTime,
  closeTime,
  description,
  imageURL,
  restaurantName,
  owner,
  currentuser
) => {
  return axios.get(
    API_URL +
      "restaurant/newrestaurant?openTime=" +
      openTime +
      ":00:00" +
      "&closeTime=" +
      closeTime +
      ":00:00" +
      "&description=" +
      description +
      "&imageURL=" +
      imageURL +
      "&restaurantName=" +
      restaurantName +
      "&owner=" +
      owner +
      "&userID=" +
      currentuser
  );
};
const UserService = {
  getAllRestaurants,
  updateRestaurant,
  getAllReservations,
  getReservation,
  getRestaurantByID,
  setUserInfo,
  createRestaurant,
  createTable,
  getUserRestaurants,
  getReservationByID,
  getRestaurantByName,
  deleteTable,
  getUserInfo,
  getTables,
  deleteReservation,
  getReservationsByRestaurant,
};
export default UserService;
