
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechFlow Inc",
    image: "👩‍💼",
    rating: 5,
    text: "Glidrclick transformed our content strategy completely. We went from struggling to post twice a week to having daily, engaging content across all platforms. Our engagement rates increased by 300%!",
    results: "300% increase in engagement"
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "StartupHub",
    image: "👨‍💼",
    rating: 5,
    text: "As a busy entrepreneur, I needed a solution that could handle our content without my constant input. Glidrclick delivers exactly that - professional, on-brand content that converts.",
    results: "5 hours saved weekly"
  },
  {
    name: "Emily Rodriguez",
    role: "Content Manager",
    company: "Digital Dreams",
    image: "👩‍🎨",
    rating: 5,
    text: "The AI understands our brand voice perfectly. Our followers can't tell the difference between AI-generated and human-written content. It's incredibly sophisticated.",
    results: "50% more followers"
  },
  {
    name: "David Park",
    role: "Small Business Owner",
    company: "Local Café",
    image: "👨‍🍳",
    rating: 5,
    text: "I run a small café and never had time for social media. Now I have consistent, engaging posts that bring in new customers every day. Game changer!",
    results: "40% increase in foot traffic"
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Agency Owner",
    company: "Creative Solutions",
    image: "👩‍💻",
    rating: 5,
    text: "We use Glidrclick for multiple clients. The ability to maintain different brand voices and styles for each client is remarkable. Our clients love the results.",
    results: "10+ happy clients"
  },
  {
    name: "James Wilson",
    role: "E-commerce Director",
    company: "Online Store Pro",
    image: "👨‍💻",
    rating: 5,
    text: "Our product descriptions and social posts are now consistently high-quality. Sales have increased significantly since we started using Glidrclick.",
    results: "25% increase in sales"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-glidr-soft-purple to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their content strategy
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main testimonial display */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="mx-4 hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8 text-center">
                      {/* Quote icon */}
                      <div className="mb-6">
                        <Quote className="w-12 h-12 text-glidr-purple mx-auto opacity-20" />
                      </div>

                      {/* Testimonial text */}
                      <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Rating */}
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Results badge */}
                      <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        📈 {testimonial.results}
                      </div>

                      {/* Author info */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-4xl">{testimonial.image}</div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-800">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                          <div className="text-sm font-medium text-glidr-purple">{testimonial.company}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 shadow-lg z-10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 shadow-lg z-10"
            onClick={goToNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-glidr-purple scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isAutoPlaying ? '⏸️ Pause' : '▶️ Auto-play'}
            </button>
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="text-3xl font-bold text-glidr-purple mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold text-glidr-purple mb-2">2,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-glidr-purple mb-2">98%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
