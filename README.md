# Ventrai

AI-Powered Development Assistant

## Description

Ventrai is a comprehensive AI-powered development environment that provides an integrated workspace for coding, debugging, and collaboration. Built with modern web technologies, it offers a seamless experience for developers to build applications with AI assistance.

## Features

- **AI-Powered Code Assistance**: Integrated with multiple AI providers including OpenAI, Anthropic, Google Gemini, and more
- **Code Editor**: Advanced code editor with syntax highlighting, auto-completion, and multi-language support
- **Terminal Integration**: Built-in terminal for running commands and scripts
- **Git Integration**: Full Git support with GitHub and GitLab integration
- **WebContainer Support**: Run code in isolated containers
- **Multi-Platform**: Available as web app and desktop app (Electron)
- **MCP (Model Context Protocol)**: Support for various AI models and tools
- **Deployment**: Easy deployment to Vercel, Netlify, and other platforms

## Tech Stack

- **Frontend**: React, Remix, TypeScript
- **Styling**: Tailwind CSS, UnoCSS, SCSS
- **Code Editor**: CodeMirror
- **Terminal**: xterm.js
- **AI Integration**: Multiple providers (OpenAI, Anthropic, Google, etc.)
- **Backend**: Cloudflare Workers, Remix
- **Desktop**: Electron
- **Database**: Supabase (optional)
- **Deployment**: Cloudflare Pages, Docker

## Installation

### Prerequisites

- Node.js >= 18.18.0
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/venom001e/Ventrai-Web.git
cd ventrai
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

5. Start development server:
```bash
pnpm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# AI Provider API Keys (choose your preferred providers)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key
# ... other provider keys

# Optional: Supabase for data persistence
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Optional: GitHub/GitLab integration
GITHUB_TOKEN=your_github_token
GITLAB_TOKEN=your_gitlab_token
```

## Usage

### Web Version

```bash
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Desktop Version

```bash
pnpm run electron:dev
```

### Production Build

```bash
pnpm run build
pnpm run start
```

## Docker

### Development

```bash
pnpm run dockerbuild
pnpm run dockerrun
```

### Production

```bash
pnpm run dockerbuild:prod
```

## Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run test` - Run tests
- `pnpm run lint` - Lint code
- `pnpm run typecheck` - Type checking
- `pnpm run electron:dev` - Start Electron development
- `pnpm run electron:build:win` - Build Windows desktop app
- `pnpm run electron:build:mac` - Build macOS desktop app
- `pnpm run electron:build:linux` - Build Linux desktop app

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation in the `docs/` folder

## Acknowledgments

- Built with [Remix](https://remix.run/)
- Code editor powered by [CodeMirror](https://codemirror.net/)
- Terminal by [xterm.js](https://xtermjs.org/)
- Icons from [Phosphor Icons](https://phosphoricons.com/)