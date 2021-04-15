import React, { useState } from "react";
import { saveShippingAddress } from "../../services/shippingService";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
}; //using this Status enumerator because the only one of the status can true at a time, others should be false

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout({ cart, emptyCart }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [address, setAddress] = useState(emptyAddress);
  const [saveError, setSaveError] = useState(null);

  //derived state
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    e.persist();
    setAddress((curAddress) => {
      return { ...curAddress, [e.target.id]: e.target.value }; //1. Set address to a copy of the current address 2.Use the inputs id to determine which property to set (using computed property syntax)
    });
  }

  function handleBlur(event) {
    // TODO
  }

  function getErrors(address) {
    const results = {};
    if (!address.city) results.city = "City is required";
    if (!address.country) results.country = "Country is required";
    return results;
  }

  async function handleSubmit(event) {
    event.preventDefault(); // this will keep the form from posting back
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
        emptyCart();
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <h1> Thank You For Shopping</h1>;
  }

  return (
    <>
      <h1>Shipping Info</h1>

      {!isValid &&
        status === STATUS.SUBMITTED && ( //this says that if the form is invalid and submitted then show the errors above the form
          <div role="alert">
            <p>Please Fix the following errors</p>
            <ul>
              {Object.keys(errors).map((key) => {
                return <li key={key}>{errors[key]}</li>;
              })}
            </ul>
          </div>
        )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="Pakistan">Pakistan</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
