import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { useAuth } from "@/context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";

function FormFunction({ sellerId }) {
  const { user } = useAuth();
  const payBtn = React.useRef(null);
  const amount = 1000;
  const stripe = useStripe();
  const elements = useElements();

  const submitHandler = async () => {
    payBtn.current.disabled = true;

    console.log(sellerId);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/stripe/create-payment-intent",
        { amount, sellerId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { client_secret } = data;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
          },
        },
      });
      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment Successful");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
    }
  };
  return (
    <div>
      <CardElement />
      <button ref={payBtn} onClick={submitHandler}>
        Pay
      </button>
    </div>
  );
}

export default function CourseDetails({ data }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(data);

  const sellerId = data.course.instructor;

  return (
    <Layout>
      <div className="py-[120px] px-20">
        <Elements
          stripe={loadStripe(
            "pk_test_51MN6DEJ67mRk3irn38cJvKSRLCJsch8TNbqeCylQXToUPcxUV0pir2QcAiLvwivyhk0Fuc2lXYNyX5bZIdFz3lzU00kCwLthti"
          )}
        >
          <FormFunction sellerId={sellerId} />
        </Elements>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(
    `http://localhost:3000/api/v1/single-course/${id}`
  );
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
};
