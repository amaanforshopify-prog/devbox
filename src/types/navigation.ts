export interface NavItem {
  title: string;
  href: string;
  icon: string;
  description?: string;
}

export const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "LayoutDashboard",
    description: "Overview and quick access to tools"
  },
  {
    title: "JSON Formatter",
    href: "/json-formatter",
    icon: "Code",
    description: "Format and beautify JSON data"
  },
  {
    title: "JSON Validator",
    href: "/json-validator",
    icon: "CheckCircle",
    description: "Validate JSON syntax and structure"
  },
  {
    title: "Base64",
    href: "/base64",
    icon: "FileCode",
    description: "Encode and decode Base64 strings"
  },
  {
    title: "Password Generator",
    href: "/password-generator",
    icon: "Key",
    description: "Generate secure random passwords"
  },
  {
    title: "UUID Generator",
    href: "/uuid-generator",
    icon: "Hash",
    description: "Generate unique identifiers"
  },
  {
    title: "Hash Generator",
    href: "/hash-generator",
    icon: "Lock",
    description: "Create cryptographic hashes"
  },
  {
    title: "Regex Tester",
    href: "/regex-tester",
    icon: "Search",
    description: "Test and debug regular expressions"
  },
  {
    title: "Markdown Preview",
    href: "/markdown-preview",
    icon: "FileText",
    description: "Preview and render Markdown"
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
    description: "Application preferences"
  }
];