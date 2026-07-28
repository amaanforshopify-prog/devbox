import { Code, Minimize2, CheckCircle, Copy, Clipboard, Trash2, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface JsonToolbarProps {
  onFormat: () => void;
  onMinify: () => void;
  onValidate: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onClear: () => void;
  onUpload: (file: File) => void;
  onDownload: () => void;
  isProcessing: boolean;
  hasInput: boolean;
  hasOutput: boolean;
  className?: string;
}

export function JsonToolbar({
  onFormat,
  onMinify,
  onValidate,
  onCopy,
  onPaste,
  onClear,
  onUpload,
  onDownload,
  isProcessing,
  hasInput,
  hasOutput,
  className,
}: JsonToolbarProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <Button
        onClick={onFormat}
        disabled={!hasInput || isProcessing}
        variant="default"
        size="sm"
      >
        <Code className="h-4 w-4 mr-2" />
        Format
      </Button>

      <Button
        onClick={onMinify}
        disabled={!hasInput || isProcessing}
        variant="default"
        size="sm"
      >
        <Minimize2 className="h-4 w-4 mr-2" />
        Minify
      </Button>

      <Button
        onClick={onValidate}
        disabled={!hasInput || isProcessing}
        variant="default"
        size="sm"
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Validate
      </Button>

      <div className="w-px h-6 bg-border mx-2" />

      <Button
        onClick={onCopy}
        disabled={!hasOutput || isProcessing}
        variant="outline"
        size="sm"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>

      <Button
        onClick={onPaste}
        disabled={isProcessing}
        variant="outline"
        size="sm"
      >
        <Clipboard className="h-4 w-4 mr-2" />
        Paste
      </Button>

      <Button
        onClick={onClear}
        disabled={!hasInput || isProcessing}
        variant="outline"
        size="sm"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear
      </Button>

      <div className="w-px h-6 bg-border mx-2" />

      <Button
        onClick={() => document.getElementById('file-upload')?.click()}
        disabled={isProcessing}
        variant="outline"
        size="sm"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </Button>
      <input
        id="file-upload"
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
      />

      <Button
        onClick={onDownload}
        disabled={!hasOutput || isProcessing}
        variant="outline"
        size="sm"
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>
  );
}