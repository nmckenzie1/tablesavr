import { React, useState } from "react";
import AuthService from "../services/auth.service";
import DataService from "../services/data.service";
import { useEffect } from "react";
const EditUser = () => {
  const currentuserid = AuthService.getCurrentUser();
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo();
  };
  const setUserInfo = async () => {
    const data = await DataService.setUserInfo(
      currentuserid,
      user.firstName,
      user.lastName,
      user.username
    );
    console.log(data);
  };
  useEffect(() => {
    async function getUserInfo() {
      DataService.getUserInfo(currentuserid).then((response) => {
        console.log(response.data);
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
        });
      });
    }
    getUserInfo();
  }, []);

  return (
    <section className="section">
      <section className="reservation reservation-small">
        <form className="setup-form">
          <h2>Edit User Account</h2>
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
          {/* <div className="form-control">
            <label htmlFor="password">Create password</label>
            <input
              name="password"
              id="password"
              className="form-input"
              //   value={user.password}
              onChange={handleChange}
              type="password"
              required
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="password">Confirm password</label>
            <input
              name="cpassword"
              id="cpassword"
              className="form-input"
              //   value={user.password}
              onChange={handleChange}
              type="password"
              required
            ></input>
          </div> */}

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Edit
          </button>
        </form>
      </section>
    </section>
  );
};

export default EditUser;
