import React from "react";
import { Building2, Star, Smartphone, Headphones, BadgeDollarSign } from "lucide-react";

const About = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12 mt-30">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          About <span className="text-gray-900">QuickStay</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Welcome to <span className="font-semibold text-gray-800">QuickStay</span>, 
          your one-stop hotel booking platform designed to make travel simple and affordable. 
          From budget stays to luxury hotels, we bring you a wide range of accommodation 
          options at unbeatable prices.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <Building2 className="text-red-500 w-10 h-10 mb-4" />
          <h3 className="font-semibold text-gray-800 text-lg">1000+ Hotels</h3>
          <p className="text-gray-600 text-sm">Across all major cities to suit every budget.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <Star className="text-yellow-500 w-10 h-10 mb-4" />
          <h3 className="font-semibold text-gray-800 text-lg">Verified Reviews</h3>
          <p className="text-gray-600 text-sm">Genuine ratings and reviews from real guests.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <BadgeDollarSign className="text-green-500 w-10 h-10 mb-4" />
          <h3 className="font-semibold text-gray-800 text-lg">Best Price</h3>
          <p className="text-gray-600 text-sm">Unbeatable offers and exclusive member discounts.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <Headphones className="text-blue-500 w-10 h-10 mb-4" />
          <h3 className="font-semibold text-gray-800 text-lg">24x7 Support</h3>
          <p className="text-gray-600 text-sm">Round-the-clock customer assistance for hassle-free bookings.</p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12 mb-16">
        <button className="bg-gray-900 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow hover:bg-gray-500 transition">
          Start Booking Now
        </button>
      </div>
    </section>
  );
};

export default About;
