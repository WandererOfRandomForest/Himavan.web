import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import logo from "../assets/himavan_logo.png"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* <Leaf className={`h-8 w-8 mr-2 ${isScrolled ? 'text-blue-600' : 'text-white'}`} /> */}
            <img src={logo} alt="logo" className='h-12 w-12 mr-2' />
            <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              HIMAVAN
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`hover:scale-105 transition-all px-3 py-2 rounded-md text-sm font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`hover:scale-105 transition-all px-3 py-2 rounded-md text-sm font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className={`hover:scale-105 transition-all px-3 py-2 rounded-md text-sm font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`hover:scale-105 transition-all px-3 py-2 rounded-md text-sm font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('home')}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;