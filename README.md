# DevBox

A modern, fast, and beautiful web application that provides essential developer tools in one place. DevBox is designed to be your daily companion for development tasks.

![DevBox](https://img.shields.io/badge/DevBox-v1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.7-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.3-38B2AC)

## Vision

DevBox is a beautiful, fast, and lightweight web application that provides essential developer tools in one place. It's designed to feel like a real product that developers would bookmark and use every day.

## Features

- **Fast**: Built with Vite for lightning-fast development and optimized production builds
- **Clean**: Minimal, clutter-free interface focusing on essential functionality
- **Responsive**: Works seamlessly across desktop, tablet, and mobile devices
- **Minimal**: No unnecessary bloat - just the tools you need
- **Beautiful**: Modern SaaS dashboard design inspired by Linear, Vercel, and Raycast
- **Modular**: Easy to extend with new tools and features
- **Production-ready**: Built with industry best practices and modern tooling

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Code Quality**: ESLint, Prettier

## Tools Available

- Dashboard
- JSON Formatter
- JSON Validator
- Base64 Encoder/Decoder
- Password Generator
- UUID Generator
- Hash Generator
- Regex Tester
- Markdown Preview
- Settings

## Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/devbox.git
cd devbox
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format
```

### Project Structure

```
DevBox/
├── src/
│   ├── app/              # Application setup and routing
│   ├── components/       # Reusable components
│   │   ├── ui/          # shadcn/ui components
│   │   └── layout/      # Layout components (Sidebar, Navbar, Footer)
│   ├── pages/           # Page components
│   ├── tools/           # Tool implementations
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── assets/          # Static assets
│   └── styles/          # Global styles
├── public/              # Public assets
├── docs/                # Documentation
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Design Philosophy

DevBox follows modern SaaS dashboard design principles:

- **Inspired by the best**: Design cues from Linear, Vercel, Raycast, Clerk, and Stripe Dashboard
- **Dark mode by default**: Optimized for developers who prefer dark themes
- **Light mode support**: Seamless theme switching
- **Rounded corners**: Soft, modern UI elements
- **Soft shadows**: Subtle depth and hierarchy
- **Excellent spacing**: Clean, breathable layouts
- **Smooth transitions**: Polished micro-interactions
- **Clean typography**: Professional and readable
- **Professional color palette**: Cohesive color system

## Code Quality

We maintain high code quality standards:

- **Component-based architecture**: Modular, reusable components
- **Strict TypeScript**: Full type safety
- **No duplicated code**: DRY principle throughout
- **No inline styles**: Consistent styling approach
- **Proper naming conventions**: Clear, descriptive names
- **Small components**: Focused, maintainable units
- **ESLint**: Linting with recommended rules
- **Prettier**: Consistent code formatting

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure all tests pass

## Roadmap

- [ ] Complete tool implementations
- [ ] Add more developer tools
- [ ] Implement user authentication
- [ ] Add tool history/saved configurations
- [ ] Create API for programmatic access
- [ ] Add keyboard shortcuts
- [ ] Implement offline support
- [ ] Add more theme options

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from Linear, Vercel, Raycast, Clerk, and Stripe
- Built with amazing open-source tools
- Icons by Lucide

## Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourusername](https://twitter.com/yourusername)
- Email: dev@devbox.io

---

Made with ❤️ by the DevBox team