import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import RestaurantSearch from "./pages/RestaurantSearch";
import { useEffect } from "react";
import RestaurantUser from "./pages/RestaurantUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRestaurant from "./pages/CreateRestaurant";
import ReservationList from "./pages/ReservationList";
import ReservationPage from "./pages/ReservationPage";
import EditUser from "./pages/EditUser";
import { useGlobalContext } from "./context";
import RestaurantAdmin from "./pages/RestaurantAdmin";
import MyRestaurants from "./pages/MyRestaurants";
import ViewReservations from "./pages/ViewReservations";
function App() {
  const { isLoggedIn, setIsLoggedIn, setIsAdmin, isAdmin } = useGlobalContext();
  useEffect(() => {
    setIsAdmin(false);
    setIsLoggedIn(false);
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
    const admincheck = localStorage.getItem("isAdmin");
    console.log(admincheck);
    if (admincheck === "true") {
      console.log("boob");
      setIsAdmin(true);

      console.log(isAdmin);
    } else {
      setIsAdmin(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {isLoggedIn ? (
          <Route path="restaurant" element={<RestaurantSearch />} />
        ) : (
          <Route path="restaurant" element={<Login />} />
        )}
        {isLoggedIn ? (
          <Route path="restaurant/:id" element={<RestaurantUser />} />
        ) : (
          <Route path="restaurant/:id" element={<Login />} />
        )}
        {isLoggedIn && isAdmin ? (
          <Route path="createrestaurant" element={<CreateRestaurant />} />
        ) : (
          <Route path="createrestaurant" element={<Login />} />
        )}
        {isLoggedIn ? (
          <Route path="myreservations" element={<ReservationList />} />
        ) : (
          <Route path="myreservations" element={<Login />} />
        )}
        {isLoggedIn ? (
          <Route path="edituser" element={<EditUser />} />
        ) : (
          <Route path="edituser" element={<Login />} />
        )}
        {isLoggedIn && isAdmin ? (
          <Route path="edittables/:rid" element={<RestaurantAdmin />} />
        ) : (
          <Route path="edittables/:rid" element={<Login />} />
        )}
        {isLoggedIn ? (
          <Route path="/reservation/:resid" element={<ReservationPage />} />
        ) : (
          <Route path="/reservation/:resid" element={<Login />} />
        )}
        {isLoggedIn ? (
          <Route path="/myrestaurants" element={<MyRestaurants />} />
        ) : (
          <Route path="/myrestaurants" element={<Login />} />
        )}
        {isLoggedIn ? (
          <Route path="/restaurant/owner:rid" element={<ViewReservations />} />
        ) : (
          <Route path="/restaurant/owner:rid" element={<ViewReservations />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
