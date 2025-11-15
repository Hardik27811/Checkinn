import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'
import Title from './Title'

function ExclusiveOffers() {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30 relative bg-gradient-to-b from-emerald-50 to-white ">

      {/* Section Heading */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full relative z-10">
        <Title 
          align="left" 
          title=" Exclusive Offers" 
          subTitle="Don’t miss out on our limited-time deals and curated packages to make your stay even more unforgettable." 
          className="text-white"
        />
        <button className="group flex items-center gap-2 font-semibold text-white cursor-pointer max-md:mt-12">
          View all Offers 
          <img 
            src={assets.arrowIcon} 
            alt="arrow-icon" 
            className="group-hover:translate-x-1 transition-all invert" 
          />
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 relative z-10">
        {exclusiveOffers.map((item) => (
          <div 
            key={item._id} 
            className="group relative flex flex-col justify-between rounded-2xl overflow-hidden shadow-xl h-96"
            style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            {/* Gradient Overlay (keeps image visible) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Discount Badge */}
            <p className="absolute top-4 left-4 px-3 py-1 text-xs bg-white/90 text-gray-900 font-semibold rounded-full z-20 shadow-md">
              {item.priceOff}% OFF
            </p>

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-between h-full p-16">
              <div>
                <p className="text-3xl font-bold font-playfair">{item.title}</p>
                <p className="mt-10 text-md text-white/80">{item.description}</p>
                <p className="text-xs text-white/60 mt-3">{item.expiryDate}</p>
              </div>

              {/* Button */}
              <button className="mt-4 flex items-center gap-2 font-semibold px-4 py-2 rounded-lg 
                bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 
                hover:from-emerald-600 hover:via-teal-600 hover:to-sky-600 
                transition-all shadow-lg w-max text-white">
                View Offers
                <img 
                  className="invert group-hover:translate-x-1 transition-all" 
                  src={assets.arrowIcon} 
                  alt="arrow-icon" 
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExclusiveOffers
