# DevBox - Agent Documentation

## Project Overview

DevBox is a modern, fast, and beautiful web application that provides essential developer tools in one place. Built with React 19, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 6.0.2
- **Build Tool**: Vite 8.1.1
- **Styling**: Tailwind CSS 4.3.3 with @tailwindcss/postcss
- **Routing**: React Router 7.18.1
- **UI Components**: Custom shadcn/ui-inspired components
- **Icons**: Lucide React 1.27.0
- **Code Quality**: ESLint 10.8.0, Prettier 3.9.6

## Available Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:5173

# Build
npm run build        # Build for production (TypeScript + Vite)
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## Project Structure

```
DevBox/
├── src/
│   ├── app/              # Application setup and routing
│   │   └── App.tsx      # Main app with routing configuration
│   ├── components/       # Reusable components
│   │   ├── ui/          # UI components (Button, Card, Input)
│   │   └── layout/      # Layout components (Sidebar, Navbar, Footer, ThemeProvider)
│   ├── pages/           # Page components for each tool
│   ├── tools/           # Tool implementations (empty - future)
│   ├── hooks/           # Custom React hooks
│   │   └── use-theme.ts # Theme management hook
│   ├── lib/             # Utility functions
│   │   └── utils.ts     # cn() utility for class merging
│   ├── types/           # TypeScript type definitions
│   │   └── navigation.ts # Navigation configuration
│   ├── assets/          # Static assets
│   └── styles/          # Global styles
├── public/              # Public assets
├── docs/                # Documentation
├── package.json
├── vite.config.ts       # Vite configuration with path aliases
├── tsconfig.json        # TypeScript configuration
├── tsconfig.app.json    # App-specific TypeScript config
├── tsconfig.node.json   # Node-specific TypeScript config
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
└── README.md            # Project documentation
```

## Key Features

### Architecture
- Component-based architecture with React 19
- Type-safe with strict TypeScript
- Path aliases configured (@/* maps to ./src/*)
- Modular, reusable components
- Clean separation of concerns

### UI/UX
- Modern SaaS dashboard design
- Dark mode by default with system preference detection
- Light mode support with manual toggle
- Responsive design
- Clean typography and spacing
- Professional color palette

### Navigation
The application includes navigation for:
- Dashboard
- JSON Formatter
- JSON Validator
- Base64
- Password Generator
- UUID Generator
- Hash Generator
- Regex Tester
- Markdown Preview
- Settings

### Components
- **Button**: Variants (default, destructive, outline, secondary, ghost, link)
- **Card**: Container components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- **Input**: Form input with proper styling
- **Sidebar**: Fixed left navigation with active state
- **Navbar**: Top navigation with search and theme toggle
- **Footer**: Simple footer with social links
- **ThemeProvider**: Context-based theme management

## Configuration Details

### TypeScript
- Strict mode enabled
- Path aliases: `@/*` → `./src/*`
- No unused variables/parameters
- verbatimModuleSyntax for proper imports
- ignoreDeprecations: "6.0" for baseUrl compatibility

### Tailwind CSS
- Using Tailwind CSS v4 with @tailwindcss/postcss
- Theme colors defined in @theme directive
- Dark mode with class strategy
- System preference detection via media query

### Vite
- Path aliases configured
- React plugin for fast refresh
- Optimized for production builds

### ESLint
- TypeScript recommended rules
- React hooks rules
- Prettier integration
- Custom unused variable rules with underscore pattern

### Prettier
- Semicolons enabled
- Single quotes
- 100 character line width
- 2 space indentation
- LF line endings

## Development Guidelines

### Adding New Tools
1. Create page component in `src/pages/`
2. Add route in `src/app/App.tsx`
3. Add navigation item in `src/types/navigation.ts`
4. Implement tool logic in `src/tools/` (when ready)

### Component Guidelines
- Keep components small and focused
- Use TypeScript strictly
- Follow existing patterns
- Use the `cn()` utility for class merging
- Prefer composition over inheritance

### Styling Guidelines
- Use Tailwind utility classes
- Follow the existing color system
- Maintain consistency with existing components
- Ensure dark mode compatibility

## Current Status

### Completed
- ✅ Project foundation with React + TypeScript + Vite
- ✅ Tailwind CSS v4 configuration
- ✅ Basic UI components (Button, Card, Input)
- ✅ Layout components (Sidebar, Navbar, Footer)
- ✅ Theme provider with dark/light mode
- ✅ React Router configuration
- ✅ Placeholder pages for all tools
- ✅ ESLint and Prettier configuration
- ✅ Path aliases setup
- ✅ Production build working

### In Progress
- None

### Future Work
- Implement actual tool functionality
- Add more UI components as needed
- Optimize bundle size (code splitting)
- Add testing infrastructure
- Add CI/CD pipeline
- Implement user authentication
- Add tool history/saved configurations

## Common Issues & Solutions

### Build Issues
- If Tailwind CSS v4 errors occur, ensure @tailwindcss/postcss is installed
- For TypeScript path issues, verify tsconfig.app.json has proper baseUrl and paths
- If build fails, run `npm run build` to see detailed errors

### Development Issues
- If dev server doesn't start, try clearing node_modules and reinstalling
- For hot reload issues, check Vite configuration
- Theme switching requires localStorage to be available

## Notes

- The project uses Tailwind CSS v4 which has a different configuration approach than v3
- Icons are from Lucide React - check available icons before using
- The build produces warnings about chunk size - this is expected for the foundation phase
- All tool pages currently show "Coming Soon" placeholders
- The application defaults to dark mode based on system preference