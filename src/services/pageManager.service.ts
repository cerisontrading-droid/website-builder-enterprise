import { Page, PageSection, PageComponent } from '../config/pageBuilder.config'
import { SheetsClient } from '../api/sheetsClient'

export class PageManagerService {
  private sheetsClient: SheetsClient
  private pages: Map<string, Page> = new Map()
  private pageHistory: Map<string, Page[]> = new Map()

  constructor(sheetsClient: SheetsClient) {
    this.sheetsClient = sheetsClient
  }

  async generatePage(title: string, siteId: string, template?: string): Promise<Page> {
    const pageId = `page_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const slug = this.generateSlug(title)

    const page: Page = {
      id: pageId,
      title,
      slug,
      description: '',
      sections: template ? this.getTemplateStructure(template) : [],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: 'system',
      },
      seo: {
        title: title,
        description: '',
        keywords: [],
      },
      visibility: 'draft',
    }

    this.pages.set(pageId, page)
    this.pageHistory.set(pageId, [page])
    
    await this.sheetsClient.createPage({ siteId, ...page })
    return page
  }

  async updatePageContent(pageId: string, sections: PageSection[]): Promise<Page> {
    const page = this.pages.get(pageId)
    if (!page) throw new Error('Page not found')

    page.sections = sections
    page.metadata.updatedAt = new Date().toISOString()
    
    const history = this.pageHistory.get(pageId) || []
    history.push({ ...page })
    this.pageHistory.set(pageId, history.slice(-20))

    await this.sheetsClient.updatePage(pageId, { sections, metadata: page.metadata })
    return page
  }

  async deletePage(pageId: string, siteId: string): Promise<void> {
    this.pages.delete(pageId)
    this.pageHistory.delete(pageId)
    await this.sheetsClient.deletePage(siteId, pageId)
  }

  async publishPage(pageId: string): Promise<Page> {
    const page = this.pages.get(pageId)
    if (!page) throw new Error('Page not found')

    page.visibility = 'published'
    page.metadata.updatedAt = new Date().toISOString()

    await this.sheetsClient.updatePage(pageId, { visibility: 'published', metadata: page.metadata })
    return page
  }

  async getPageHistory(pageId: string): Promise<Page[]> {
    return this.pageHistory.get(pageId) || []
  }

  async revertToVersion(pageId: string, versionIndex: number): Promise<Page> {
    const history = this.pageHistory.get(pageId)
    if (!history || !history[versionIndex]) throw new Error('Version not found')

    const version = { ...history[versionIndex] }
    this.pages.set(pageId, version)
    history.push(version)
    
    await this.sheetsClient.updatePage(pageId, version)
    return version
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  private getTemplateStructure(templateName: string): PageSection[] {
    const templates: Record<string, PageSection[]> = {
      landing: [
        { id: 'hero', name: 'Hero Section', components: [], order: 0, visible: true },
        { id: 'features', name: 'Features', components: [], order: 1, visible: true },
        { id: 'cta', name: 'Call to Action', components: [], order: 2, visible: true },
      ],
      blog: [
        { id: 'header', name: 'Header', components: [], order: 0, visible: true },
        { id: 'content', name: 'Content', components: [], order: 1, visible: true },
        { id: 'sidebar', name: 'Sidebar', components: [], order: 2, visible: true },
      ],
      product: [
        { id: 'showcase', name: 'Product Showcase', components: [], order: 0, visible: true },
        { id: 'features', name: 'Features', components: [], order: 1, visible: true },
        { id: 'pricing', name: 'Pricing', components: [], order: 2, visible: true },
      ],
    }
    return templates[templateName] || []
  }
}

export default PageManagerService
