import { useState, useCallback } from 'react';
import { encodeBase64, encodeUrlSafeBase64 } from '../utils/encoder';
import { decodeBase64, decodeUrlSafeBase64 } from '../utils/decoder';
import { fileToBase64, getMimeType } from '../utils/fileConverter';
import type { Base64State, FileInfo } from '../types';

export function useBase64() {
  const [state, setState] = useState<Base64State>({
    input: '',
    output: '',
    fileInfo: null,
    isProcessing: false,
    error: null,
  });

  const setInput = useCallback((input: string) => {
    setState((prev) => ({
      ...prev,
      input,
      error: null,
    }));
  }, []);

  const handleEncode = useCallback(() => {
    if (!state.input) return;

    setState((prev) => ({ ...prev, isProcessing: true, error: null }));

    try {
      const result = encodeBase64(state.input);
      setState((prev) => ({
        ...prev,
        output: result,
        isProcessing: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Encoding failed',
        isProcessing: false,
      }));
    }
  }, [state.input]);

  const handleDecode = useCallback(() => {
    if (!state.input) return;

    setState((prev) => ({ ...prev, isProcessing: true, error: null }));

    try {
      const result = decodeBase64(state.input);
      setState((prev) => ({
        ...prev,
        output: result,
        isProcessing: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Decoding failed',
        isProcessing: false,
      }));
    }
  }, [state.input]);

  const handleUrlEncode = useCallback(() => {
    if (!state.input) return;

    setState((prev) => ({ ...prev, isProcessing: true, error: null }));

    try {
      const result = encodeUrlSafeBase64(state.input);
      setState((prev) => ({
        ...prev,
        output: result,
        isProcessing: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : 'URL safe encoding failed',
        isProcessing: false,
      }));
    }
  }, [state.input]);

  const handleUrlDecode = useCallback(() => {
    if (!state.input) return;

    setState((prev) => ({ ...prev, isProcessing: true, error: null }));

    try {
      const result = decodeUrlSafeBase64(state.input);
      setState((prev) => ({
        ...prev,
        output: result,
        isProcessing: false,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : 'URL safe decoding failed',
        isProcessing: false,
      }));
    }
  }, [state.input]);

  const handleClear = useCallback(() => {
    setState({
      input: '',
      output: '',
      fileInfo: null,
      isProcessing: false,
      error: null,
    });
  }, []);

  const handleCopy = useCallback(async (): Promise<boolean> => {
    if (!state.output) return false;

    try {
      await navigator.clipboard.writeText(state.output);
      return true;
    } catch {
      return false;
    }
  }, [state.output]);

  const handlePaste = useCallback(async (): Promise<boolean> => {
    try {
      const text = await navigator.clipboard.readText();
      setState((prev) => ({
        ...prev,
        input: text,
        error: null,
      }));
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleSwap = useCallback(() => {
    if (!state.input && !state.output) return;

    setState((prev) => ({
      ...prev,
      input: prev.output,
      output: prev.input,
      error: null,
    }));
  }, [state.input, state.output]);

  const handleUpload = useCallback(async (file: File): Promise<{ success: boolean; fileInfo?: FileInfo; error?: string }> => {
    setState((prev) => ({ ...prev, isProcessing: true, error: null }));

    try {
      const base64 = await fileToBase64(file);
      const mimeType = getMimeType(file);
      const fileInfo: FileInfo = {
        name: file.name,
        size: file.size,
        mimeType,
      };

      setState({
        input: base64,
        output: '',
        fileInfo,
        isProcessing: false,
        error: null,
      });

      return { success: true, fileInfo };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'File upload failed';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isProcessing: false,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (!state.output) return;

    const blob = new Blob([state.output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'base64_output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.output]);

  return {
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
  };
}