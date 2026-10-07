export const company = {
  name: "MartEX",
  tagline: "Technology That Solves Business",
  legalLocation: "Monrovia, Liberia",
  established: 2026,
  shortDescription:
    "MartEX builds practical software solutions that help organizations improve operations, automate work, manage information, and serve customers more effectively.",
  elevatorPitch:
    "MartEX turns business problems into practical software. We work with organizations to understand how they operate, identify where technology can create measurable value, and build applications that simplify work, improve information flow, and support better service delivery.",
  mission:
    "To design and deliver reliable software solutions that simplify business operations, improve decision-making, increase productivity, and help organizations provide better services.",
  vision:
    "To become a trusted technology partner for businesses and institutions in Liberia and beyond, known for practical innovation, dependable delivery, and solutions that create measurable value.",
} as const;

/**
 * Phone, email, and website come from MartEX's approved Lichen MD brochure.
 * Fields left empty (street address, hours, map, social profiles) are hidden
 * on the site rather than shown as placeholders — fill them in once MartEX
 * supplies verified details. See CONTENT_INVENTORY.md.
 */
export const contact = {
  officeLocation: "Monrovia, Liberia",
  addressLine: "",
  phone: "+231 771 9111 95",
  email: "info@orith.tech",
  website: "martex.com.lr",
  hours: "",
  mapEmbedUrl: "",
  social: {
    linkedin: "",
    x: "",
    facebook: "https://web.facebook.com/profile.php?id=100089630951216",
    instagram: "",
  },
} as const;

const phoneDigits = contact.phone.replace(/[^\d+]/g, "");
export const contactLinks = {
  email: contact.email ? `mailto:${contact.email}` : "",
  phone: phoneDigits ? `tel:${phoneDigits}` : "",
  whatsapp: phoneDigits ? `https://wa.me/${phoneDigits.replace("+", "")}` : "",
};

export type Audience = { name: string; description: string };

export const audiences: Audience[] = [
  { name: "SMEs", description: "Small and medium-sized enterprises modernizing day-to-day operations." },
  { name: "Corporate teams", description: "Larger organizations coordinating multiple departments and systems." },
  { name: "Government institutions", description: "Public agencies improving service delivery and records management." },
  { name: "NGOs and development organizations", description: "Programs that need reliable data, reporting, and field coordination." },
  { name: "Educational institutions", description: "Schools and training organizations managing records and communication." },
  { name: "Healthcare organizations", description: "Providers coordinating patient information and operational workflows." },
  { name: "Startups", description: "New ventures that need a dependable technical foundation from day one." },
];

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
