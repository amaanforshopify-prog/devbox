import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import { useToast } from '@/components/ui/toast';
import { PasswordEditor } from './components/PasswordEditor';
import { PasswordControls } from './components/PasswordControls';
import { PasswordStrength } from './components/PasswordStrength';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, AlertCircle } from 'lucide-react';

export function PasswordToolkitPage() {
  const {
    state,
    options,
    setLength,
    toggleOption,
    handleGenerate,
    handleCopy,
    handleClear,
  } = usePasswordGenerator();

  const { showToast } = useToast();

  const handleCopyWithToast = async () => {
    const success = await handleCopy();
    if (success) {
      showToast('Password copied to clipboard', 'success');
    } else {
      showToast('Failed to copy password', 'error');
    }
  };

  const handleRegenerateWithToast = () => {
    handleGenerate();
    showToast('Generated new password', 'success');
  };

  const handleClearWithToast = () => {
    handleClear();
    showToast('Cleared password', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Password Generator</h1>
        <p className="text-muted-foreground">
          Generate cryptographically secure, random passwords with custom parameters
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-orange-500" />
              <CardTitle>Password Generator</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>Web Crypto API</span>
            </div>
          </div>
          <CardDescription>
            Customize your security options below and instantly copy your generated password.
          </CardDescription>
          {state.error && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive mt-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <PasswordEditor
            password={state.password}
            onCopy={handleCopyWithToast}
            onRegenerate={handleRegenerateWithToast}
            onClear={handleClearWithToast}
            isProcessing={state.isProcessing}
          />

          <PasswordStrength strength={state.strength} />

          <PasswordControls
            options={options}
            onLengthChange={setLength}
            onToggleOption={toggleOption}
            onGenerate={handleRegenerateWithToast}
            isProcessing={state.isProcessing}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { PasswordToolkitPage as PasswordGeneratorPage };
