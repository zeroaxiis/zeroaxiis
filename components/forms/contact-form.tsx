"use client";

import { useState, FormEvent } from "react";
import { FormInput } from "./form-input";
import { FormTextarea } from "./form-textarea";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowUpRightSmallIcon } from "@/components/icons";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative">
      <form className="space-y-10" onSubmit={handleSubmit}>
        <FormInput
          id="email"
          name="email"
          label="Email"
          placeholder="address@domain.com"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormInput
          id="subject"
          name="subject"
          label="Subject"
          placeholder="What are you building?"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <FormTextarea
          id="message"
          name="message"
          label="Message"
          placeholder="Tell us the shape of the problem..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Magnetic strength={0.3}>
          <button
            type="submit"
            className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-bone text-ink font-body-sm text-body-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Transmit signal
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-ink text-bone group-hover:rotate-[-45deg] transition-transform duration-500">
              <ArrowUpRightSmallIcon />
            </span>
          </button>
        </Magnetic>
      </form>
    </div>
  );
}
