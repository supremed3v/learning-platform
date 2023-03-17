import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components";

const Payments = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Layout criteria={true}>
      <div className="flex container px-20 py-20">
        <h1>Payments</h1>
        <div className="flex container px-20 py-20">
          <p>
            <span className="font-bold">Name:</span> {user.name}
          </p>
          <p className="mt-20 font-bold">
            {!user.stripe_account_id ? (
              <>
                <span className="font-bold">Stripe Account ID:</span>{" "}
                <span>Not Connected</span>
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
