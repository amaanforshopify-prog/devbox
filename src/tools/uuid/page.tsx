import { useCallback } from 'react';
import { useUUIDGenerator } from './hooks/useUUIDGenerator';
import { useToast } from '@/components/ui/toast';
import { UUIDEditor } from './components/UUIDEditor';
import { UUIDControls } from './components/UUIDControls';
import { UUIDHistory } from './components/UUIDHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hash, AlertCircle } from 'lucide-react';

export function UUIDToolkitPage() {
  const {
    uuids,
    options,
    history,
    validationInput,
    validationResult,
    isProcessing,
    error,
    setQuantity,
    setUppercase,
    setHyphens,
    setValidationInput,
    handleGenerate,
    handleCopy,
    handleCopyAll,
    handleClear,
    handleClearHistory,
    handleDownload,
  } = useUUIDGenerator();

  const { showToast } = useToast();

  const handleGenerateWithToast = useCallback(() => {
    handleGenerate();
    showToast(`Generated ${options.quantity} UUID${options.quantity > 1 ? 's' : ''}`, 'success');
  }, [handleGenerate, options.quantity, showToast]);

  const handleCopyOneWithToast = async (uuid: string) => {
    const success = await handleCopy(uuid);
    if (success) {
      showToast('UUID copied to clipboard', 'success');
    } else {
      showToast('Failed to copy UUID', 'error');
    }
  };

  const handleCopyAllWithToast = async () => {
    const success = await handleCopyAll();
    if (success) {
      showToast('All UUIDs copied to clipboard', 'success');
    } else {
      showToast('Failed to copy UUIDs', 'error');
    }
  };

  const handleClearWithToast = () => {
    handleClear();
    showToast('Cleared results', 'success');
  };

  const handleClearHistoryWithToast = () => {
    handleClearHistory();
    showToast('Cleared UUID history', 'success');
  };

  const handleDownloadWithToast = () => {
    handleDownload();
    showToast('Downloaded UUID list', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">UUID Generator</h1>
        <p className="text-muted-foreground">
          Generate, validate, and format v4 Universally Unique Identifiers (UUIDs)
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-cyan-500" />
              <CardTitle>UUID v4 Generator &amp; Validator</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>Web Crypto API</span>
            </div>
          </div>
          <CardDescription>
            Select quantity and format parameters to generate unique identifiers instantly.
          </CardDescription>
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive mt-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: UUID Output Editor */}
            <div className="space-y-4">
              <UUIDEditor
                uuids={uuids}
                onCopyOne={handleCopyOneWithToast}
                onCopyAll={handleCopyAllWithToast}
                onDownload={handleDownloadWithToast}
                onClear={handleClearWithToast}
              />
            </div>

            {/* Right Column: Controls & History */}
            <div className="space-y-6">
              <UUIDControls
                options={options}
                onQuantityChange={setQuantity}
                onUppercaseChange={setUppercase}
                onHyphensChange={setHyphens}
                onGenerate={handleGenerateWithToast}
                validationInput={validationInput}
                onValidationInputChange={setValidationInput}
                validationResult={validationResult}
                isProcessing={isProcessing}
              />

              <UUIDHistory
                history={history}
                onCopyOne={handleCopyOneWithToast}
                onClearHistory={handleClearHistoryWithToast}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { UUIDToolkitPage as UUIDGeneratorPage };
