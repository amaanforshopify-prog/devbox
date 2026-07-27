import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hash } from 'lucide-react';

export function UuidGenerator() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">UUID Generator</h1>
        <p className="text-muted-foreground">Generate unique identifiers</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-cyan-500" />
            <CardTitle>Coming Soon</CardTitle>
          </div>
          <CardDescription>
            This tool is currently under development. Check back later for updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The UUID Generator will create unique identifiers (UUIDs) in various formats.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}