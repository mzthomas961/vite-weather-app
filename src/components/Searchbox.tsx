// src/components/SearchBox.tsx
import React from "react";

type SearchBoxProps = {
  value: string;
  onChange: (next: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string | null;
  label?: string;
  id?: string;
  autoFocus?: boolean;
};

export default function SearchBox({
  value,
  onChange,
  onSubmit,
  placeholder = "Enter ZIP code",
  disabled = false,
  loading = false,
  error = null,
  label = "ZIP code",
  id = "zip-input",
  autoFocus = false,
}: SearchBoxProps) {
  const errorId = error ? `${id}-error` : undefined;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  const isSubmitDisabled = disabled || loading || value.trim().length === 0;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor={id}>{label}</label>
      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
        <input
          id={id}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-describedby={errorId}
          autoFocus={autoFocus}
        />
        <button type="submit" disabled={isSubmitDisabled}>
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
      {error ? (
        <div id={errorId} role="alert" style={{ color: "crimson", marginTop: 6 }}>
          {error}
        </div>
      ) : null}
    </form>
  );
}
