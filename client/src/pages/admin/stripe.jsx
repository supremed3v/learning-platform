import { Layout } from "@/components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const Stripe = () => {
  const [stripeAccount, setStripeAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requiredFields, setRequiredFields] = useState([]);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    postal_code: "",
    line1: "",
    day: "",
    month: "",
    year: "",
    account_number: "",
    routing_number: "",
  });
  const { user } = useAuth();

  const formFields = [
    {
      label: "Account Number",
      name: "account_number",
      type: "number",
      placeholder: "Account Number",
      id: 1,
    },
    {
      label: "Routing Number",
      name: "routing_number",
      type: "number",
      placeholder: "Routing Number",
      id: 2,
    },
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      placeholder: "First Name",
      required: true,
      id: 3,
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      placeholder: "Last Name",
      required: true,
      id: 4,
    },
    {
      label: "City",
      name: "city",
      type: "text",
      placeholder: "City",
      required: true,
      id: 5,
    },
    {
      label: "State",
      name: "state",
      type: "text",
      placeholder: "State",
      required: true,
      id: 6,
    },
    {
      label: "Postal Code",
      name: "postal_code",
      type: "text",
      placeholder: "Postal Code",
      required: true,
      id: 7,
    },
    {
      label: "Line 1",
      name: "line1",
      type: "text",
      placeholder: "Line 1",
      required: true,
      id: 8,
    },
    {
      label: "Day of Birth",
      name: "day",
      type: "text",
      placeholder: "Day of Birth",
      required: true,
      id: 9,
    },
    {
      label: "Month of Birth",
      name: "month",
      type: "text",
      placeholder: "Month of Birth",
      required: true,
      id: 10,
    },
    {
      label: "Year of Birth",
      name: "year",
      type: "text",
      placeholder: "Year of Birth",
      required: true,
      id: 11,
    },
  ];

  const createConnectAccount = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/stripe/create-connect-account"
    );
    if (data) {
      setStripeAccount(data);
      console.log(data);
    } else {
      setError("Error creating Stripe account");
    }
  };

  const handleOnClick = async () => {
    setLoading(true);
    await createConnectAccount();
    setLoading(false);
  };

  useEffect(() => {
    if (user && user.stripe_account_id) {
      const getRequiredFields = async () => {
        const { data } = await axios.post("/api/v1/stripe/get-required-fields");

        if (data) {
          setRequiredFields(data.required_fields);
          console.log(data);
        }
      };
      getRequiredFields();
    }
  }, []);

  const submitDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post(
      "/api/v1/stripe/create-bank-account",
      values
    );
    if (data && data.success) {
      setLoading(false);
    } else {
      setError(data.message);
      setLoading(false);
    }
  };

  return (
    <Layout criteria={true}>
      <div className="container px-20 py-20">
        <h1>Stripe Registration</h1>
        <div className="container px-20 py-10">
          {user?.stripe_account_id ? (
            <p className="font-bold">
              Stripe Account ID: {user?.stripe_account_id}
            </p>
          ) : (
            <button
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded"
              onClick={handleOnClick}
            >
              Register with Stripe
            </button>
          )}

          {requiredFields.length > 0 && (
            <form onSubmit={submitDetails}>
              {formFields.map((field, id) => (
                <div className="flex flex-col" key={id}>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={(e) =>
                      setValues({ ...values, [field.name]: e.target.value })
                    }
                  />
                </div>
              ))}
              <button className="bg-blue-500 p-2 text-white" type="submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Stripe;
