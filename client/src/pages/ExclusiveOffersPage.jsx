import React from "react";

const offers = [
  {
    title: "Website Exclusive Deal",
    subtitle: "Save 15% on Direct Bookings",
    description: "Best price guaranteed when you book through our website.",
    note: "No third-party charges",
    cta: "Book Now",
    icon: "🏷️",
  },
  {
    title: "Early Bird Offer",
    subtitle: "Plan Ahead & Save More",
    description: "Get up to 20% OFF when you book at least 7 days in advance.",
    note: "Limited availability",
    cta: "Reserve Early",
    icon: "⏰",
  },
  {
    title: "Last-Minute Special",
    subtitle: "Quick Getaway Deal",
    description: "Flat ₹1,000 OFF on bookings made within 48 hours of check-in.",
    note: "Subject to availability",
    cta: "Grab Deal",
    icon: "⚡",
  },
  {
    title: "Complimentary Breakfast",
    subtitle: "Breakfast on Us",
    description: "Enjoy a free breakfast for two with your stay.",
    note: "Selected rooms only",
    cta: "View Rooms",
    icon: "🍳",
  },
  {
    title: "Long Stay Offer",
    subtitle: "Stay Longer, Save More",
    description: "Book 3 nights or more and enjoy exclusive savings.",
    note: "Ideal for families & workcations",
    cta: "Explore Offer",
    icon: "🏡",
  },
  {
    title: "Repeat Guest Benefit",
    subtitle: "Welcome Back Offer",
    description: "Returning guests get an extra 10% OFF on their next stay.",
    note: "Applied at checkout",
    cta: "Unlock Discount",
    icon: "🔁",
  },
];

const ExclusiveOffers = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
          Exclusive Offers
        </h2>
        <p className="mt-3 text-gray-500">
          Book direct & unlock special savings you won’t find anywhere else.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{offer.icon}</div>

              <h3 className="text-lg font-semibold text-gray-900">
                {offer.title}
              </h3>

              <h4 className="text-sm font-medium text-blue-600 mt-1">
                {offer.subtitle}
              </h4>

              <p className="text-sm text-gray-600 mt-3">
                {offer.description}
              </p>

              <p className="text-xs text-gray-400 mt-2">{offer.note}</p>

              <button 
                className="
                mt-3
          px-6 py-3 text-base rounded-lg
          bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500
          hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600
          text-white font-semibold shadow-lg transition-all
            "
              >
                {offer.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffers;
