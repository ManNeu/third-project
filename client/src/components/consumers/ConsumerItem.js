import React, { useContext } from "react";
import PropTypes from "prop-types";
import ConsumerContext from "../../context/consumer/consumerContext";

const ConsumerItem = ({ consumer }) => {
  const consumerContext = useContext(ConsumerContext);
  const { deleteConsumer, setCurrent, clearCurrent } = consumerContext;

  const {
    _id,
    first_name,
    last_name,
    email,
    phone,
    address,
    symptoms,
    travel_history,
    type,
  } = consumer;

  const onDelete = () => {
    deleteConsumer(_id);
    clearCurrent();
  };

  return (
    <div className="Card bg-light">
      <h3 className="textPrimary textLeft">
        Name: {first_name + " " + last_name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " + (type === "Staff" ? "badge-success" : "badge-light")
          }
        >
          {" "}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {" "}
        {email && (
          <li>
            <i className="fas fa-envelope-open">{" email:"}</i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone">{"Phone: "}</i>
            {phone}
          </li>
        )}
        {address && (
          <li>
            <i className="fas fa-map-marked">{"Address: "}</i>
            {address}
          </li>
        )}
        {symptoms && (
          <li>
            <i className="fas fa-head-side-cough">{"Disease_symptoms: "}</i>
            {symptoms}
          </li>
        )}
        {travel_history && (
          <li>
            <i className="fas fa-plane-departure">{"Travel_history: "}</i>
            {travel_history}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(consumer)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};
ConsumerItem.propTypes = {
  consumer: PropTypes.object.isRequired,
};
export default ConsumerItem;
