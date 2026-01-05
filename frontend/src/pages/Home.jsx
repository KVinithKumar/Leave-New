import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* SLIDER DATA - Using specific Unsplash image IDs for better loading */
const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Welcome to NLVRGSRV",
    text: "A Smart & Reliable School Management System"
  },
  {
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Empowering Education",
    text: "Connecting Students, Teachers, and Parents"
  },
  {
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Smart School Administration",
    text: "Manage Academics, Attendance, and Records Easily"
  }
];

/* STATIC IMAGES */
const ABOUT_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  /* Preload images */
  useEffect(() => {
    const preloadImages = async () => {
      const images = [...SLIDES.map(s => s.image), ABOUT_IMAGE];
      const loaded = {};
      
      await Promise.all(
        images.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              loaded[src] = true;
              resolve();
            };
            img.onerror = reject;
          });
        })
      );
      
      setLoadedImages(loaded);
    };

    preloadImages();
  }, []);

  /* AUTO SLIDE */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* HERO SLIDER */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 bg-gray-200">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  loadedImages[slide.image] ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setLoadedImages(prev => ({...prev, [slide.image]: true}))}
              />
              {/* Fallback background color while loading */}
              {!loadedImages[slide.image] && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 animate-pulse"></div>
              )}
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-700/50" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6">
              <div className="text-center max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-12 inline-block">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
                    {slide.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`transition-all duration-300 ${
                index === activeSlide 
                  ? "bg-white w-8 md:w-10 h-2 md:h-2.5 rounded-full" 
                  : "bg-white/60 hover:bg-white w-2.5 h-2.5 rounded-full"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              About NLVRGSRV School Management
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              A comprehensive school management system designed to simplify academic and
              administrative operations with modern technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                Modern School Management Solution
              </h3>
              <div className="space-y-3 md:space-y-4">
                {[
                  "Streamlined administrative processes for efficiency",
                  "Real-time communication between all stakeholders",
                  "Comprehensive student performance tracking",
                  "Secure cloud-based data storage and backup",
                  "Mobile-friendly interface for on-the-go access",
                  "Dedicated technical support and regular updates"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-lg">
                <img
                  src={ABOUT_IMAGE}
                  alt="School Management System"
                  className={`w-full h-auto aspect-video object-cover transition-opacity duration-300 ${
                    loadedImages[ABOUT_IMAGE] ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={() => setLoadedImages(prev => ({...prev, [ABOUT_IMAGE]: true}))}
                />
                {/* Fallback while loading */}
                {!loadedImages[ABOUT_IMAGE] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
              Key Features
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Powerful tools designed to enhance educational management and improve learning outcomes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🎓",
                title: "Student Management",
                desc: "Complete student profiles with academic history, attendance records, and performance analytics",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-100"
              },
              {
                icon: "👨‍🏫",
                title: "Teacher Portal",
                desc: "Lesson planning, grade management, and communication tools for educators",
                bgColor: "bg-green-50",
                borderColor: "border-green-100"
              },
              {
                icon: "📊",
                title: "Academic Analytics",
                desc: "Monitor exams, results, assignments, and track overall academic progress",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-100"
              },
              {
                icon: "📱",
                title: "Parent Communication",
                desc: "Real-time updates, announcements, and progress reports for parents",
                bgColor: "bg-amber-50",
                borderColor: "border-amber-100"
              },
              {
                icon: "💼",
                title: "Attendance System",
                desc: "Automated daily attendance tracking with detailed reports and analytics",
                bgColor: "bg-cyan-50",
                borderColor: "border-cyan-100"
              },
              {
                icon: "🔒",
                title: "Data Security",
                desc: "Secure cloud storage with role-based access control and encryption",
                bgColor: "bg-red-50",
                borderColor: "border-red-100"
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.bgColor} p-6 md:p-8 rounded-lg shadow hover:shadow-md transition-all duration-300 border ${item.borderColor}`}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 ${item.bgColor.replace('50', '100')} rounded-full flex items-center justify-center text-2xl mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
              Benefits of Using NLVRGSRV
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Experience the advantages of a modern school management system
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                title: "Time Saving",
                desc: "Reduce administrative work",
                iconColor: "text-blue-600",
                bgColor: "bg-blue-100"
              },
              {
                title: "Better Communication",
                desc: "Instant updates to all stakeholders",
                iconColor: "text-green-600",
                bgColor: "bg-green-100"
              },
              {
                title: "Data Accuracy",
                desc: "Minimize errors with automation",
                iconColor: "text-purple-600",
                bgColor: "bg-purple-100"
              },
              {
                title: "Easy Access",
                desc: "Access from any device",
                iconColor: "text-amber-600",
                bgColor: "bg-amber-100"
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}>
                  <svg className={`w-6 h-6 md:w-8 md:h-8 ${item.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
            Our Vision
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            To create a digitally empowered school environment where technology
            supports learning, improves communication, and enhances educational
            excellence for all stakeholders in the educational ecosystem.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;