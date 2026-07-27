import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

export function JsonFormatter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">JSON Formatter</h1>
        <p className="text-muted-foreground">Format and beautify JSON data</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-500" />
            <CardTitle>Coming Soon</CardTitle>
          </div>
          <CardDescription>
            This tool is currently under development. Check back later for updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The JSON Formatter will allow you to format, beautify, and validate JSON data with ease.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}