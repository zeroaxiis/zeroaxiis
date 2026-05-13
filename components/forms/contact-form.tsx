"use client";

import { useState, FormEvent } from "react";
import { FormInput } from "./form-input";
import { FormTextarea } from "./form-textarea";
import ShinyText from "@/components/ui/shiny-text";

export function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="glass-panel p-8 rounded-lg relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          id="email"
          name="email"
          label="Email Address"
          placeholder="ADDRESS@DOMAIN.COM"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormInput
          id="subject"
          name="subject"
          label="Subject"
          placeholder="SUBJECT / INTENT"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <FormTextarea
          id="message"
          name="message"
          label="Message"
          placeholder="PAYLOAD..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button
          className="w-full font-label-mono text-label-mono uppercase px-6 py-4 border border-stroke hover:bg-white/5 hover:border-primary transition-all duration-200 rounded"
          type="submit"
        >
          <ShinyText text="Transmit Signal" color="#c4c7c8" shineColor="#ffffff" speed={3} spread={140} />
        </button>
      </form>
    </div>
  );
}
