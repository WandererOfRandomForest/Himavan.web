import React from 'react';
import { Leaf, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    'About Us', 'Products', 'Sustainability', 'Contact', 'Blog'
  ];

  const products = [
    'Paper Cutlery', 'Bagasse Products', 'Plastic-Free Items', 'Custom Solutions'
  ];

  const socialIcons = [
    { icon: <Facebook className="h-5 w-5" />, href: 'https://www.facebook.com/share/17RxGR8oLi/' },
    { icon: <Twitter className="h-5 w-5" />, href: '#' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/himavanpackagingsolutions?igsh=bW1sbnJlM3F4Y2wz' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center mb-6">
              <Leaf className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold">HIMAVAN</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Leading the way in sustainable cutlery solutions. 
              Creating a plastic-free future, one product at a time.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-800"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {products.map((product, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest eco-friendly products and sustainability tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-400 transition-colors duration-300"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 Himavan. All rights reserved. Copyright @srn
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Sustainability Report
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;