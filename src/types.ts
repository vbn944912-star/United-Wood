export interface WoodProduct {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  detailedDescription: string;
  features: string[];
  imageUrl: string;
  category: "natural" | "industrial" | "project" | "export";
  origin: string;
}

export interface QuoteRequest {
  fullName: string;
  phone: string;
  email: string;
  woodType: string;
  projectType: string;
  quantity: string;
  notes: string;
}

export interface SubmittedQuote {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  woodType: string;
  projectType: string;
  quantity: string;
  notes: string;
  date: string;
  status: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  isInitial?: boolean;
}

export interface BrandStat {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TechSpec {
  density: string;
  moisture: string;
  durability: string;
}
