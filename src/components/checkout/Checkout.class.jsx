import React from "react";

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

export default class Checkout extends React.Component {
  state = {
    address: emptyAddress,
    status: STATUS.IDLE,
    saveError: null,
    touched: {},
  };

  //derived state
  //we moved derived state into a method
  isValid = () => {
    const errors = this.getErrors(this.state.address);
    return Object.keys(errors).length === 0;
  };

  handleChange = (e) => {
    e.persist();
    this.setState((state) => {
      //like useState whatever we return becomes the new state but only the properties we specify are updated
      return {
        address: {
          ...state.address,
          [e.target.id]: e.target.value,
        },
      }; //1. Set address to a copy of the current address 2.Use the inputs id to determine which property to set (using computed property syntax)
    });
  };

  handleBlur(event) {
    // TODO
  }

  getErrors(address) {
    const results = {};
    if (!address.city) results.city = "City is required";
    if (!address.country) results.country = "Country is required";
    return results;
  }

  handleSubmit = async (event) => {
    event.preventDefault(); // this will keep the form from posting back
    this.setState({ status: STATUS.SUBMITTING });
    if (this.isValid()) {
      try {
        await saveShippingAddress(this.state.address);
        this.props.dispatch({ type: "empty" });
        this.setState({ status: STATUS.COMPLETED });
      } catch (e) {
        this.setState({ saveError: e });
      }
    } else {
      this.setState({ status: STATUS.SUBMITTED });
    }
  };

  render() {
    const { status, saveError, address } = this.state;
    //derived state
    const errors = this.getErrors(this.state.address);
    if (saveError) throw saveError;
    if (status === STATUS.COMPLETED) {
      return <h1> Thank You For Shopping</h1>;
    }

    return (
      <>
        <h1>Shipping Info</h1>

        {!this.isValid() &&
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

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="city">City</label>
            <br />
            <input
              id="city"
              type="text"
              value={address.city}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <br />
            <select
              id="country"
              value={address.country}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
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
}
