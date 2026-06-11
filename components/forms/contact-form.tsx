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
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
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
          placeholder="How can we help?"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <FormTextarea
          id="message"
          name="message"
          label="Message"
          placeholder="Describe your question or issue in detail..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Magnetic strength={0.3}>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-bone text-ink font-body-sm text-body-sm font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Transmitting..." : "Transmit signal"}
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-ink text-bone group-hover:rotate-[-45deg] transition-transform duration-500">
                <ArrowUpRightSmallIcon />
              </span>
            </button>
          </Magnetic>
          
          {status === "success" && (
            <p className="text-accent text-sm animate-in fade-in slide-in-from-bottom-2">
              Signal transmitted successfully.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm animate-in fade-in slide-in-from-bottom-2">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
