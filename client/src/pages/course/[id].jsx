import React,{useState} from "react";
import Modal from 'react-modal'
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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '21%',
  },
};

function FormFunction({ sellerId, course }) {
  const { user } = useAuth();
  const payBtn = React.useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  console.log("course", course);

  const [tab, setTab] = useState("description");

  const changeTab = (tab) => {
    setTab(tab);
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal (){

  }


  const submitHandler = async () => {
    payBtn.current.disabled = true;

    try {
      const amount = course.amount * 100;
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
          const { data } = await axios.post(
            `http://localhost:3000/api/v1/course/buy/${course._id}`
          )
          if(data.success){
            console.log("Course purchased");
            closeModal();
          }
        }

      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
    }
  };
  // ref={payBtn} onClick={submitHandler} 
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {course.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {course.title}
              </h1>
              <div className="flex mb-4">
                <button className={`flex-grow ${tab === "description" &&  'text-indigo-500 border-b-2 border-indigo-500' } py-2 text-lg px-1 cursor-pointer`}
                onClick={() => changeTab("description")}
                >
                  Description
                </button>
                <button className={`flex-grow border-b-2 ${tab === "review" &&  'text-indigo-500 border-b-2 border-indigo-500'} border-gray-300 py-2 text-lg px-1 cursor-pointer`}
                onClick={() => changeTab("review")}
                >
                  Reviews
                </button>
              </div>
              {
                tab === "description" ? (
                  <p className="leading-relaxed mb-4">
               {course.description}
              </p>
                ) : (
                  <p className="leading-relaxed mb-4">
               {course.instructor.name}
              </p>
                )
              }
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Category</span>
                <span className="ml-auto text-gray-900">Test</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Number on enrolled students</span>
                <span className="ml-auto text-gray-900">{course.view}</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Number of videos</span>
                <span className="ml-auto text-gray-900">{course.numOfVideos}</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${course.amount}
                </span>
                {
                  user && user.role !== "instructor" && 
                  "admin" ? (
                <>
          <button onClick={openModal} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            Pay
          </button>
                </>
                  ): (
                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Login to purchase
                </button>
                  )
                }
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={course.poster.url}
            />
          </div>
        </div>
      </section>
      <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      >
        <div>
          <CardElement />
          <div className="flex px-5 py-5 justify-around">

          <button className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" ref={payBtn} onClick={submitHandler}>Pay</button>
        <button onClick={closeModal} className=" text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" >Close</button>
          </div>
        </div>
      </Modal>
      {/* <FAQ/> */}
    </div>
  );
}

export default function CourseDetails({ data }) {
  return (
    <Layout>
      <div className="py-[120px] px-20">
        <Elements
          stripe={loadStripe(
            "pk_test_51MN6DEJ67mRk3irn38cJvKSRLCJsch8TNbqeCylQXToUPcxUV0pir2QcAiLvwivyhk0Fuc2lXYNyX5bZIdFz3lzU00kCwLthti"
          )}
        >
          <FormFunction
            sellerId={data.course.instructor._id}
            course={data.course}
          />
          {/* <CourseDetails /> */}
        </Elements>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const { data } = await axios.get(
    `http://localhost:3000/api/v1/single-course/${id}`
  );
  return {
    props: {
      data,
    },
  };
}
