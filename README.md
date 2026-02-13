# Website Builder Enterprise

An enterprise-grade, AI-powered website builder with instant generation, real-time drag-drop editor, multi-site management, and Google Sheets database integration.

## Features

- **AI-Powered Content Generation**: Instantly generate website content using OpenAI
- **Drag-Drop Page Builder**: Intuitive visual editor with real-time preview
- **Multi-Site Management**: Manage multiple websites from a single dashboard
- **Real-Time Preview**: See changes instantly as you build
- **Google Sheets Integration**: Use Google Sheets as your database
- **Enterprise-Grade Architecture**: Built with Next.js 16, TypeScript, and modern best practices
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **SEO Optimization**: Built-in SEO tools and best practices
- **Analytics Dashboard**: Track visitor metrics and performance
- **Collaborative Editing**: Work with team members in real-time

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit with beautiful-dnd
- **AI Integration**: OpenAI API
- **Database**: Google Sheets + Apps Script REST API
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Google Cloud Project with Sheets API enabled
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cerisontrading-droid/website-builder-enterprise.git
cd website-builder-enterprise
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- `NEXT_PUBLIC_SHEETS_API_URL`: Your Apps Script deployment URL
- `SHEETS_API_KEY`: Your API key
- `NEXT_PUBLIC_OPENAI_API_KEY`: Your OpenAI API key

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── store/           # Zustand state management
├── api/             # API client utilities
└── styles/          # Global styles
```

## Key Features Implementation

### 1. Page Builder
- Drag-and-drop components
- Real-time preview
- Undo/Redo functionality
- Component library

### 2. AI Content Generation
- Auto-generate page titles
- Auto-generate descriptions
- AI-powered content suggestions
- SEO optimization hints

### 3. Multi-Site Management
- Create and manage multiple websites
- Independent configurations per site
- Shared component library
- Bulk operations

### 4. Google Sheets Integration
- Real-time data sync
- Automatic backups
- Collaborative editing through Sheets
- Custom formula support

## API Reference

### Sheets CMS API

The backend uses Google Apps Script to provide REST endpoints:

- `GET /pages` - List all pages
- `POST /pages` - Create new page
- `PUT /pages/{id}` - Update page
- `DELETE /pages/{id}` - Delete page
- `GET /navigation` - Get site navigation
- `PUT /navigation` - Update navigation
- `GET /settings` - Get site settings
- `PUT /settings` - Update settings

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Self-Hosted

```bash
npm run build
npm run start
```

## Configuration

### Feature Flags

Toggle features in `.env.local`:

- `NEXT_PUBLIC_ENABLE_AI_GENERATION` - Enable AI features
- `NEXT_PUBLIC_ENABLE_DRAG_DROP` - Enable drag-drop editor
- `NEXT_PUBLIC_ENABLE_MULTI_SITE` - Enable multi-site
- `NEXT_PUBLIC_ENABLE_REAL_TIME_PREVIEW` - Enable live preview

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ by Cerisontrading Droid**
