import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components";
import Link from "next/link";
import axios from "axios";

const Payments = () => {
  const { user } = useAuth();
  const [stripeData, setStripeData] = useState({});
  const [pendingFields, setPendingFields] = useState([]);

  useEffect(() => {
    const getStripeData = async () => {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/stripe/get-account-status"
      );
      setStripeData(data);
    };
    getStripeData();
  }, []);

  useEffect(() => {
    if (user?.stripe_account_id) {
      const getRequiredFields = async () => {
        const { data } = await axios.get("/api/v1/stripe/get-required-fields");
        if (data) {
          setPendingFields(data.required_fields);
        }
      };
      getRequiredFields();
    }
  }, [stripeData]);
  return (
    <Layout criteria={true}>
      <div className="flex container px-20 py-20">
        <h1>Payments</h1>
        <div className="flex container px-20 py-20">
          <p>
            <span className="font-bold">Name:</span> {user?.name}
          </p>
          <p className="mt-20 font-bold">
            {!user?.stripe_account_id || pendingFields.length !== 0 ? (
              <>
                <Link href="/instructor/stripe">
                  <h1
                    className="
                    bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
                "
                  >
                    {pendingFields.length !== 0 ? (
                      <span>
                        Complete your Stripe registration to start earning
                      </span>
                    ) : (
                      <span>Connect with Stripe</span>
                    )}
                  </h1>
                </Link>
              </>
            ) : (
              <>
                <span className="font-bold">Stripe Account ID:</span> Connected
              </>
            )}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
