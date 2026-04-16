import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export interface ProjectSchema {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  img: string;
  title: string;
  category: string;
  tall: boolean;
  year: string;
  location: string;
  client: string;
  area: string;
  description: string;
  challenge: string;
  solution: string;
  schemas: ProjectSchema[];
  gallery: { src: string; caption: string; span?: "tall" | "wide" | "normal" }[];
}

export const projects: Project[] = [
  {
    id: "leana-gallery",
    img: project1,
    title: "Leana Gallery",
    category: "Architecture",
    tall: true,
    year: "2024",
    location: "Milan, Italy",
    client: "Leana Arts Foundation",
    area: "2,400 m²",
    description:
      "A contemporary art gallery designed to blur the boundary between interior exhibition space and the surrounding urban landscape. The structure features floor-to-ceiling glazing, cantilevered concrete volumes, and a central atrium flooded with natural light.",
    challenge:
      "The site was narrow and flanked by heritage buildings, requiring a design that respected the existing streetscape while making a bold contemporary statement.",
    solution:
      "We introduced a recessed ground floor that creates a public plaza, drawing visitors inward. The upper levels step back progressively, reducing visual mass and allowing daylight to reach the street below.",
    schemas: [
      { label: "Structure", value: "Reinforced concrete frame with steel trusses" },
      { label: "Facade", value: "Double-skin curtain wall with operable louvers" },
      { label: "Floors", value: "3 above grade + 1 below" },
      { label: "Sustainability", value: "LEED Gold certified" },
      { label: "Lighting", value: "Integrated LED track system with daylight harvesting" },
    ],
    gallery: [
      { src: project1, caption: "Main facade at dusk", span: "wide" },
      { src: project2, caption: "Interior atrium view", span: "normal" },
      { src: project3, caption: "Exhibition hall detail", span: "tall" },
      { src: project4, caption: "Entrance courtyard", span: "normal" },
    ],
  },
  {
    id: "meridian-loft",
    img: project2,
    title: "Meridian Loft",
    category: "Interior",
    tall: false,
    year: "2023",
    location: "New York, USA",
    client: "Private Residence",
    area: "320 m²",
    description:
      "A penthouse loft conversion in a former industrial building. The design preserves raw concrete columns and exposed ductwork while introducing warm timber screens, bespoke joinery, and a seamless open-plan living area.",
    challenge:
      "Balancing the industrial heritage of the space with the comfort and warmth expected in a luxury residence without erasing its character.",
    solution:
      "Material contrast became our guiding principle — polished terrazzo floors meet raw concrete, blackened steel frames hold hand-oiled oak panels, and a sculptural spiral stair connects the mezzanine study.",
    schemas: [
      { label: "Type", value: "Residential loft conversion" },
      { label: "Materials", value: "Oak, terrazzo, blackened steel, raw concrete" },
      { label: "Heating", value: "Underfloor radiant system" },
      { label: "Kitchen", value: "Bespoke island with Carrara marble countertop" },
      { label: "Smart Home", value: "KNX integrated lighting & climate control" },
    ],
    gallery: [
      { src: project2, caption: "Open-plan living area", span: "wide" },
      { src: project3, caption: "Kitchen island detail", span: "tall" },
      { src: project1, caption: "Spiral staircase", span: "normal" },
      { src: project4, caption: "Mezzanine study", span: "normal" },
    ],
  },
  {
    id: "verde-terrace",
    img: project3,
    title: "Verde Terrace",
    category: "Landscape",
    tall: true,
    year: "2024",
    location: "Barcelona, Spain",
    client: "Verde Hospitality Group",
    area: "5,800 m²",
    description:
      "A terraced hospitality complex nestled into a Mediterranean hillside. The design integrates native planting, infinity pools, and open-air dining pavilions that step down the slope, offering panoramic sea views from every level.",
    challenge:
      "The steep gradient and protected ecological zone demanded minimal disturbance to existing topography and vegetation.",
    solution:
      "Retaining walls double as seating and planting beds. Buildings are partially embedded into the hillside with green roofs that restore the displaced landscape above. Rainwater is captured and recirculated through an on-site filtration system.",
    schemas: [
      { label: "Terrain", value: "Terraced hillside, 18% gradient" },
      { label: "Planting", value: "120+ native Mediterranean species" },
      { label: "Water", value: "Closed-loop rainwater harvesting" },
      { label: "Pools", value: "3 infinity-edge, natural stone lining" },
      { label: "Lighting", value: "Low-impact path & accent LED" },
    ],
    gallery: [
      { src: project3, caption: "Terraced overview from hillside", span: "wide" },
      { src: project4, caption: "Infinity pool at sunset", span: "normal" },
      { src: project1, caption: "Dining pavilion", span: "normal" },
      { src: project2, caption: "Native garden path", span: "tall" },
    ],
  },
  {
    id: "solara-villa",
    img: project4,
    title: "Solara Villa",
    category: "Residential",
    tall: false,
    year: "2023",
    location: "Santorini, Greece",
    client: "Private Client",
    area: "480 m²",
    description:
      "A private villa that reinterprets the Cycladic vernacular with clean modernist lines. Whitewashed volumes are punctuated by deep-set openings framing caldera views, while interior courtyards provide sheltered outdoor living.",
    challenge:
      "Strict local planning codes mandated traditional Cycladic forms and materials, yet the client desired a distinctly contemporary interior.",
    solution:
      "Externally the villa reads as a cluster of traditional cubic volumes. Inside, walls open into fluid, light-filled spaces with hidden pivot doors, recessed lighting channels, and minimalist detailing that feel decisively modern.",
    schemas: [
      { label: "Style", value: "Contemporary Cycladic" },
      { label: "Walls", value: "Lime-rendered masonry, 600 mm thick" },
      { label: "Roof", value: "Traditional barrel vault with waterproof membrane" },
      { label: "Energy", value: "Photovoltaic array, 12 kWp" },
      { label: "Pool", value: "Cantilevered infinity pool, 15 m" },
    ],
    gallery: [
      { src: project4, caption: "Villa exterior at golden hour", span: "wide" },
      { src: project1, caption: "Interior courtyard", span: "tall" },
      { src: project2, caption: "Living room view to caldera", span: "normal" },
      { src: project3, caption: "Rooftop terrace", span: "normal" },
    ],
  },
];
