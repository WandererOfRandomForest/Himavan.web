import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CompanyDescription from '../components/CompanyDescription';
import ProductCards from '../components/ProductCards';
import ScrollingQuotes from '../components/ScrollingQuotes';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="HomePage">
      <Navbar />
      <Hero />
      <CompanyDescription />
      <ProductCards />
      <About />
      <ScrollingQuotes />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;