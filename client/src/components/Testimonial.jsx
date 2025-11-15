import React from 'react'
import Title from './Title'
import StartRating from './StartRating'

function Testimonial() {
  const data = [
    {
      id: 1,
      name: "Rohit Sharma",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      review: "Amazing stay! Rooms were super clean and the staff was extremely polite. Will definitely come again."
    },
    {
      id: 2,
      name: "Priya Kapoor",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      review: "Great location, very close to the city center. The food could have been better, but overall a good experience."
    },
    {
      id: 3,
      name: "Amit Verma",
      photo: "https://randomuser.me/api/portraits/men/12.jpg",
      rating: 5,
      review: "Loved the swimming pool and spa area. Perfect for a weekend getaway."
    },
    {
      id: 4,
      name: "Neha Singh",
      photo: "https://randomuser.me/api/portraits/women/67.jpg",
      rating: 4,
      review: "Rooms were spacious and well maintained. Service was a bit slow during peak hours."
    },
    {
      id: 5,
      name: "Arjun Mehta",
      photo: "https://randomuser.me/api/portraits/men/76.jpg",
      rating: 5,
      review: "Best hotel I’ve stayed in! Amazing breakfast and very friendly staff."
    },
    {
      id: 6,
      name: "Simran Kaur",
      photo: "https://randomuser.me/api/portraits/women/24.jpg",
      rating: 4,
      review: "Good value for money. The view from my balcony was breathtaking!"
    },
    {
      id: 7,
      name: "Karan Malhotra",
      photo: "https://randomuser.me/api/portraits/men/83.jpg",
      rating: 3,
      review: "Stay was okay, but check-in took longer than expected. Needs improvement."
    },
    {
      id: 8,
      name: "Ananya Gupta",
      photo: "https://randomuser.me/api/portraits/women/19.jpg",
      rating: 5,
      review: "Fantastic experience! Perfect for families, kids loved the play area and pool."
    }
  ]

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24  pt-20 pb-32 bg-gradient-to-t from-emerald-100 to-white ">
      <Title 
        title="What Our Guests Say" 
        subTitle="Hear from travelers who made memories with QuickStay. Their stories reflect the comfort, luxury, and care that define our stays." 
      />

      <div className="flex flex-wrap justify-center gap-8 mt-16">
        {data.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="relative bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg w-80 
            border border-white/40 hover:border-emerald-400/60 transition-all duration-300 group"
          >
            {/* Profile */}
            <div className="flex items-center gap-4">
              <img 
                className="w-14 h-14 rounded-full border-2 border-emerald-500/70 shadow-md" 
                src={testimonial.photo} 
                alt={testimonial.name} 
              />
              <div>
                <p className="font-playfair text-lg font-semibold text-gray-900">{testimonial.name}</p>
                <div className="flex items-center gap-1">
                  <StartRating rating={testimonial.rating} />
                </div>
              </div>
            </div>

            {/* Review */}
            <p className="text-gray-700 mt-4 italic leading-relaxed group-hover:text-gray-900 transition-colors">
              “{testimonial.review}”
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial
