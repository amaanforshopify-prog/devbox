import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className={cn("h-5 w-5 text-gray-500")} />
            <CardTitle>Coming Soon</CardTitle>
          </div>
          <CardDescription>
            This tool is currently under development. Check back later for updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The Settings page will allow you to customize your DevBox experience with various preferences.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}