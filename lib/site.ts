// Central place for committee details and membership plans.
// Edit these values — the whole page reads from here.

export const SITE = {
  name: "Shree Dharmic Leela Committee",
  nameHi: "श्री धार्मिक लीला कमेटी",
  tagline: "Preserving the sacred tradition of Ramleela, one season at a time.",
  phone: "+91-00000-00000",
  email: "info@example.org",
  address: "Committee Office, Your City, India",
};

export type Plan = {
  id: string;
  name: string;
  nameHi: string;
  price: number; // in INR
  period: string;
  highlight?: boolean;
  perks: string[];
};

// Sample prices — replace with the committee's final fee structure.
export const PLANS: Plan[] = [
  {
    id: "sadasya",
    name: "Sadasya",
    nameHi: "सदस्य",
    price: 1100,
    period: "per year",
    perks: [
      "Membership letter & ID",
      "Reserved seating for members",
      "Newsletter and event updates",
    ],
  },
  {
    id: "sanrakshak",
    name: "Sanrakshak",
    nameHi: "संरक्षक",
    price: 5100,
    period: "per year",
    highlight: true,
    perks: [
      "Everything in Sadasya",
      "Front-row seating on all nights",
      "Name on the Sanrakshak board",
      "Invitation to the Rajtilak ceremony",
    ],
  },
  {
    id: "aajeevan",
    name: "Aajeevan",
    nameHi: "आजीवन",
    price: 21000,
    period: "one-time, lifetime",
    perks: [
      "Lifetime membership, no renewals",
      "Front-row seating for family (4)",
      "Honour at the Dussehra evening",
      "Voting rights in the general body",
    ],
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
