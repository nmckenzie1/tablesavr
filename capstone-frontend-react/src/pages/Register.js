import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, firstName, lastName, password, confirmPassword } = user;

    createNewUser(user);
  };
  const createNewUser = async (user) => {
    try {
      axios
        .post(`http://localhost:8080/api/user/register`, user)
        .catch(function (error) {
          if (error.response.data.username) {
            Swal.fire({
              text: error.response.data.username,
              icon: "warning",
              iconColor: "black",
              toast: true,
              confirmButtonColor: "#062f4f",
            });
          } else if (error.response.data.password) {
            Swal.fire({
              text: error.response.data.password,
              icon: "warning",
              iconColor: "black",
              toast: true,
              confirmButtonColor: "#062f4f",
            });
          } else {
            Swal.fire({
              text: error.response.data.confirmPassword,
              icon: "warning",
              iconColor: "black",
              toast: true,
              confirmButtonColor: "#062f4f",
            });
          }

          return;
        })
        .then((res) => {
          Swal.fire({
            text: "Registration Successful, please log in!",
            icon: "success",
            iconColor: "black",
            toast: true,
            confirmButtonColor: "#062f4f",
          });
          navigate("/login");
        });
    } catch (error) {}
  };
  return (
    <section className="section">
      <section className="reservation reservation-small">
        <form className="setup-form">
          <h2>Register Account</h2>
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
              pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
            />
          </div>
          <div className="form-control">
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              id="firstName"
              className="form-input"
              value={user.firstName}
              onChange={handleChange}
              type="text"
              required
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Last Name</label>
            <input
              name="lastName"
              id="lastName"
              className="form-input"
              value={user.lastName}
              onChange={handleChange}
              type="text"
              required
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="password">Create password</label>
            <input
              name="password"
              id="password"
              className="form-input"
              value={user.password}
              onChange={handleChange}
              type="password"
              required
              pattern="^\S{6,}$"
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              className="form-input"
              value={user.confirmPassword}
              onChange={handleChange}
              type="password"
              required
              pattern="^\S{6,}$"
            ></input>
          </div>
          <Link to={`/login`} className="error">
            Already Registered?
          </Link>
          <br />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Register
          </button>
        </form>
      </section>
    </section>
  );
};

export default Register;
