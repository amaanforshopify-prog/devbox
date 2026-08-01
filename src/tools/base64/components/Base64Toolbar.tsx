import { Lock, Unlock, Link, Unlink, Copy, Clipboard, Trash2, ArrowRightLeft, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Base64ToolbarProps {
  onEncode: () => void;
  onDecode: () => void;
  onUrlEncode: () => void;
  onUrlDecode: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onClear: () => void;
  onSwap: () => void;
  onUpload: (file: File) => void;
  onDownload: () => void;
  isProcessing: boolean;
  hasInput: boolean;
  hasOutput: boolean;
  className?: string;
}

export function Base64Toolbar({
  onEncode,
  onDecode,
  onUrlEncode,
  onUrlDecode,
  onCopy,
  onPaste,
  onClear,
  onSwap,
  onUpload,
  onDownload,
  isProcessing,
  hasInput,
  hasOutput,
  className,
}: Base64ToolbarProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      e.target.value = '';
    }
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <Button
        onClick={onEncode}
        disabled={!hasInput || isProcessing}
        variant="default"
        size="sm"
      >
        <Lock className="h-4 w-4 mr-2" />
        Encode
      </Button>

      <Button
        onClick={onDecode}
        disabled={!hasInput || isProcessing}
        variant="default"
        size="sm"
      >
        <Unlock className="h-4 w-4 mr-2" />
        Decode
      </Button>

      <Button
        onClick={onUrlEncode}
        disabled={!hasInput || isProcessing}
        variant="default"
        size="sm"
      >
        <Link className="h-4 w-4 mr-2" />
        URL Encode
      </Button>

      <Button
        onClick={onUrlDecode}
        disabled={!hasInput || isProcessing}
        variant="default"
        size="sm"
      >
        <Unlink className="h-4 w-4 mr-2" />
        URL Decode
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
        onClick={onSwap}
        disabled={(!hasInput && !hasOutput) || isProcessing}
        variant="outline"
        size="sm"
      >
        <ArrowRightLeft className="h-4 w-4 mr-2" />
        Swap
      </Button>

      <Button
        onClick={onClear}
        disabled={(!hasInput && !hasOutput) || isProcessing}
        variant="outline"
        size="sm"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear
      </Button>

      <div className="w-px h-6 bg-border mx-2" />

      <Button
        onClick={() => document.getElementById('base64-file-upload')?.click()}
        disabled={isProcessing}
        variant="outline"
        size="sm"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </Button>
      <input
        id="base64-file-upload"
        type="file"
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