// AI-Powered Content Generation Service
// Generates SEO-optimized content and metadata

export interface GenerationRequest {
  title: string
  topic?: string
  keywords?: string[]
  tone?: 'professional' | 'casual' | 'friendly' | 'technical'
  length?: 'short' | 'medium' | 'long'
  format?: 'markdown' | 'html' | 'plain'
}

export interface GeneratedContent {
  title: string
  description: string
  content: string
  keywords: string[]
  seoScore: number
  readingTime: number
  generatedAt: string
}

export class ContentGeneratorService {
  private openaiApiKey: string
  private rateLimitTracker: Map<string, number[]> = new Map()

  constructor(apiKey: string) {
    this.openaiApiKey = apiKey
  }

  async generateContent(request: GenerationRequest): Promise<GeneratedContent> {
    this.checkRateLimit()

    const prompt = this.buildPrompt(request)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) throw new Error('Content generation failed')

    const data = await response.json()
    const generatedText = data.choices[0].message.content

    return {
      title: request.title,
      description: this.extractDescription(generatedText),
      content: generatedText,
      keywords: request.keywords || [],
      seoScore: await this.calculateSEOScore(generatedText),
      readingTime: this.calculateReadingTime(generatedText),
      generatedAt: new Date().toISOString(),
    }
  }

  async generateMetadata(content: string, title: string): Promise<Record<string, string>> {
    const prompt = `Generate SEO metadata for this content. Return as JSON:
    - meta title (60 chars max)
    - meta description (160 chars max)
    - keywords (comma separated)
    
    Title: ${title}
    Content: ${content.substring(0, 500)}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 500,
      }),
    })

    if (!response.ok) throw new Error('Metadata generation failed')

    const data = await response.json()
    return JSON.parse(data.choices[0].message.content)
  }

  private buildPrompt(request: GenerationRequest): string {
    const length = {
      short: '150-300 words',
      medium: '300-600 words',
      long: '600-1200 words',
    }

    return `Generate ${request.format || 'markdown'} content with the following:
    Title: ${request.title}
    Topic: ${request.topic || request.title}
    Tone: ${request.tone || 'professional'}
    Length: ${length[request.length || 'medium']}
    Keywords to include: ${request.keywords?.join(', ') || 'none'}
    
    Content should be engaging, SEO-optimized, and structured well.`
  }

  private extractDescription(content: string): string {
    const lines = content.split('\n').filter(l => l.trim())
    return lines[0]?.substring(0, 160) || content.substring(0, 160)
  }

  private calculateSEOScore(content: string): number {
    let score = 50
    if (content.length > 300) score += 10
    if (content.includes('##') || content.includes('<h2>')) score += 10
    if (content.includes('**') || content.includes('<strong>')) score += 10
    if (content.split(/\s+/).length > 300) score += 10
    return Math.min(score, 100)
  }

  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  private checkRateLimit(): void {
    const now = Date.now()
    const oneHourAgo = now - 3600000
    const userId = 'default'

    const times = this.rateLimitTracker.get(userId) || []
    const recentRequests = times.filter(t => t > oneHourAgo)

    if (recentRequests.length >= 100) {
      throw new Error('Rate limit exceeded: 100 requests per hour')
    }

    recentRequests.push(now)
    this.rateLimitTracker.set(userId, recentRequests)
  }
}

export default ContentGeneratorService
