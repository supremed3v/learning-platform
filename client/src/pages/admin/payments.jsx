import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components";
import Link from "next/link";
import axios from "axios";

const Payments = () => {
  const { user } = useAuth();
  const [stripeData, setStripeData] = useState({});

  useEffect(() => {
    const getStripeData = async () => {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/stripe/get-account-status"
      );
      setStripeData(data);
    };
    getStripeData();
  }, []);

  console.log(stripeData);

  return (
    <Layout criteria={true}>
      <div className="flex container px-20 py-20">
        <h1>Payments</h1>
        <div className="flex container px-20 py-20">
          <p>
            <span className="font-bold">Name:</span> {user?.name}
          </p>
          <p className="mt-20 font-bold">
            {!user?.stripe_account_id ? (
              <>
                <Link href="/admin/stripe">
                  <h1
                    className="
                    bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
                "
                  >
                    Connect with Stripe
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
