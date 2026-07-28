import { useState, useCallback } from 'react';
import { formatJson, minifyJson } from '../utils/formatter';
import { validateJson } from '../utils/validator';
import type { JsonFormatterState, ValidationResult } from '../types';

export function useJsonFormatter() {
  const [state, setState] = useState<JsonFormatterState>({
    input: '',
    output: '',
    validationResult: { isValid: true },
    isProcessing: false,
  });

  const setInput = useCallback((input: string) => {
    setState((prev) => ({
      ...prev,
      input,
    }));
  }, []);

  const setOutput = useCallback((output: string) => {
    setState((prev) => ({
      ...prev,
      output,
    }));
  }, []);

  const setValidationResult = useCallback((validationResult: ValidationResult) => {
    setState((prev) => ({
      ...prev,
      validationResult,
    }));
  }, []);

  const setProcessing = useCallback((isProcessing: boolean) => {
    setState((prev) => ({
      ...prev,
      isProcessing,
    }));
  }, []);

  const handleFormat = useCallback(() => {
    if (!state.input.trim()) {
      return;
    }

    setProcessing(true);
    
    try {
      const formatted = formatJson(state.input);
      const validation = validateJson(state.input);
      
      setOutput(formatted);
      setValidationResult(validation);
    } finally {
      setProcessing(false);
    }
  }, [state.input, setProcessing, setOutput, setValidationResult]);

  const handleMinify = useCallback(() => {
    if (!state.input.trim()) {
      return;
    }

    setProcessing(true);
    
    try {
      const minified = minifyJson(state.input);
      const validation = validateJson(state.input);
      
      setOutput(minified);
      setValidationResult(validation);
    } finally {
      setProcessing(false);
    }
  }, [state.input, setProcessing, setOutput, setValidationResult]);

  const handleValidate = useCallback(() => {
    if (!state.input.trim()) {
      return;
    }

    setProcessing(true);
    
    try {
      const validation = validateJson(state.input);
      setValidationResult(validation);
      
      if (validation.isValid) {
        const formatted = formatJson(state.input);
        setOutput(formatted);
      }
    } finally {
      setProcessing(false);
    }
  }, [state.input, setProcessing, setValidationResult, setOutput]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setValidationResult({ isValid: true });
  }, [setInput, setOutput, setValidationResult]);

  const handleCopy = useCallback(async () => {
    if (!state.output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(state.output);
      return true;
    } catch {
      return false;
    }
  }, [state.output]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      return true;
    } catch {
      return false;
    }
  }, [setInput]);

  const handleUpload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    },
    [setInput]
  );

  const handleDownload = useCallback(() => {
    if (!state.output) {
      return;
    }

    const blob = new Blob([state.output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.output]);

  return {
    state,
    setInput,
    setOutput,
    handleFormat,
    handleMinify,
    handleValidate,
    handleClear,
    handleCopy,
    handlePaste,
    handleUpload,
    handleDownload,
  };
}