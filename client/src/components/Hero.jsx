import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold text-primary">
            Welcome to the
            <br className="hidden lg:inline-block" />
            e-learning platform
          </h1>
          <p className="mb-8 leading-relaxed">
            Where knowledge meets convenience! Our mission is to empower
            learners around the world with accessible and engaging online
            courses. We believe that everyone has the potential to be a hero in
            their own right, and that knowledge is the key to unlocking that
            potential.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              Explore Courses
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            src="/hero.jpg"
            alt="hero"
            width={720}
            height={600}
            className="object-cover object-center rounded"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
