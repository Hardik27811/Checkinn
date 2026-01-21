import React, { useState } from 'react'
import { assets } from '../assets/assets'
import Title from './Title'
import api from '../services/api'

function NewsLetter() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError(true);
      setMessage("Please enter an email id");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await api.post("newsletter/subscribe", { email });

      setError(false);
      setMessage(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (error) {
      setError(true);
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='bg-gradient-to-b from-emerald-100 to-white mb-10'>
      <br />
      <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-3xl px-6 py-14 md:py-20 mx-3 lg:mx-auto my-28 
      bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 text-white shadow-2xl relative overflow-hidden">

        {/* Soft overlay for luxury feel */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center text-white">
          <Title
            title="Stay Inspired"
            subTitle="Join our newsletter and be the first to explore dreamy destinations, 
          unlock exclusive offers, and find your next travel inspiration."
            subTitleColor='text-white text-2xl'
          />

          {/* Input + Button */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full max-w-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/20 px-4 py-3 rounded-lg text-sm placeholder-white/60 outline-none 
            focus:ring-2 focus:ring-emerald-400 border border-white/20 transition-all"
                placeholder="Enter your email"
              />

              <button className="flex items-center justify-center gap-2 font-medium rounded-lg px-6 py-3 
           bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 
          hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 
          transition-all shadow-lg active:scale-95">
                {loading ? "...." : "Subscribe"}
                <img
                  src={assets.arrowIcon}
                  alt="arrow-icon"
                  className="w-4 invert group-hover:translate-x-1 transition-all"
                />
              </button>
            </form>
            {message && (
              <p
                className={`mt-4 text-sm ${error ? "text-red-400" : "text-green-400"}`}
              >
                {message}
              </p>)}
          </div>



          {/* Disclaimer */}
          <p className="text-emerald-100 mt-6 text-xs max-w-md">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter
