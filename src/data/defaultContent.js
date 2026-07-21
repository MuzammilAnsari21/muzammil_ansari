// Default dummy content for the portfolio landing page.
// Everything here can be edited live from the "Edit Content" admin portal
// (bottom-right gear button) and is persisted to localStorage.
import heroPortrait from "../assets/hero-portrait.png";

const defaultContent = {
  brand: {
    initials: "MA",
    name: "Muzammil Ansari",
    role: "Frontend Developer & UI Engineer",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    badge: "Crafting polished digital experiences",
    titleLine1: "I design and build",
    titleLine2: "Animated, modern websites",
    description:
      "I help founders and brands turn bold ideas into fast, elegant, and conversion-focused web experiences with thoughtful UI, motion, and performance.",
    primaryBtnText: "View My Work",
    primaryBtnHref: "#work",
    secondaryBtnText: "Book a Call",
    secondaryBtnHref: "#contact",
    image: heroPortrait,
    tagOne: "React",
    tagTwo: "Animation",
    codeSnippet: "const developer = (\n  passion: 'Design',\n  focus: 'Motion',\n  delivery: 'Fast'\n);",
  },
  stats: [
    { icon: "zap", value: "4+", label: "Years Experience" },
    { icon: "shield", value: "50+", label: "Projects Delivered" },
    { icon: "check", value: "100%", label: "Client Satisfaction" },
    { icon: "grid", value: "15+", label: "Technologies Mastered" },
  ],
  services: {
    tag: "SERVICES",
    title: "What I Can Do For You",
    description: "I build fast, secure, and scalable solutions tailored to your business needs with a sharp eye for design and detail.",
    items: [
      {
        icon: "globe",
        title: "WordPress Development",
        desc: "Custom themes, plugins and full website development.",
      },
      {
        icon: "code",
        title: "React / Next.js Development",
        desc: "Modern, fast and scalable web apps with clean and reusable code.",
      },
      {
        icon: "layout",
        title: "Custom Web Apps",
        desc: "End-to-end web applications tailored to your business.",
      },
      {
        icon: "pen",
        title: "UI/UX to Code",
        desc: "Convert Figma, XD or PSD designs into pixel-perfect websites.",
      },
    ],
  },
  projects: {
    tag: "FEATURED WORK",
    title: "Selected Projects",
    items: [
      {
        image:
          "https://images.pexels.com/photos/34803986/pexels-photo-34803986.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        title: "Project One",
        tags: "WordPress, Elementor, ACF",
        link: "#",
      },
      {
        image:
          "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        title: "Project Two",
        tags: "React, Tailwind CSS, Node.js",
        link: "#",
      },
      {
        image:
          "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        title: "Project Three",
        tags: "Next.js, MongoDB, Tailwind",
        link: "#",
      },
      {
        image:
          "https://images.pexels.com/photos/8534041/pexels-photo-8534041.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        title: "Project Four",
        tags: "WordPress, WooCommerce",
        link: "#",
      },
    ],
  },
  process: {
    tag: "PROCESS",
    title: "My Working Process",
    steps: [
      { icon: "search", title: "Discovery", desc: "Understanding your goals, audience and requirements." },
      { icon: "pen", title: "Design / Prototype", desc: "Planning structure, wireframes and interactive prototype." },
      { icon: "code", title: "Development", desc: "Clean, scalable and performance-focused code." },
      { icon: "rocket", title: "Launch & Support", desc: "Testing, deployment and ongoing support." },
    ],
  },
  testimonials: {
    tag: "TESTIMONIALS",
    title: "What Clients Say",
    items: [
      {
        image:
          "https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        name: "Client One",
        role: "CEO, Company",
        text: "Delivered a high-quality website that exceeded our expectations. Great communication and skills!",
        rating: 5,
      },
      {
        image:
          "https://images.pexels.com/photos/1546912/pexels-photo-1546912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        name: "Client Two",
        role: "Marketing Manager",
        text: "Professional, reliable and detail-oriented. The project was completed on time with excellent quality.",
        rating: 5,
      },
      {
        image:
          "https://images.pexels.com/photos/26150471/pexels-photo-26150471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        name: "Client Three",
        role: "Founder, Startup",
        text: "Highly recommended! Understood our requirements perfectly and built an amazing product.",
        rating: 5,
      },
    ],
  },
  techStack: {
    tag: "TECH STACK",
    title: "Technologies I Use",
    items: [
      { label: "WordPress" },
      { label: "React" },
      { label: "Next.js" },
      { label: "PHP" },
      { label: "Laravel" },
      { label: "Tailwind CSS" },
      { label: "Figma" },
      { label: "Git" },
    ],
  },
  contact: {
    tag: "LET'S CONNECT",
    title: "Let's build something great",
    description: "Have a project in mind? Let's discuss how I can help you shape a clean, modern, and high-performing experience.",
    email: "muzammilansari@example.com",
    location: "Lahore, Pakistan",
    projectTypes: "React Website, UI/UX Design, Landing Page, Full Web App",
    socials: [
      { icon: "github", href: "#" },
      { icon: "linkedin", href: "#" },
      { icon: "behance", href: "#" },
      { icon: "twitter", href: "#" },
    ],
  },
  footer: {
    text: "All rights reserved.",
  },
  theme: {
    primary: "#83B17F",
  },
};

export default defaultContent;
