import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductCards: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, rotationX: 20 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const products = [
    {
      title: "Paper",
      description: "Sustainable paper cutlery for eco-conscious dining",
      route: "/paper",
      gradient: "from-green-400 to-green-600",
      image: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      title: "Bagasse",
      description: "Innovative sugarcane bagasse products",
      route: "/bagasse",
      gradient: "from-amber-400 to-orange-600",
      image: "https://images.pexels.com/photos/6995219/pexels-photo-6995219.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      title: "Plastic Free",
      description: "Completely biodegradable alternatives",
      route: "/plastic-free",
      gradient: "from-blue-400 to-blue-600",
      image: "https://images.pexels.com/photos/6995220/pexels-photo-6995220.jpeg?auto=compress&cs=tinysrgb&w=500"
    }
  ];

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Product Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of sustainable cutlery solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              ref={el => el && (cardsRef.current[index] = el)}
              onClick={() => navigate(product.route)}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-12 relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-70 group-hover:opacity-60 transition-opacity duration-300`} />
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                  {product.title}
                </h3>
                <p className="text-white/90 mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center text-white group-hover:text-yellow-300 transition-colors duration-300">
                  <span className="font-semibold mr-2">Explore Collection</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
