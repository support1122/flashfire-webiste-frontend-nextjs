"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaBuilding, FaPhone } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add API call here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Your Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className="text-gray-400" />
          </div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your First Name"
            required
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition"
          />
          </div>
          </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            required
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition"
          />
        </div>
          </div>

      {/* Company / School */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Company / School <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaBuilding className="text-gray-400" />
          </div>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter your Company / School"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition"
          />
        </div>
          </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Phone <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaPhone className="text-gray-400" />
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your Phone Number"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          How can we help?
        </label>
          <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter Message Here"
          rows={5}
          required
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4c00] focus:border-[#ff4c00] outline-none transition resize-y"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#ff4c00] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#e64400] transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Send Message
      </button>
    </form>
  );
}
