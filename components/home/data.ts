export const navLinks = [
  { label: "Ceramic", href: "#education" },
  { label: "Gallery", href: "#gallery" },
  { label: "Menu", href: "#pricing" },
  { label: "About", href: "#about" },
] as const;

export const heroPoints = [
  {
    title: "Same-day reply",
    description: "Text back within hours",
  },
  {
    title: "Drop-off service",
    description: "Bring your car to our shop",
  },
  {
    title: "Quality first",
    description: "We treat every car like ours",
  },
] as const;

export const tickerItems = [
  "Express Wash",
  "Premium Wash",
  "Ceramic Wash",
  "Wax / Sealant",
  "Add-ons",
] as const;

export const stats = [
  { label: "Typical reply time", value: 2, suffix: " hr" },
  { label: "Customer rating", value: 5, suffix: "★" },
  { label: "Cars served", value: 200, suffix: "+" },
  { label: "Satisfaction", value: 100, suffix: "%" },
] as const;

export const benefits = [
  {
    title: "Hydrophobic",
    description: "Water and dirt bead off so washes take less time.",
    icon: "shield",
  },
  {
    title: "UV resistance",
    description: "Helps reduce fading and oxidation from sun exposure.",
    icon: "sun",
  },
  {
    title: "Mirror gloss",
    description: "Enhances clarity for a wet-look finish.",
    icon: "star",
  },
  {
    title: "Protection",
    description: "Helps resist light swirls and common contaminants.",
    icon: "checkShield",
  },
] as const;

export type GalleryItem = {
  step: "Before" | "After" | "Ceramic" | "Final";
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export const paintGalleryItems: readonly GalleryItem[] = [
  {
    step: "Before",
    title: "Original paint",
    description: "Initial condition before any correction or protection work.",
    imageSrc: "/blackCarPT1.JPEG",
    imageAlt: "Black car paint before correction and protection",
  },
  {
    step: "After",
    title: "1-Step paint correction/Polish",
    description: "Surface improved with a one-step correction and polish.",
    imageSrc: "/blackCarPT2.JPEG",
    imageAlt: "Black car paint after correction with improved clarity",
  },
  {
    step: "Ceramic",
    title: "2-Step Paint Correction",
    description: "Additional correction for deeper refinement and clarity.",
    imageSrc: "/blackCarPT3.JPEG",
    imageAlt: "Black car after ceramic coating with enhanced gloss",
  },
  {
    step: "Final",
    title: "Ceramic Coated",
    description: "Final finish sealed with ceramic coating for gloss and protection.",
    imageSrc: "/blackCarPT4.JPEG",
    imageAlt: "Black car final finish after correction and ceramic coating",
  },
];

export const trimGalleryItems: readonly GalleryItem[] = [
  {
    step: "Before",
    title: "Trim Restoration",
    description: "Uneven trim finish with spotting before restoration.",
    imageSrc: "/gallery-trim-before-v2.jpg",
    imageAlt: "Vehicle window trim with oxidation and spotting before restoration",
  },
  {
    step: "After",
    title: "Trim Restoration",
    description: "Uniform satin trim appearance after restoration work.",
    imageSrc: "/gallery-trim-after-v2.jpg",
    imageAlt: "Vehicle window trim after restoration with clean even finish",
  },
] as const;

export const services = [
  {
    title: "Express Wash",
    subtitle: "Quick wash and dry. Simple and clean.",
    items: ["Exterior hand wash", "Rinse and dry", "Light finishing touches"],
    priceTiers: [
      { label: "Sedan / Coupe", price: "$50" },
      { label: "SUV / Truck", price: "$75" },
      { label: "XL Vehicles", price: "$100" },
    ],
    featured: false,
  },
  {
    title: "Premium Wash",
    subtitle: "Almost perfect wash with a deeper clean.",
    items: [
      "More detailed exterior wash",
      "Extra attention to buildup areas",
      "Cleaner finish and better shine",
    ],
    priceTiers: [
      { label: "Sedan / Coupe", price: "$100" },
      { label: "SUV / Truck", price: "$125" },
      { label: "XL Vehicles", price: "$150" },
    ],
    featured: true,
  },
  {
    title: "Ceramic Wash",
    subtitle: "For coated vehicles. Safe, proper maintenance.",
    items: [
      "Ceramic-safe wash approach",
      "Helps maintain coating performance",
      "Leaves a clean, glossy finish",
    ],
    priceTiers: [
      { label: "Sedan / Coupe", price: "$150" },
      { label: "SUV / Truck", price: "$175" },
      { label: "XL Vehicles", price: "$200" },
    ],
    featured: true,
  },
  {
    title: "Wax / Sealant",
    subtitle: "Wash + clay + wax/sealant for added protection.",
    items: [
      "Wash, clay, dry",
      "Wax or sealant application",
      "Protection typically 3-6 months",
    ],
    priceTiers: [
      { label: "Sedan / Coupe", price: "$350" },
      { label: "SUV / Truck", price: "$475" },
      { label: "XL Vehicles", price: "$600" },
    ],
    featured: false,
  },
] as const;

export const vehicleSizes = ["Sedan / Coupe", "SUV / Truck", "XL Vehicles"] as const;

export const ceramicCoatingTiers = [
  {
    name: "Tier 1",
    badge: "1-2 Year",
    description: "Entry package for strong shine and short-term ceramic protection.",
    process:
      "Decon wash, clay, deironize, 1-step paint correction, isopropyl wipe, 1-2 year coating",
    priceTiers: [
      { label: "Sedan / Coupe", price: "$749 - $849" },
      { label: "SUV / Truck", price: "$999 - $1,199" },
      { label: "XL Vehicles", price: "$1,299 - $1,399" },
    ],
    featured: false,
  },
  {
    name: "Tier 2",
    badge: "5-7 Year",
    description: "Best value long-term option with deeper correction and durable coating.",
    process:
      "Decon wash, clay, deironize, 1-step paint correction, isopropyl wipe, 5-7 year coating",
    priceTiers: [
      { label: "Sedan / Coupe", price: "$999 - $1,199" },
      { label: "SUV / Truck", price: "$1,299 - $1,399" },
      { label: "XL Vehicles", price: "$1,499 - $1,699" },
    ],
    featured: true,
  },
  {
    name: "Tier 3",
    badge: "5-7 Year",
    description: "Highest-level correction and coating package for maximum gloss and depth.",
    process:
      "Decon wash, clay, deironize, 2-step paint correction, isopropyl wipe, 5-7 year coating",
    priceTiers: [
      { label: "Sedan / Coupe", price: "$1,299 - $1,399" },
      { label: "SUV / Truck", price: "$1,499 - $1,699" },
      { label: "XL Vehicles", price: "$1,899 +" },
    ],
    featured: false,
  },
] as const;

export const addOns = [
  "Vacuum (price varies by size)",
  "Interior wipe down",
  "Leather treatment",
  "Ceramic windows only (+$100)",
  "Ceramic coat wheels (+$200)",
  "Headlight restoration (+$150)",
  "Ceramic coat interior (+$500-$2000)",
  "Engine detailing",
] as const;

export const serviceOptions = [
  "Express Wash",
  "Premium Wash",
  "Ceramic Wash",
  "Wax / Sealant",
  "Not Sure - Just Quote Me",
] as const;

export const footerLinks = [
  { label: "Ceramic", href: "#education" },
  { label: "Gallery", href: "#gallery" },
  { label: "Menu", href: "#pricing" },
  { label: "Request a quote", href: "#quote" },
] as const;

export const howItWorksSteps = [
  {
    title: "Tell us about your car",
    description: "Share year, make, model, and what you want fixed. Takes under 2 minutes.",
  },
  {
    title: "Get a clear quote fast",
    description: "We text back quickly with pricing, timing, and recommended package options.",
  },
  {
    title: "Book and hand it off",
    description: "Choose a convenient time. We deliver a clean, glossy, protected finish.",
  },
] as const;

export const faqs = [
  {
    question: "How long does ceramic coating last?",
    answer:
      "Depending on the package you choose, ceramic coatings can last anywhere from 1 to 5+ years with proper maintenance. We offer different tiers to fit your needs and how long you want protection to last.",
  },
  {
    question: "Is ceramic coating better than wax?",
    answer:
      "Yes. Unlike wax, which sits on top of your paint and wears off quickly, ceramic coating bonds to your vehicle’s surface and provides much longer protection, better shine, and superior resistance to the elements.",
  },
  {
    question: "Will ceramic coating prevent scratches?",
    answer:
      "Ceramic coating does not make your car scratch-proof. However, it does add a layer of protection that can help reduce minor swirl marks and light scratches.",
  },
  {
    question: "Do I still need to wash my car after ceramic coating?",
    answer:
      "Yes. Your car will still get dirty, but ceramic coating makes it much easier to clean. Dirt, water, and grime won’t stick as easily, meaning quicker and safer washes.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Most ceramic coating services take anywhere from 1 to 3 days depending on the condition of the vehicle and the level of paint correction needed.",
  },
  {
    question: "Do you offer paint correction before coating?",
    answer:
      "Yes. Proper preparation is key to a perfect finish. We perform paint correction to remove swirl marks, scratches, and imperfections before applying the coating to ensure the best results.",
  },
  {
    question: "What’s the difference between ceramic coating, PPF, and wax?",
    answer:
      "Ceramic Coating: Long-term protection, gloss enhancement, and easier maintenance. PPF (Paint Protection Film): Physical barrier that protects against rock chips and deeper scratches. Wax: Short-term shine and minimal protection.",
  },
  {
    question: "Is ceramic coating worth it?",
    answer:
      "If you want to protect your vehicle’s paint, maintain a showroom shine, and reduce maintenance time, ceramic coating is absolutely worth the investment.",
  },
  {
    question: "Do you offer warranties?",
    answer:
      "Yes, we offer warranty-backed coatings depending on the package you choose. Ask us for details on coverage and maintenance requirements.",
  },
  {
    question: "How do I maintain my ceramic coating?",
    answer:
      "We recommend regular hand washes using proper techniques. We can also provide maintenance services to keep your coating performing at its best.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book directly through our website, call us, or send us a message. We’ll walk you through the process and help you choose the right package for your vehicle.",
  },
] as const;
