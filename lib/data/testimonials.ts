export type Testimonial = {
  name: string;
  title: string;
  company: string;
  location: string;
  tag: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Arjun Mehta",
    title: "Chief Technology Officer",
    company: "Ailitiq",
    location: "Mumbai, India",
    tag: "AILITIQ",
    quote:
      "Their approach transformed how we prioritize and everything feels structured and intentional now.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Sarah Collins",
    title: "Operations Lead",
    company: "Buildwave",
    location: "London, UK",
    tag: "BUILDWAVE",
    quote:
      "They brought clarity to our workflow and helped us operate with real efficiency across teams.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Michael Turner",
    title: "Head of Engineering",
    company: "InHive Space",
    location: "New York, USA",
    tag: "INHIVE",
    quote:
      "From strategy to execution, the experience was seamless. The results exceeded our expectations.",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    name: "Elena Rostova",
    title: "Product Manager",
    company: "Finledge",
    location: "Berlin, Germany",
    tag: "FINLEDGE",
    quote:
      "An outstanding collaboration that drove our metrics through the roof and unified our product vision.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Daisuke Ono",
    title: "Founder & CEO",
    company: "Solvex",
    location: "Tokyo, Japan",
    tag: "SOLVEX",
    quote:
      "Working with zeroaxiis felt like having a second brain — sharp, fast, and always one step ahead.",
    avatar: "https://i.pravatar.cc/150?img=53",
  },
];
