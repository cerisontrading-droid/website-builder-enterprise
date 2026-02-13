# Setup Guide - Website Builder Enterprise with Google Sheets

## Complete Setup Instructions

This guide walks you through setting up the Website Builder Enterprise system with Google Sheets integration.

## Prerequisites

- Node.js 18+
- npm or yarn
- Google Account
- Git

## Step 1: Backend Setup (Google Sheets + Apps Script)

### 1.1 Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "WEBSITE CONTENT"
3. Copy the Spreadsheet ID from the URL
4. Set up three sheets:

**Sheet 1: Pages**
- Headers: id, title, slug, description, elements, seo, published, createdAt, updatedAt
- Row 1 should contain these headers

**Sheet 2: Navigation**
- Headers: id, label, href, parentId, order

**Sheet 3: Settings**
- Headers: key, value, type
- Sample row: theme, default, string

### 1.2 Create Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project named "Sheets CMS API"
3. Replace the code in Code.gs with the REST API implementation
4. The API should handle these actions:
   - getPages
   - getPage
   - createPage
   - updatePage
   - deletePage
   - getNavigation
   - updateNavigation
   - getSettings
   - updateSettings
   - getAllData
   - syncData

### 1.3 Deploy Apps Script

1. Click "Deploy" → "New Deployment"
2. Select type: "Web app"
3. Execute as: Your account
4. Who has access: "Anyone"
5. Copy the deployment URL
6. Note the Deployment ID from the URL

## Step 2: Frontend Setup

### 2.1 Clone Repository

```bash
git clone https://github.com/cerisontrading-droid/website-builder-enterprise.git
cd website-builder-enterprise
```

### 2.2 Install Dependencies

```bash
npm install
```

### 2.3 Configure Environment Variables

Create `.env.local` file:

```env
# Google Sheets Configuration
NEXT_PUBLIC_SHEETS_API_URL=https://script.google.com/macros/d/{YOUR_DEPLOYMENT_ID}/usercallable
SHEETS_API_KEY=sheets-cms-secret-key-2026
NEXT_PUBLIC_SHEETS_ID=YOUR_SPREADSHEET_ID

# OpenAI (Optional for AI features)
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-key-here

# Application
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_NAME="Website Builder Enterprise"
```

### 2.4 Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 3: Verification

### 3.1 Test Sheets Connection

1. Open browser console (F12)
2. In the console, test the client:

```javascript
import { sheetsClient } from './src/api/sheetsClient';
await sheetsClient.getPages();
```

### 3.2 Create Test Page

1. Navigate to Pages section
2. Click "Create New Page"
3. Fill in:
   - Title: "Test Page"
   - Slug: "test-page"
   - Description: "Test description"
4. Click "Save"
5. Verify data appears in Google Sheet

## Step 4: Project Structure

```
website-builder-enterprise/
├── src/
│   ├── api/
│   │   └── sheetsClient.ts          # Google Sheets API client
│   ├── store/
│   │   └── pageStore.ts             # Zustand state management
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── components/                  # React components (to be added)
│   ├── hooks/                       # Custom hooks (to be added)
│   └── styles/                      # Global styles (to be added)
├── package.json                     # Dependencies
├── next.config.js                   # Next.js config
├── tsconfig.json                    # TypeScript config
├── .env.example                     # Environment variables template
├── README.md                        # Project overview
└── SHEETS_INTEGRATION.md            # Detailed Sheets integration guide
```

## Step 5: Development Workflow

### 5.1 Making Changes

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes to the code

3. Test locally:
```bash
npm run dev
```

### 5.2 Building for Production

```bash
npm run build
npm run start
```

## Step 6: Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set environment variables:
   - NEXT_PUBLIC_SHEETS_API_URL
   - SHEETS_API_KEY
   - NEXT_PUBLIC_SHEETS_ID
6. Click "Deploy"

### Option 2: Self-Hosted

1. Build the project:
```bash
npm run build
```

2. Deploy to your server:
```bash
npm run start
```

3. Use a process manager like PM2:
```bash
pm2 start npm -- start
```

## Step 7: Troubleshooting

### Issue: "Failed to fetch pages"

**Solution:**
1. Check environment variables are set
2. Verify Apps Script deployment URL is correct
3. Check browser console for detailed error
4. Ensure Google Sheet shares are set correctly

### Issue: "Permission Denied"

**Solution:**
1. Verify API key is correct
2. Check Apps Script "Who has access" is set to "Anyone"
3. Ensure the deployed version is the latest

### Issue: "404 Not Found on deployment URL"

**Solution:**
1. Re-deploy the Apps Script
2. Copy the new Deployment ID
3. Update NEXT_PUBLIC_SHEETS_API_URL
4. Restart the Next.js application

## Step 8: Next Steps

After successful setup:

1. **Add UI Components**: Create page builder UI components
2. **Implement Drag-Drop**: Add drag-and-drop editor functionality
3. **Add Real-Time Preview**: Build live preview component
4. **AI Integration**: Connect OpenAI for content generation
5. **Multi-Site Support**: Extend for managing multiple websites
6. **Authentication**: Implement user authentication
7. **Analytics**: Add usage tracking and analytics

## Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Apps Script Guide](https://developers.google.com/apps-script/guides)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## Support

For issues or questions:
1. Check the [SHEETS_INTEGRATION.md](./SHEETS_INTEGRATION.md) for detailed API documentation
2. Review the [README.md](./README.md) for project overview
3. Open an issue on GitHub with detailed error information

---

**Last Updated**: 2024
**Project**: Website Builder Enterprise
**Status**: Ready for development
