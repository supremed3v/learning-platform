import { Layout } from "@/components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import {toast} from 'react-toastify'

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
  const { user, loadUser } = useAuth();
  const router = useRouter();


  const createConnectAccount = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/stripe/create-connect-account"
    );
    if (data) {
      setStripeAccount(data);
      loadUser()
    } else {
      setError("Error creating Stripe account");
    }
  };

  const handleOnClick = async () => {
    setLoading(true);
    await createConnectAccount();
    setLoading(false);
  };

    const getRequiredFields = async () => {
      const { data } = await axios.get("/api/v1/stripe/get-required-fields");
      if (data) {
        setRequiredFields(data);
      }
    };
  useEffect(() => {
    getRequiredFields();
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
      toast.success("Account created successfully, redirecting...")
      loadUser()
      setTimeout(() => {
        router.push("/instructor/earnings");
      }, 3000
      )
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

          {requiredFields.length !== 0 && (
            <form onSubmit={submitDetails}>
              <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        
  
    <div className="space-y-12">

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Bank Account Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail. (Your email is:- {user?.email})</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
            <div className="mt-2">
              <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.first_name}
              onChange={(e) =>
                setValues({ ...values, first_name: e.target.value })
              }
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
            <div className="mt-2">
              <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.last_name}
              onChange={(e) =>
                setValues({ ...values, last_name: e.target.value })
              }
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Routing Number</label>
            <div className="mt-2">
              <input type="number" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.routing_number}
              onChange={(e) =>
                setValues({ ...values, routing_number: e.target.value })
              }
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Account Number</label>
            <div className="mt-2">
              <input type="number" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.account_number}
              onChange={(e) =>
                setValues({ ...values, account_number: e.target.value })
              }
              />
            </div>
          </div>

          

          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
            <div className="mt-2">
              <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>United States</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
            <div className="mt-2">
              <input type="text" name="street-address" id="street-address" autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.line1}
              onChange={(e) =>
                setValues({ ...values, line1: e.target.value })
              }
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
            <div className="mt-2">
              <input type="text" name="city" id="city" autoComplete="address-level2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.city}
              onChange={(e) =>
                setValues({ ...values, city: e.target.value })
              }
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
            <div className="mt-2">
              <input type="text" name="region" id="region" autoComplete="address-level1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.state}
              onChange={(e) =>
                setValues({ ...values, state: e.target.value })
              }
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
            <div className="mt-2">
              <input type="text" name="postal-code" id="postal-code" autoComplete="postal-code" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.postal_code}
              onChange={(e) =>
                setValues({ ...values, postal_code: e.target.value })
              }
              />
            </div>
          </div>
          <h2 className="text-base font-semibold leading-7  text-gray-900">DOB</h2>
          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Day</label>
            <div className="mt-2">
              <input type="number" name="city" id="city" autoComplete="address-level2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.day}
              onChange={(e) =>
                setValues({ ...values, day: e.target.value })
              }
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">Month</label>
            <div className="mt-2">
              <input type="number" name="region" id="region" autoComplete="address-level1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.month}
              onChange={(e) =>
                setValues({ ...values, month: e.target.value })
              }
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">Year</label>
            <div className="mt-2">
              <input type="number" name="postal-code" id="postal-code" autoComplete="postal-code" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={values.year}
              onChange={(e) =>
                setValues({ ...values, year: e.target.value })
              }
              />
            </div>
          </div>
        </div>

    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
  

      </div>
    </div>
  </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Stripe;


