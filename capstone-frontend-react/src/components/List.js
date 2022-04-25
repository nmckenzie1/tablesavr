import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const List = ({ items, removeItem }) => {
  return (
    <div className="table-list">
      {items.map((item) => {
        const { tableID, tableLabel, maxGuests } = item;
        return (
          <article className="table-item" key={tableID}>
            <p className="title">
              {tableLabel} | Capacity: {maxGuests}
            </p>
            <div className="btn-container">
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(tableID)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
