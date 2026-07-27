import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

export function RegexTester() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Regex Tester</h1>
        <p className="text-muted-foreground">Test and debug regular expressions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-indigo-500" />
            <CardTitle>Coming Soon</CardTitle>
          </div>
          <CardDescription>
            This tool is currently under development. Check back later for updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The Regex Tester will help you test and debug regular expressions with real-time matching.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}