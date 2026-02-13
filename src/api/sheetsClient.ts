import axios, { AxiosInstance } from 'axios';
import { Page, NavItem, SiteSettings, SheetData } from '@/types';

class SheetsClient {
  private client: AxiosInstance;
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_SHEETS_API_URL || '';
    this.apiKey = process.env.SHEETS_API_KEY || 'sheets-cms-secret-key-2026';

    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Pages API
  async getPages(): Promise<Page[]> {
    try {
      const response = await this.client.post('/', {
        action: 'getPages',
      });
      return response.data.pages || [];
    } catch (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
  }

  async getPage(slug: string): Promise<Page | null> {
    try {
      const response = await this.client.post('/', {
        action: 'getPage',
        slug,
      });
      return response.data.page || null;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }

  async createPage(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page | null> {
    try {
      const response = await this.client.post('/', {
        action: 'createPage',
        page: {
          ...page,
          id: `page_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
      return response.data.page || null;
    } catch (error) {
      console.error('Error creating page:', error);
      return null;
    }
  }

  async updatePage(id: string, updates: Partial<Page>): Promise<Page | null> {
    try {
      const response = await this.client.post('/', {
        action: 'updatePage',
        id,
        updates: {
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      });
      return response.data.page || null;
    } catch (error) {
      console.error('Error updating page:', error);
      return null;
    }
  }

  async deletePage(id: string): Promise<boolean> {
    try {
      await this.client.post('/', {
        action: 'deletePage',
        id,
      });
      return true;
    } catch (error) {
      console.error('Error deleting page:', error);
      return false;
    }
  }

  // Navigation API
  async getNavigation(): Promise<NavItem[]> {
    try {
      const response = await this.client.post('/', {
        action: 'getNavigation',
      });
      return response.data.navigation || [];
    } catch (error) {
      console.error('Error fetching navigation:', error);
      return [];
    }
  }

  async updateNavigation(navigation: NavItem[]): Promise<NavItem[]> {
    try {
      const response = await this.client.post('/', {
        action: 'updateNavigation',
        navigation,
      });
      return response.data.navigation || navigation;
    } catch (error) {
      console.error('Error updating navigation:', error);
      return navigation;
    }
  }

  // Settings API
  async getSettings(): Promise<SiteSettings | null> {
    try {
      const response = await this.client.post('/', {
        action: 'getSettings',
      });
      return response.data.settings || null;
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  }

  async updateSettings(settings: SiteSettings): Promise<SiteSettings | null> {
    try {
      const response = await this.client.post('/', {
        action: 'updateSettings',
        settings,
      });
      return response.data.settings || null;
    } catch (error) {
      console.error('Error updating settings:', error);
      return null;
    }
  }

  // Bulk Operations
  async getAllData(): Promise<SheetData | null> {
    try {
      const response = await this.client.post('/', {
        action: 'getAllData',
      });
      return response.data || null;
    } catch (error) {
      console.error('Error fetching all data:', error);
      return null;
    }
  }

  async syncData(data: SheetData): Promise<boolean> {
    try {
      await this.client.post('/', {
        action: 'syncData',
        data,
      });
      return true;
    } catch (error) {
      console.error('Error syncing data:', error);
      return false;
    }
  }
}

export const sheetsClient = new SheetsClient();
export default SheetsClient;
