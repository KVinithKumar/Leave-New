import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTimes
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showMap, setShowMap] = useState(false);

  const vijayawadaCoords = { lat: 16.5062, lng: 80.6480 };

  const companyInfo = {
    name: "EduConnect",
    description: "Transforming education through innovative technology solutions that connect students, teachers, and parents.",
    address: "123 MG Road, Vijayawada, Andhra Pradesh 520001",
    phone: "+91 98765 43210",
    email: "info@educonnect.com",
    socialMedia: [
      { icon: <FaFacebookF />, url: "https://kodebloom.com/#", color: "bg-[#3b5998] hover:bg-[#2d4373]" },
      { icon: <FaTwitter />, url: "https://kodebloom.com/#", color: "bg-[#1DA1F2] hover:bg-[#1991db]" },
      { icon: <FaInstagram />, url: "https://kodebloom.com/#", color: "bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] hover:from-[#e07e27] hover:via-[#d8552a] hover:to-[#cc2366]" },
      { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/company/kodebloom-technology/", color: "bg-[#0077B5] hover:bg-[#00669c]" }
    ],
    mapLocation: vijayawadaCoords
  };

  const resources = [
    { name: "Documentation", url: "#" },
    { name: "Reference", url: "#" },
    { name: "Community Forum", url: "#" },
    { name: "Tutorial Videos", url: "#" },
    { name: "Help Center", url: "/contact" }
  ];

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "Services", url: "#" },
    { name: "Pricing", url: "#" },
    { name: "Contact", url: "/contact" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Cookie Policy", url: "#" }
  ];

  const toggleMap = () => setShowMap(!showMap);

  return (
    <>
      {/* Newsletter Section */}
      <section className="py-12 text-white bg-blue-900">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">Stay Updated with Our Newsletter</h2>
              <p className="text-blue-200">Subscribe to receive the latest news, updates, and exclusive offers directly to your inbox.</p>
            </div>
            <div className="flex flex-col w-full gap-3 sm:flex-row md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              />
              <button className="flex items-center justify-center gap-2 px-6 py-3 font-medium text-white transition-all bg-blue-800 rounded-lg hover:bg-blue-800 hover:shadow-lg">
                <FaPaperPlane className="text-lg" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Main Content */}
      <footer className="py-16 text-white bg-blue-900">
        <div className="container grid grid-cols-1 gap-12 px-6 mx-auto sm:grid-cols-2 lg:grid-cols-4 max-w-7xl">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{companyInfo.name}</h3>
            <p className="text-blue-200">{companyInfo.description}</p>
            <div className="flex gap-4 pt-2">
              {companyInfo.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 text-white transition-all rounded-full ${social.color}`}
                  aria-label={`${social.icon.type.name} link`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Resources</h3>
            <ul className="space-y-3 text-blue-200">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.url} className="transition-all hover:text-white" style={{ textDecoration: "none" }}>
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3 text-blue-200">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="transition-all hover:text-white" style={{ textDecoration: "none" }}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-4 text-blue-200">
              <li className="flex items-start gap-3">
                <button
                  onClick={toggleMap}
                  className="flex items-start gap-3 text-left hover:text-white focus:outline-none"
                >
                  <FaMapMarkerAlt className="mt-1 text-blue-300" />
                  <span>{companyInfo.address}</span>
                </button>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-blue-300" />
                <span>{companyInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-300" />
                <span>{companyInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl h-96">
            <button
              onClick={toggleMap}
              className="absolute z-10 p-2 text-gray-700 bg-white rounded-full shadow-lg -top-3 -right-3 hover:bg-gray-100"
              aria-label="Close map"
            >
              <FaTimes className="text-lg" />
            </button>
            <iframe
              width="100%"
              height="100%"
              className="rounded-lg"
              frameBorder="0"
              src={`https://maps.google.com/maps?q=${companyInfo.mapLocation.lat},${companyInfo.mapLocation.lng}&z=15&output=embed`}
              title="Company Location"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-0 left-0 right-0 p-2 text-sm text-center text-white bg-blue-900 rounded-b-lg">
              EduConnect - Vijayawada, Andhra Pradesh
            </div>
          </div>
        </div>
      )}

      {/* Copyright */}
      <div className="py-6 text-sm text-center text-blue-200 bg-blue-800">
        <div className="container flex flex-col items-center justify-between px-6 mx-auto md:flex-row max-w-7xl">
          <div className="mb-4 md:mb-0">© {currentYear} {companyInfo.name}. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="transition-all hover:text-white"
                style={{ textDecoration: "none" }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;