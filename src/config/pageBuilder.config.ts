// Page Builder Configuration
// Comprehensive configuration for page generation, editing, and removal

export interface PageComponent {
  id: string
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'form' | 'gallery' | 'video' | 'custom'
  props: Record<string, any>
  children?: PageComponent[]
  styles?: Record<string, string>
}

export interface PageSection {
  id: string
  name: string
  components: PageComponent[]
  order: number
  visible: boolean
}

export interface Page {
  id: string
  title: string
  slug: string
  description: string
  thumbnail?: string
  sections: PageSection[]
  metadata: {
    createdAt: string
    updatedAt: string
    author?: string
    keywords?: string[]
    ogImage?: string
  }
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
  visibility: 'draft' | 'published' | 'archived'
}

export const DEFAULT_COMPONENT_STYLES = {
  heading: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#000',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '16px',
    color: '#333',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#3366cc',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}

export const COMPONENT_TYPES = [
  { id: 'heading', name: 'Heading', icon: '📝' },
  { id: 'paragraph', name: 'Paragraph', icon: '📄' },
  { id: 'image', name: 'Image', icon: '🖼️' },
  { id: 'button', name: 'Button', icon: '🔘' },
  { id: 'form', name: 'Form', icon: '📋' },
  { id: 'gallery', name: 'Gallery', icon: '🎨' },
  { id: 'video', name: 'Video', icon: '🎥' },
]

export const PAGE_BUILDER_CONFIG = {
  maxSections: 50,
  maxComponentsPerSection: 100,
  maxPageSize: 10485760, // 10MB
  enableAutoSave: true,
  autoSaveInterval: 10000, // 10 seconds
  enableVersioning: true,
  maxVersions: 20,
  enableCollaboration: true,
  enableAIGeneration: true,
  frameworksSupported: ['vite', 'react', 'next.js'],
}
