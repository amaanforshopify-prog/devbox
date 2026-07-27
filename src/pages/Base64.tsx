import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCode } from 'lucide-react';

export function Base64() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Base64</h1>
        <p className="text-muted-foreground">Encode and decode Base64 strings</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-purple-500" />
            <CardTitle>Coming Soon</CardTitle>
          </div>
          <CardDescription>
            This tool is currently under development. Check back later for updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The Base64 tool will allow you to encode and decode Base64 strings quickly and easily.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}