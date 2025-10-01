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
  // This must be string | number to handle values like "4.0 +/- 0.5" in your data
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
  price: string;
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

  // Map JSON to Product[]
  const mapJSONToProducts = (data: ProductJSON[]): Product[] => {
    return data.map((item) => ({
      id: item["Serial No."],
      name: item["Product Name"],
      price: `₹${item["Price/Pc (INR)"]}`,
      image: "/placeholder.png", // replace with actual images
      rating: 4.5,
      description: `Category: ${item.Category}, Dimensions: ${item.Length}x${
        item.Breadth
      }x${item.Height} mm, Weight: ${item["Weight (gms)"]}${
        item["Volume (ml)"] ? `, Volume: ${item["Volume (ml)"]} ml` : ""
      }`,
    }));
  };

  // --- RECTIFICATION HERE ---
  const getProductsByCategory = (category: string): Product[] => {
    // Use type assertion to tell TypeScript that the imported data 
    // (which is a generic object from a .json file) is an array of ProductJSON.
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
  // --- END RECTIFICATION ---

  const products = getProductsByCategory(category);

  // Animate cards on load
  useEffect(() => {
    const cards = cardsRef.current;
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
  }, []);

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
            className="flex items-center text-blue-200 hover:text-white mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category} Products
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl">
            Discover our premium collection of sustainable{" "}
            {category.toLowerCase()} cutlery solutions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => el && (cardsRef.current[index] = el)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center mb-4">
                  <div className="flex mr-2">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500">
                    ({product.rating})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  <button
                    onClick={() =>
                      (window.location.href =
                        "https://wa.me/919008392267?text=I%20would%20like%20to%20book%20an%20order")
                    }
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center shadow-lg"
                  >
                    <FaWhatsapp className="h-4 w-4 mr-2" />
                    Book Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;