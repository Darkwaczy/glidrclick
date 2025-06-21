
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-electric/8 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-pink/8 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about FlowCraft? Need help getting started? 
              We're here to help you succeed with your content marketing.
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Your full name"
                          className="glass-card text-white placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your@email.com"
                          className="glass-card text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="What's this about?"
                        className="glass-card text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        className="glass-card text-white placeholder-gray-400"
                      />
                    </div>
                    <Button type="submit" className="w-full btn-neon">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="glass-card border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="text-neon-electric mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold mb-2 text-white">Email Support</h3>
                        <p className="text-gray-300">support@flowcraft.com</p>
                        <p className="text-sm text-gray-400 mt-1">
                          We typically respond within 24 hours
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="text-neon-electric mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold mb-2 text-white">Phone Support</h3>
                        <p className="text-gray-300">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Available for Premium and Enterprise customers
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="text-neon-electric mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold mb-2 text-white">Business Hours</h3>
                        <p className="text-gray-300">Monday - Friday: 9AM - 6PM EST</p>
                        <p className="text-gray-300">Saturday: 10AM - 4PM EST</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Emergency support available 24/7 for Enterprise customers
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="text-neon-electric mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold mb-2 text-white">Office Location</h3>
                        <p className="text-gray-300">
                          123 Innovation Drive<br />
                          Tech Hub, CA 94105<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-neon-lime/8 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="glass-card border-white/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-white">How quickly can I get started?</h3>
                  <p className="text-gray-300">
                    You can start using FlowCraft immediately after signing up. Our onboarding process 
                    takes less than 5 minutes, and you'll be creating content right away.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-white">Do you offer training or onboarding?</h3>
                  <p className="text-gray-300">
                    Yes! We provide comprehensive onboarding for all new users, plus ongoing training 
                    webinars and detailed documentation to help you get the most out of our platform.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-white">Can I cancel my subscription anytime?</h3>
                  <p className="text-gray-300">
                    Absolutely. You can cancel your subscription at any time with no cancellation fees. 
                    Your account will remain active until the end of your current billing cycle.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
