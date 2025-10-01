import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowLeft, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import bagasseData from "../assets/BaggageProducts.json";
import paperData from "../assets/PaperProducts.json";
// import plasticFreeData from '../assets/PlasticFreeProducts.json';

interface ProductJSON {
  "Serial No.": number;
  "Product Name": string;
  Category: string;
  "Weight (gms)": string | number;
  "Volume (ml)"?: number | null;
  Length: number;
  Breadth: number;
  Height: number;
  "Inner Pack"?: number;
  "Pack Size"?: number;
  "Price/Pc (INR)": number;
}

interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  description: string;
}

interface ProductGridProps {
  category: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category }) => {
  const navigate = useNavigate();
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Map JSON to Product[] (Price calculation removed)
  const mapJSONToProducts = (data: ProductJSON[]): Product[] => {
    return data.map((item) => ({
      id: item["Serial No."],
      name: item["Product Name"],
      image: "/placeholder.png", // replace with actual images
      rating: 4.5,
      description: `Dimensions: ${item.Length}x${item.Breadth}x${item.Height} mm | Weight: ${item["Weight (gms)"]}${
        item["Volume (ml)"] ? ` | Volume: ${item["Volume (ml)"]} ml` : ""
      }`,
    }));
  };

  const getProductsByCategory = (category: string): Product[] => {
    // Type assertion to resolve TypeScript errors on imported JSON arrays
    const typedPaperData = (paperData as unknown) as ProductJSON[];
    const typedBagasseData = (bagasseData as unknown) as ProductJSON[];

    switch (category) {
      case "Paper":
        return mapJSONToProducts(typedPaperData);
      case "Bagasse":
        return mapJSONToProducts(typedBagasseData);
      // case "Plastic Free":
      //   return mapJSONToProducts(plasticFreeData);
      default:
        return [];
    }
  };

  const products = getProductsByCategory(category);

  // Animate cards on load
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean); // Filter out potential nulls
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [category, products.length]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50"
        />
      );
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-blue-200 hover:text-white mb-6 transition-colors duration-300 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {category} Eco-Friendly Solutions 🌎
          </h1>
          {/* Rectified Bolding */}
          <p className="text-xl text-blue-200 max-w-3xl">
            Explore our sustainable collection of biodegradable and compostable{" "}
            <strong>{category.toLowerCase()}</strong> products.
          </p>
          {/* End Rectified Bolding */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-[1.02] border border-gray-100"
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {product.name}
                </h3>

                <div className="text-sm font-medium text-gray-700 bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="mb-1 text-blue-800">
                    <span className="font-semibold">Features:</span>
                  </p>
                  <p className="text-xs">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex mr-2">{renderStars(product.rating)}</div>
                    <span className="text-sm text-gray-500">
                      ({product.rating} Rating)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    (window.location.href = `https://wa.me/919008392267?text=Hello%2C%20I%20am%20interested%20in%20a%20quote%20for%20the%20${product.name}%20product%20(ID%3A%20${product.id}).`)
                  }
                  className="w-full bg-green-600 text-white px-6 py-3 mt-2 rounded-xl hover:bg-green-700 transition-all duration-300 hover:scale-[1.03] flex items-center justify-center font-semibold shadow-md shadow-green-200"
                >
                  <FaWhatsapp className="h-5 w-5 mr-3" />
                  Get Quote on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-gray-700">No Products Found</h2>
            <p className="text-gray-500 mt-2">Check the category spelling or try another section.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;