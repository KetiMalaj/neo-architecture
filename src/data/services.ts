import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";
import service3 from "@/assets/service-3.jpg";
import service4 from "@/assets/service-4.jpg";

export interface Service {
  id: string;
  img: string;
  title: string;
  desc: string;
  tagline: string;
  description: string;
  features: string[];
  process: { step: string; title: string; description: string }[];
  gallery: { src: string; caption: string; span?: "tall" | "wide" | "normal" }[];
}

export const services: Service[] = [
  {
    id: "architecture",
    img: service1,
    title: "Architecture",
    desc: "Creating functional and stylish modern buildings with minimalist elegance.",
    tagline: "Form follows vision",
    description:
      "Our architectural practice is rooted in the belief that great buildings emerge from a deep understanding of place, purpose, and people. We design structures that are both visually striking and rigorously functional — from concept sketches through construction documentation. Every project begins with careful site analysis and client dialogue, ensuring the final form responds to its context while pushing creative boundaries.",
    features: [
      "Concept design & feasibility studies",
      "Schematic & detailed design development",
      "Construction documentation & administration",
      "Building permit & regulatory coordination",
      "3D visualization & physical model making",
      "Sustainable & energy-efficient design strategies",
    ],
    process: [
      { step: "01", title: "Discovery", description: "We listen. Site visits, client workshops, and contextual research define the project brief and uncover hidden opportunities." },
      { step: "02", title: "Concept", description: "Iterative sketching and massing studies translate the brief into a compelling spatial idea that anchors every decision that follows." },
      { step: "03", title: "Development", description: "The concept is refined into detailed plans, sections, and 3D models — materials, structure, and systems are resolved together." },
      { step: "04", title: "Delivery", description: "Full construction documentation, contractor coordination, and on-site oversight ensure the design is built as envisioned." },
    ],
    gallery: [
      { src: service1, caption: "Contemporary facade study", span: "wide" },
      { src: service2, caption: "Structural massing model", span: "normal" },
      { src: service3, caption: "Construction phase", span: "tall" },
      { src: service4, caption: "Completed building at dusk", span: "normal" },
    ],
  },
  {
    id: "residential-space",
    img: service2,
    title: "Residential Space",
    desc: "Warm, inviting living spaces that blend comfort with contemporary design.",
    tagline: "Where life unfolds",
    description:
      "A home should feel like a natural extension of the people who live in it. Our residential design service covers everything from single-family houses to multi-unit developments, with a focus on flow, natural light, and material warmth. We work closely with each client to understand daily rituals, family dynamics, and aspirations — then translate those into spaces that are effortless to inhabit.",
    features: [
      "Single-family & multi-family home design",
      "Renovation & adaptive reuse of existing structures",
      "Spatial planning & circulation optimization",
      "Natural light & ventilation strategies",
      "Custom furniture & built-in joinery design",
      "Landscape integration & outdoor living areas",
    ],
    process: [
      { step: "01", title: "Brief & Vision", description: "In-depth conversations about lifestyle, preferences, and aspirations shape a design brief that is uniquely yours." },
      { step: "02", title: "Spatial Planning", description: "Floor plans are developed to optimize flow, light, and connection between indoor and outdoor living." },
      { step: "03", title: "Material Palette", description: "We curate materials and finishes that balance durability, beauty, and budget — from flooring to fixtures." },
      { step: "04", title: "Realization", description: "Detailed drawings, contractor selection support, and regular site visits bring the home to life exactly as planned." },
    ],
    gallery: [
      { src: service2, caption: "Open-plan living room", span: "wide" },
      { src: service1, caption: "Bedroom with natural light", span: "tall" },
      { src: service4, caption: "Kitchen & dining area", span: "normal" },
      { src: service3, caption: "Private courtyard view", span: "normal" },
    ],
  },
  {
    id: "interior-design",
    img: service3,
    title: "Interior Design",
    desc: "Thoughtful interiors that balance beauty, function, and personality.",
    tagline: "Details that resonate",
    description:
      "Interior design at ARCAN goes beyond decoration — it is the art of shaping how a space feels, functions, and ages. We consider every surface, edge, and transition: the warmth of timber underfoot, the play of light on textured walls, the quiet satisfaction of a perfectly proportioned room. Our interiors are layered, tactile, and deeply considered.",
    features: [
      "Full interior concept & space planning",
      "Material, finish & color specification",
      "Bespoke furniture & lighting design",
      "Art curation & styling",
      "Acoustic & lighting design consulting",
      "FF&E procurement & project management",
    ],
    process: [
      { step: "01", title: "Mood & Direction", description: "Mood boards, reference images, and material samples establish the aesthetic language of the project." },
      { step: "02", title: "Layout & Flow", description: "Furniture plans and spatial arrangements are tested and refined to ensure comfort and visual harmony." },
      { step: "03", title: "Detailing", description: "Every element — joinery profiles, hardware, textiles, lighting — is specified with precision." },
      { step: "04", title: "Installation", description: "We manage delivery, installation, and final styling so the space is move-in ready down to the last cushion." },
    ],
    gallery: [
      { src: service3, caption: "Minimalist lounge interior", span: "wide" },
      { src: service4, caption: "Custom joinery detail", span: "normal" },
      { src: service2, caption: "Material palette study", span: "normal" },
      { src: service1, caption: "Finished dining space", span: "tall" },
    ],
  },
  {
    id: "exterior-planning",
    img: service4,
    title: "Exterior Planning",
    desc: "Harmonious outdoor environments integrated with architectural vision.",
    tagline: "Beyond the threshold",
    description:
      "The space between a building and its boundary is architecture too. Our exterior planning service shapes gardens, courtyards, terraces, and public landscapes into coherent extensions of the built environment. We combine planting design, hardscape detailing, and environmental sensitivity to create outdoor spaces that are as considered as the interiors they adjoin.",
    features: [
      "Landscape concept & master planning",
      "Hardscape design — paving, walls, water features",
      "Planting design & species selection",
      "Outdoor lighting & irrigation systems",
      "Terrace, deck & pergola design",
      "Sustainable drainage & green infrastructure",
    ],
    process: [
      { step: "01", title: "Site Reading", description: "Sun paths, soil conditions, views, and microclimates are mapped to understand what the site wants to become." },
      { step: "02", title: "Master Plan", description: "Zones for planting, circulation, seating, and activity are composed into a unified landscape strategy." },
      { step: "03", title: "Planting & Materials", description: "Species are selected for year-round interest, low maintenance, and ecological value; hardscape materials are chosen for longevity." },
      { step: "04", title: "Implementation", description: "Planting schedules, construction details, and contractor oversight ensure the landscape matures as designed." },
    ],
    gallery: [
      { src: service4, caption: "Landscaped courtyard", span: "wide" },
      { src: service3, caption: "Terraced garden design", span: "tall" },
      { src: service1, caption: "Water feature detail", span: "normal" },
      { src: service2, caption: "Outdoor living pavilion", span: "normal" },
    ],
  },
];
