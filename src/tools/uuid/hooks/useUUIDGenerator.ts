import { useState, useCallback } from 'react';
import { generateUUIDs } from '../utils/generator';
import { validateUUID } from '../utils/validator';
import type { UUIDOptions, HistoryItem, ValidationResult } from '../types';

const STORAGE_KEY = 'devbox_uuid_history';
const MAX_HISTORY = 50;

const INITIAL_OPTIONS: UUIDOptions = {
  quantity: 5,
  uppercase: false,
  hyphens: true,
};

function loadHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {
    // Ignore storage errors
  }
}

export function useUUIDGenerator() {
  const [options, setOptions] = useState<UUIDOptions>(INITIAL_OPTIONS);
  const [uuids, setUuids] = useState<string[]>(() => {
    return generateUUIDs(INITIAL_OPTIONS.quantity, INITIAL_OPTIONS.uppercase, INITIAL_OPTIONS.hyphens);
  });
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory);
  const [validationInput, setValidationInputState] = useState<string>('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(() => {
    setIsProcessing(true);
    setError(null);

    try {
      const generated = generateUUIDs(options.quantity, options.uppercase, options.hyphens);
      setUuids(generated);

      const now = Date.now();
      const newItems: HistoryItem[] = generated.map((uuid, idx) => ({
        id: `${now}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
        uuid,
        timestamp: now,
      }));

      setHistory((prev) => {
        const updated = [...newItems, ...prev].slice(0, MAX_HISTORY);
        saveHistory(updated);
        return updated;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'UUID generation failed');
    } finally {
      setIsProcessing(false);
    }
  }, [options.quantity, options.uppercase, options.hyphens]);

  const setQuantity = useCallback((quantity: number) => {
    const validQty = Math.max(1, Math.min(100, quantity));
    setOptions((prev) => ({ ...prev, quantity: validQty }));
  }, []);

  const setUppercase = useCallback((uppercase: boolean) => {
    setOptions((prev) => ({ ...prev, uppercase }));
  }, []);

  const setHyphens = useCallback((hyphens: boolean) => {
    setOptions((prev) => ({ ...prev, hyphens }));
  }, []);

  const setValidationInput = useCallback((input: string) => {
    setValidationInputState(input);
    if (!input.trim()) {
      setValidationResult(null);
    } else {
      setValidationResult(validateUUID(input));
    }
  }, []);

  const handleCopy = useCallback(async (text: string): Promise<boolean> => {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleCopyAll = useCallback(async (): Promise<boolean> => {
    if (uuids.length === 0) return false;
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
      return true;
    } catch {
      return false;
    }
  }, [uuids]);

  const handleClear = useCallback(() => {
    setUuids([]);
    setError(null);
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (uuids.length === 0) return;
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [uuids]);

  return {
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
  };
}
