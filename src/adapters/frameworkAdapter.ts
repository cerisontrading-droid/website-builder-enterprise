// Framework Adapter for multi-framework support
// Supports: Vite, React, Next.js

export type FrameworkType = 'vite' | 'react' | 'next'

export interface FrameworkConfig {
  framework: FrameworkType
  buildCommand: string
  devCommand: string
  outputDir: string
  publicDir: string
  sourceDir: string
  entryPoint: string
}

export interface PageExportConfig {
  format: 'jsx' | 'tsx' | 'html'
  includeStyles: boolean
  minify: boolean
  sourceMap: boolean
}

export class FrameworkAdapter {
  private framework: FrameworkType
  private config: FrameworkConfig

  constructor(framework: FrameworkType) {
    this.framework = framework
    this.config = this.getFrameworkConfig(framework)
  }

  getFrameworkConfig(framework: FrameworkType): FrameworkConfig {
    const configs: Record<FrameworkType, FrameworkConfig> = {
      vite: {
        framework: 'vite',
        buildCommand: 'vite build',
        devCommand: 'vite',
        outputDir: 'dist',
        publicDir: 'public',
        sourceDir: 'src',
        entryPoint: 'src/main.tsx',
      },
      react: {
        framework: 'react',
        buildCommand: 'vite build',
        devCommand: 'vite',
        outputDir: 'dist',
        publicDir: 'public',
        sourceDir: 'src',
        entryPoint: 'src/App.tsx',
      },
      next: {
        framework: 'next',
        buildCommand: 'next build',
        devCommand: 'next dev',
        outputDir: '.next',
        publicDir: 'public',
        sourceDir: 'pages',
        entryPoint: 'pages/_app.tsx',
      },
    }
    return configs[framework]
  }

  async exportPageAsComponent(pageId: string, exportConfig: PageExportConfig): Promise<string> {
    // Generate framework-specific component code
    const componentCode = this.generateComponent(pageId, exportConfig)
    return componentCode
  }

  private generateComponent(pageId: string, config: PageExportConfig): string {
    if (this.framework === 'next') {
      return this.generateNextJsComponent(pageId, config)
    } else if (this.framework === 'react' || this.framework === 'vite') {
      return this.generateReactComponent(pageId, config)
    }
    return ''
  }

  private generateReactComponent(pageId: string, config: PageExportConfig): string {
    return `import React from 'react';

export const ${this.toPascalCase(pageId)}: React.FC = () => {
  return (
    <div className="page-${pageId}">
      {/* Page content for ${pageId} */}
    </div>
  );
};

export default ${this.toPascalCase(pageId)};`
  }

  private generateNextJsComponent(pageId: string, config: PageExportConfig): string {
    return `import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="page-${pageId}">
      {/* Page content for ${pageId} */}
    </div>
  );
};

export default Page;`
  }

  private toPascalCase(str: string): string {
    return str
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }
}

export default FrameworkAdapter
