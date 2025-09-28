import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

// Import JSON data
import paperData from '../assets/PaperProducts.json';
import bagasseData from '../assets/BaggageProducts.json';
import plasticFreeData from '../assets/PlasticFreeProducts.json';

// Define JSON and Product types
interface ProductJSON {
  "Serial No.": number;
  "Product Name": string;
  Dimensions: string;
  "Weight (gms)": number;
  "Ex-works Price (INR/unit)": number;
  "Pcs/Pack": number;
  "Packs/Carton": number;
  "Master Carton Quantity": number;
  "Price/Box (INR)": number;
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

  // Convert JSON data to Product[]
  const mapJSONToProducts = (data: ProductJSON[]): Product[] => {
    return data.map(item => ({
      id: item["Serial No."],
      name: item["Product Name"],
      price: `₹${item["Ex-works Price (INR/unit)"]}`,
      image: '/placeholder.png', // Replace with actual images if available
      rating: 4.5, // Default rating; adjust if you have rating in JSON
      description: `Dimensions: ${item.Dimensions}, Weight: ${item["Weight (gms)"]} g`
    }));
  };

  // Select products by category
  const getProductsByCategory = (category: string): Product[] => {
    switch (category) {
      case "Paper":
        // return mapJSONToProducts(paperData);
      case "Bagasse":
        return mapJSONToProducts(bagasseData);
      case "Plastic Free":
        // return mapJSONToProducts(plasticFreeData);
      default:
        return [];
    }
  };

  const products = getProductsByCategory(category);

  // Animate cards on load
  useEffect(() => {
    const cards = cardsRef.current;
    gsap.fromTo(cards, 
      { opacity: 0, y: 60, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />);
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
            onClick={() => navigate('/')}
            className="flex items-center text-blue-200 hover:text-white mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category} Products
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl">
            Discover our premium collection of sustainable {category.toLowerCase()} cutlery solutions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => el && (cardsRef.current[index] = el)}
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
                  <span className="text-sm text-gray-500">({product.rating})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center shadow-lg">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
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
