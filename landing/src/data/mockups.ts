export interface MockupLead {
  slug: string;
  client_name: string;
  niche: string;
  theme?: 'light' | 'dark';
  accent_color: string;
  background_image: string;
  hero_image?: string;
  bio?: string;
  services?: string[];
  address?: string;
  contact_link?: string;
}

export const mockups: Record<string, MockupLead> = {
  "pellefiore": {
    slug: "pellefiore",
    client_name: "Estética PelleFiore",
    niche: "Clínica de Estética",
    theme: "light",
    accent_color: "#19b0a9", // Ajustado baseado na paleta da imagem providenciada
    background_image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?q=80&w=2000", // Spa/Aesthetic vibe premium
    hero_image: "/pellefiore.png",
    bio: "Desde 2013, a PelleFiore floresce autoestima com alma. Uma experiência que cuida, acolhe e transforma.",
    contact_link: "https://api.whatsapp.com/message/UNN454DGHI6JO1?autoload=1&app_absent=0",
    address: "Rua Clodoaldo Freitas, 680. Centro Norte, Teresina PI",
    services: [
      "Limpeza de Pele Profunda",
      "Revitalização e Microagulhamento",
      "Radiofrequência e Crioterapia Facial",
      "Criolipólise e Criofrequência",
      "Endermologia e Corrente Russa",
      "Drenagem Linfática e Massagens Exclusivas"
    ]
  },
  "nutribella": {
    slug: "nutribella",
    client_name: "Clínica Nutribella",
    niche: "Nutrição & Estética",
    theme: "light",
    accent_color: "#C49B5A", // Dourado Champagne da Logo
    background_image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000", /* Clean Spa Texture */
    hero_image: "/nutribella.png",
    bio: "Transformando vidas através da estética! Estética Facial e Corporal, Protocolos Exclusivos e Atendimento Nutricional avançado.",
    contact_link: "https://api.whatsapp.com/send/?phone=%2B5586995168080&text&type=phone_number&app_absent=0",
    services: [
      "Harmonização Facial",
      "Harmonização Corporal",
      "Tratamentos Estéticos Avançados",
      "Protocolos Nutricionais",
      "Emagrecimento Saudável",
      "Rejuvenescimento"
    ]
  }
};
