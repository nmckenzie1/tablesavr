import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DataService from "../services/data.service";
import List from "../components/List";
const RestaurantAdmin = () => {
  const [tableLabel, setTableLabel] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [list, setList] = useState([]);
  const [tableID, setTableID] = useState(null);
  const { rid } = useParams();

  const addItem = (tableID, maxGuests, tableLabel) => {
    const newItem = {
      tableID: tableID,
      tableLabel: tableLabel,
      maxGuests: maxGuests,
    };
    setList([...list, newItem]);
    console.log(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await DataService.createTable(maxGuests, tableLabel, rid);
    console.log(results.data.tableID);
    if (results) {
      console.log(results.data.tableID);
      setTableID(results.data.tableID);
      addItem(results.data.tableID, maxGuests, tableLabel);
    }
  };

  const removeItem = async (tableID) => {
    const results = await DataService.deleteTable(tableID);
    if (results) {
      setList(list.filter((item) => item.tableID !== tableID));
    }
  };

  React.useEffect(() => {
    async function getTables() {
      try {
        const response = await DataService.getTables(rid);
        if (response.data) {
          console.log(response.data);
          setList(response.data);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTables();
  }, []);
  return (
    <section className="table-section-center">
      <form className="table-form" onSubmit={handleSubmit}>
        <h2>Add Tables</h2>

        <div className="form-control">
          <label htmlFor="tableLabel">Table Number: </label>
          <input
            type="number"
            name="tableLabel"
            className="form-input"
            placeholder="Table Number"
            min="1"
            value={tableLabel}
            onChange={(e) => setTableLabel(e.target.value)}
            required
          />
          <label htmlFor="maxGuests">Number of Guests:</label>
          <select
            value={maxGuests}
            className="form-input"
            onChange={(e) => setMaxGuests(e.target.value)}
            required
          >
            <option value="">Guest Capacity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Create Table
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="table-container">
          <List items={list} removeItem={removeItem} />
        </div>
      )}
    </section>
  );
};
export default RestaurantAdmin;
