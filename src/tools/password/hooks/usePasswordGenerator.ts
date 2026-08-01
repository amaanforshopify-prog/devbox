import { useState, useCallback } from 'react';
import { generatePassword } from '../utils/generator';
import { calculateStrength } from '../utils/strength';
import type { PasswordOptions, PasswordState } from '../types';

const INITIAL_OPTIONS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

function createInitialState(): PasswordState {
  try {
    const password = generatePassword(INITIAL_OPTIONS);
    return {
      password,
      options: INITIAL_OPTIONS,
      strength: calculateStrength(password),
      isProcessing: false,
      error: null,
    };
  } catch {
    return {
      password: '',
      options: INITIAL_OPTIONS,
      strength: calculateStrength(''),
      isProcessing: false,
      error: null,
    };
  }
}

export function usePasswordGenerator() {
  const [state, setState] = useState<PasswordState>(createInitialState);

  const generateWithOptions = useCallback((options: PasswordOptions) => {
    try {
      const password = generatePassword(options);
      const strength = calculateStrength(password);
      setState({
        password,
        options,
        strength,
        isProcessing: false,
        error: null,
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Password generation failed';
      setState((prev) => ({
        ...prev,
        options,
        isProcessing: false,
        error: errorMsg,
      }));
    }
  }, []);

  const handleGenerate = useCallback(() => {
    generateWithOptions(state.options);
  }, [generateWithOptions, state.options]);

  const setLength = useCallback((length: number) => {
    const validLength = Math.max(4, Math.min(64, length));
    const nextOptions = { ...state.options, length: validLength };
    generateWithOptions(nextOptions);
  }, [generateWithOptions, state.options]);

  const toggleOption = useCallback((optionKey: keyof Omit<PasswordOptions, 'length'>) => {
    const currentOptions = state.options;
    const nextOptions = { ...currentOptions, [optionKey]: !currentOptions[optionKey] };
    const { uppercase, lowercase, numbers, symbols } = nextOptions;
    if (!uppercase && !lowercase && !numbers && !symbols) {
      return;
    }
    generateWithOptions(nextOptions);
  }, [generateWithOptions, state.options]);

  const handleCopy = useCallback(async (): Promise<boolean> => {
    if (!state.password) return false;

    try {
      await navigator.clipboard.writeText(state.password);
      return true;
    } catch {
      return false;
    }
  }, [state.password]);

  const handleClear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      password: '',
      strength: calculateStrength(''),
      error: null,
    }));
  }, []);

  return {
    state,
    options: state.options,
    setLength,
    toggleOption,
    handleGenerate,
    handleCopy,
    handleClear,
  };
}
