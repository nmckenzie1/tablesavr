import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGlobalContext } from "../context";

import AuthService from "../services/auth.service";
import UserService from "../services/data.service";
const Login = () => {
  const { setIsLoggedIn, setIsAdmin, isAdmin } = useGlobalContext();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = user;
    loginUser(user);
  };
  const loginUser = async (user) => {
    try {
      const response = await AuthService.login(user);

      if (response) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        navigate("/");
      } else {
        setIsLoggedIn(true);
        setIsAdmin(false);
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        text: "Invalid Credentials, Please Try Again",
        icon: "warning",
        iconColor: "black",
        toast: true,
        confirmButtonColor: "#062f4f",
      });
    }
  };
  return (
    <section className="section">
      <section className="reservation reservation-small">
        <form className="setup-form">
          <h2>Welcome!</h2>
          <div className="form-control">
            <label htmlFor="username">Enter your E-mail</label>
            <input
              type="email"
              name="username"
              id="username"
              value={user.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">password</label>
            <input
              name="password"
              id="password"
              className="form-input"
              value={user.password}
              onChange={handleChange}
              type="password"
              required
            ></input>
          </div>
          <Link to={`/register`} className="error">
            Not registered yet?
          </Link>
          <br />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            login
          </button>
        </form>
      </section>
    </section>
  );
};
export default Login;
