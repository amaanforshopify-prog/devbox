import { useCallback } from 'react';
import { useBase64 } from './hooks/useBase64';
import { useToast } from '@/components/ui/toast';
import { Base64Editor } from './components/Base64Editor';
import { Base64Output } from './components/Base64Output';
import { Base64Toolbar } from './components/Base64Toolbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCode, FileCheck, AlertCircle } from 'lucide-react';
import { formatFileSize } from './utils/fileConverter';

export function Base64ToolkitPage() {
  const {
    state,
    setInput,
    handleEncode,
    handleDecode,
    handleUrlEncode,
    handleUrlDecode,
    handleClear,
    handleCopy,
    handlePaste,
    handleSwap,
    handleUpload,
    handleDownload,
  } = useBase64();

  const { showToast } = useToast();

  const handleEncodeWithToast = useCallback(() => {
    handleEncode();
    showToast('Encoded to Base64', 'success');
  }, [handleEncode, showToast]);

  const handleDecodeWithToast = useCallback(() => {
    handleDecode();
    if (state.error) {
      showToast(state.error, 'error');
    } else {
      showToast('Decoded Base64 successfully', 'success');
    }
  }, [handleDecode, state.error, showToast]);

  const handleUrlEncodeWithToast = useCallback(() => {
    handleUrlEncode();
    showToast('Encoded to URL-safe Base64', 'success');
  }, [handleUrlEncode, showToast]);

  const handleUrlDecodeWithToast = useCallback(() => {
    handleUrlDecode();
    if (state.error) {
      showToast(state.error, 'error');
    } else {
      showToast('Decoded URL-safe Base64 successfully', 'success');
    }
  }, [handleUrlDecode, state.error, showToast]);

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

  const handleSwapWithToast = () => {
    handleSwap();
    showToast('Swapped input and output', 'success');
  };

  const handleUploadWithToast = async (file: File) => {
    const res = await handleUpload(file);
    if (res.success && res.fileInfo) {
      showToast(`Uploaded file: ${res.fileInfo.name}`, 'success');
    } else {
      showToast(res.error || 'Failed to upload file', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Base64 Toolkit</h1>
        <p className="text-muted-foreground">
          Encode and decode text or files using standard Base64 and URL-safe Base64
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-blue-500" />
              <CardTitle>Base64 Encoder &amp; Decoder</CardTitle>
            </div>
            {state.fileInfo && (
              <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <FileCheck className="h-4 w-4 text-green-500" />
                <span>
                  {state.fileInfo.name} ({formatFileSize(state.fileInfo.size)}) - {state.fileInfo.mimeType}
                </span>
              </div>
            )}
          </div>
          <CardDescription>
            Type or paste text to convert, or upload a file to convert into Base64 format.
          </CardDescription>
          {state.error && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive mt-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <Base64Toolbar
            onEncode={handleEncodeWithToast}
            onDecode={handleDecodeWithToast}
            onUrlEncode={handleUrlEncodeWithToast}
            onUrlDecode={handleUrlDecodeWithToast}
            onCopy={handleCopyWithToast}
            onPaste={handlePasteWithToast}
            onClear={handleClear}
            onSwap={handleSwapWithToast}
            onUpload={handleUploadWithToast}
            onDownload={handleDownload}
            isProcessing={state.isProcessing}
            hasInput={state.input.length > 0}
            hasOutput={state.output.length > 0}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium">Input</label>
              <div className="flex-1 min-h-0">
                <Base64Editor
                  value={state.input}
                  onChange={setInput}
                  placeholder="Paste or type your text or Base64 string here..."
                />
              </div>
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium">Output</label>
              <div className="flex-1 min-h-0">
                <Base64Output value={state.output} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
