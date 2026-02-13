// Page Builder Types
export interface PageElement {
  id: string;
  type: 'text' | 'button' | 'image' | 'heading' | 'section' | 'container';
  content: string;
  styles: Record<string, any>;
  props: Record<string, any>;
  children?: PageElement[];
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  elements: PageElement[];
  seo: SEOMetadata;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Site {
  id: string;
  name: string;
  domain: string;
  description: string;
  pages: Page[];
  settings: SiteSettings;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  theme: ThemeConfig;
  colors: ColorScheme;
  fonts: FontConfig;
  navigation: NavigationConfig;
}

export interface ThemeConfig {
  name: string;
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  secondaryColor: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

export interface FontConfig {
  heading: string;
  body: string;
  mono: string;
}

export interface NavigationConfig {
  items: NavItem[];
  position: 'top' | 'side';
  sticky: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
}

export interface AIGenerationRequest {
  type: 'title' | 'description' | 'content';
  context: string;
  tone?: 'professional' | 'casual' | 'creative';
  length?: 'short' | 'medium' | 'long';
}

export interface AIGenerationResponse {
  content: string;
  suggestions: string[];
}

export interface SheetData {
  pages: Page[];
  navigation: NavItem[];
  settings: SiteSettings;
}
