# Google Sheets CMS Integration Guide

## Overview

This document explains the complete Google Sheets integration for the Website Builder Enterprise system. The integration uses Google Sheets as a serverless database with Google Apps Script to provide a REST API interface.

## Architecture

### Backend (Google Sheets + Apps Script)

**Google Sheet: "WEBSITE CONTENT"** (ID: `18TSFU3FCicBTOW7Uqr74L-mLJmATulOtqJKsPJdQefg`)

The Google Sheet contains three main tabs:

1. **Pages Tab**
   - Headers: id, title, slug, description, elements, seo, published, createdAt, updatedAt
   - Stores all page content and metadata
   - Each row represents one published page

2. **Navigation Tab**
   - Headers: id, label, href, parentId, order
   - Defines site navigation structure
   - Supports nested menus through parentId

3. **Settings Tab**
   - Headers: key, value, type
   - Stores site configuration
   - Supports theme, colors, fonts, and other settings

### Apps Script API Deployment

**Project: "Sheets CMS API"** (Script ID: `1_DXqaANVmWcWABj6VU6XRNxQ_OhjqGDs4QgWs4i2GoVwuTth4JHm8E3i`)

**Deployment URL**: `https://script.google.com/macros/d/{DEPLOYMENT_ID}/usercallable`

**Authentication**: Bearer token in Authorization header
- API Key: `sheets-cms-secret-key-2026`

## API Endpoints

All requests are POST requests with JSON body containing an `action` field.

### Pages Endpoints

#### Get All Pages
```json
{
  "action": "getPages"
}
```
Returns: `{ pages: Page[] }`

#### Get Single Page
```json
{
  "action": "getPage",
  "slug": "about-us"
}
```
Returns: `{ page: Page }`

#### Create Page
```json
{
  "action": "createPage",
  "page": {
    "id": "page_1234567890",
    "title": "New Page",
    "slug": "new-page",
    "description": "Page description",
    "elements": [],
    "seo": {},
    "published": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```
Returns: `{ page: Page }`

#### Update Page
```json
{
  "action": "updatePage",
  "id": "page_1234567890",
  "updates": {
    "title": "Updated Title",
    "elements": []
  }
}
```
Returns: `{ page: Page }`

#### Delete Page
```json
{
  "action": "deletePage",
  "id": "page_1234567890"
}
```
Returns: `{ success: boolean }`

### Navigation Endpoints

#### Get Navigation
```json
{
  "action": "getNavigation"
}
```
Returns: `{ navigation: NavItem[] }`

#### Update Navigation
```json
{
  "action": "updateNavigation",
  "navigation": [
    {
      "id": "nav_1",
      "label": "Home",
      "href": "/",
      "parentId": null,
      "order": 0
    }
  ]
}
```
Returns: `{ navigation: NavItem[] }`

### Settings Endpoints

#### Get Settings
```json
{
  "action": "getSettings"
}
```
Returns: `{ settings: SiteSettings }`

#### Update Settings
```json
{
  "action": "updateSettings",
  "settings": {
    "theme": { "name": "default", "mode": "light" },
    "colors": { "primary": "#000", "secondary": "#fff" },
    "fonts": { "heading": "Arial", "body": "Helvetica" },
    "navigation": { "position": "top", "sticky": true }
  }
}
```
Returns: `{ settings: SiteSettings }`

### Bulk Operations

#### Get All Data
```json
{
  "action": "getAllData"
}
```
Returns: `{ pages: Page[], navigation: NavItem[], settings: SiteSettings }`

#### Sync Data
```json
{
  "action": "syncData",
  "data": {
    "pages": [],
    "navigation": [],
    "settings": {}
  }
}
```
Returns: `{ success: boolean }`

## Frontend Integration

### SheetsClient

The `src/api/sheetsClient.ts` file provides a TypeScript client for all API operations:

```typescript
import { sheetsClient } from '@/api/sheetsClient';

// Fetch all pages
const pages = await sheetsClient.getPages();

// Create new page
const newPage = await sheetsClient.createPage({
  title: 'New Page',
  slug: 'new-page',
  description: 'Page description',
  elements: [],
  seo: {},
  published: false
});

// Update page
await sheetsClient.updatePage(pageId, { title: 'Updated Title' });

// Delete page
await sheetsClient.deletePage(pageId);

// Get page navigation
const nav = await sheetsClient.getNavigation();

// Update navigation
await sheetsClient.updateNavigation(navigationItems);

// Get settings
const settings = await sheetsClient.getSettings();

// Update settings
await sheetsClient.updateSettings(newSettings);
```

### Zustand Store

The `src/store/pageStore.ts` provides state management:

```typescript
import { usePageStore } from '@/store/pageStore';

function MyComponent() {
  const { pages, currentPage, updatePage, selectPage } = usePageStore();
  
  useEffect(() => {
    usePageStore.getState().fetchPages();
  }, []);
  
  return (
    <div>
      {pages.map(page => (
        <button onClick={() => selectPage(page.id)}>
          {page.title}
        </button>
      ))}
    </div>
  );
}
```

## Configuration

### Environment Variables

Required environment variables in `.env.local`:

```env
# Google Sheets API Configuration
NEXT_PUBLIC_SHEETS_API_URL=https://script.google.com/macros/d/{YOUR_DEPLOYMENT_ID}/usercallable
SHEETS_API_KEY=sheets-cms-secret-key-2026
NEXT_PUBLIC_SHEETS_ID=18TSFU3FCicBTOW7Uqr74L-mLJmATulOtqJKsPJdQefg
```

## Data Types

### Page
```typescript
interface Page {
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
```

### PageElement
```typescript
interface PageElement {
  id: string;
  type: 'text' | 'button' | 'image' | 'heading' | 'section' | 'container';
  content: string;
  styles: Record<string, any>;
  props: Record<string, any>;
  children?: PageElement[];
}
```

### NavItem
```typescript
interface NavItem {
  id: string;
  label: string;
  href: string;
  parentId?: string;
  order?: number;
  children?: NavItem[];
}
```

### SiteSettings
```typescript
interface SiteSettings {
  theme: ThemeConfig;
  colors: ColorScheme;
  fonts: FontConfig;
  navigation: NavigationConfig;
}
```

## Error Handling

All API calls include error handling and logging:

```typescript
try {
  const pages = await sheetsClient.getPages();
} catch (error) {
  console.error('Error fetching pages:', error);
  // Error is automatically caught and logged
  // Empty array is returned on error
}
```

## Real-Time Sync

The Zustand store tracks `isDirty` state to identify unsaved changes:

```typescript
const { isDirty, updatePage } = usePageStore();

if (isDirty) {
  // Show unsaved changes indicator
}

// Auto-save functionality
useEffect(() => {
  const timer = setTimeout(() => {
    if (isDirty) {
      updatePage(currentPage.id, currentPage);
    }
  }, 2000);
  return () => clearTimeout(timer);
}, [isDirty]);
```

## Advantages

1. **Serverless**: No backend server required
2. **Scalable**: Google infrastructure handles scaling
3. **Cost-Effective**: No server costs, pay per usage
4. **Collaborative**: Built-in Google Sheets collaboration
5. **Audit Trail**: Google Sheets version history
6. **Easy Backup**: Automatic Google Drive backups
7. **Simple API**: Easy to understand and extend

## Limitations and Solutions

1. **Cell Size Limit (50KB)**
   - Solution: Compress JSON or split large elements

2. **Rate Limiting**
   - Solution: Implement client-side caching and throttling

3. **No Transactions**
   - Solution: Use optimistic updates with rollback

## Future Enhancements

- [ ] Implement WebSocket for real-time updates
- [ ] Add batch operations for better performance
- [ ] Support for media library in Google Drive
- [ ] Advanced permissions and team collaboration
- [ ] Analytics and usage tracking
- [ ] Automated backups and recovery

## Support

For issues or questions about the Sheets integration, refer to:
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)
- Project README.md
