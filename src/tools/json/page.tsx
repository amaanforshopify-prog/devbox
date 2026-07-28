import { useEffect, useCallback } from 'react';
import { useJsonFormatter } from './hooks/useJsonFormatter';
import { useToast } from '@/components/ui/toast';
import { JsonEditor } from './components/JsonEditor';
import { JsonOutput } from './components/JsonOutput';
import { JsonToolbar } from './components/JsonToolbar';
import { ValidationStatus } from './components/ValidationStatus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

export function JsonToolkitPage() {
  const {
    state,
    setInput,
    handleFormat,
    handleMinify,
    handleValidate,
    handleClear,
    handleCopy,
    handlePaste,
    handleUpload,
    handleDownload,
  } = useJsonFormatter();

  const { showToast } = useToast();

  const handleFormatWithToast = useCallback(() => {
    handleFormat();
    if (state.validationResult.isValid) {
      showToast('JSON formatted successfully', 'success');
    } else {
      showToast('Invalid JSON - please check syntax', 'error');
    }
  }, [handleFormat, state.validationResult.isValid, showToast]);

  const handleMinifyWithToast = useCallback(() => {
    handleMinify();
    if (state.validationResult.isValid) {
      showToast('JSON minified successfully', 'success');
    } else {
      showToast('Invalid JSON - please check syntax', 'error');
    }
  }, [handleMinify, state.validationResult.isValid, showToast]);

  const handleValidateWithToast = () => {
    handleValidate();
    if (state.validationResult.isValid) {
      showToast('Valid JSON', 'success');
    } else {
      showToast('Invalid JSON - please check syntax', 'error');
    }
  };

  const handleCopyWithToast = async () => {
    const success = await handleCopy();
    if (success) {
      showToast('Copied to clipboard', 'success');
    } else {
      showToast('Failed to copy', 'error');
    }
  };

  const handlePasteWithToast = async () => {
    const success = await handlePaste();
    if (success) {
      showToast('Pasted from clipboard', 'success');
    } else {
      showToast('Failed to paste', 'error');
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleFormatWithToast();
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'M') {
      e.preventDefault();
      handleMinifyWithToast();
    }
  }, [handleFormatWithToast, handleMinifyWithToast]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">JSON Toolkit</h1>
        <p className="text-muted-foreground">
          Format, validate, and manipulate JSON data
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-500" />
              <CardTitle>JSON Editor</CardTitle>
            </div>
            <ValidationStatus validationResult={state.validationResult} />
          </div>
          <CardDescription>
            Paste your JSON below or upload a file. Use Ctrl+Enter to format, Ctrl+Shift+M to minify.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <JsonToolbar
            onFormat={handleFormatWithToast}
            onMinify={handleMinifyWithToast}
            onValidate={handleValidateWithToast}
            onCopy={handleCopyWithToast}
            onPaste={handlePasteWithToast}
            onClear={handleClear}
            onUpload={handleUpload}
            onDownload={handleDownload}
            isProcessing={state.isProcessing}
            hasInput={state.input.length > 0}
            hasOutput={state.output.length > 0}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
            <div className="space-y-2">
              <label className="text-sm font-medium">Input</label>
              <JsonEditor
                value={state.input}
                onChange={setInput}
                placeholder="Paste or type your JSON here..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Output</label>
              <JsonOutput value={state.output} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}