import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, Zap, Shield, Code } from 'lucide-react';

export function Dashboard() {
  const tools = [
    { icon: LayoutDashboard, title: 'JSON Formatter', description: 'Format and beautify JSON data', color: 'text-blue-500' },
    { icon: Shield, title: 'JSON Validator', description: 'Validate JSON syntax and structure', color: 'text-green-500' },
    { icon: Code, title: 'Base64', description: 'Encode and decode Base64 strings', color: 'text-purple-500' },
    { icon: Zap, title: 'Password Generator', description: 'Generate secure random passwords', color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to DevBox - Your modern developer toolkit
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <Card key={tool.title} className="cursor-pointer transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tool.title}</CardTitle>
              <tool.icon className={`h-4 w-4 ${tool.color}`} />
            </CardHeader>
            <CardContent>
              <CardDescription>{tool.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Select a tool from the sidebar to get started with your development tasks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            DevBox provides essential developer tools in one place. All tools are designed to be fast,
            clean, and easy to use. Start exploring the tools from the left sidebar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}