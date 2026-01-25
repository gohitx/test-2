import React, { useRef, useState } from 'react';

/**
 * TextCleaner - componente sencillo en TSX que permite:
 * - Cargar un ejemplo largo (más de 100 líneas)
 * - Eliminar todo el texto
 * - Eliminar líneas vacías
 * - Eliminar líneas que coincidan con una subcadena o regex
 * - Eliminar líneas duplicadas
 * - Eliminar la selección de texto actual
 * - Descargar el resultado como .txt
 *
 * Este archivo es un ejemplo y tiene más de 100 líneas de código.
 */

type Options = {
  removeEmptyLines: boolean;
  removeDuplicates: boolean;
  trimLines: boolean;
};

export default function TextCleaner(): JSX.Element {
  const [text, setText] = useState<string>('');
  const [match, setMatch] = useState<string>(''); // subcadena o regex
  const [useRegex, setUseRegex] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>({
    removeEmptyLines: false,
    removeDuplicates: false,
    trimLines: true,
  });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Genera un ejemplo con más de 100 líneas numeradas
  function loadExample(lines = 120) {
    const arr: string[] = [];
    for (let i = 1; i <= lines; i++) {
      // Insert some variations to demo removal features
      if (i % 10 === 0) arr.push(`LÍNEA ${i} - ejemplO con MAYÚSCULAS`);
      else if (i % 7 === 0)
        arr.push(`  `); // líneas vacías con espacios
      else if (i % 5 === 0) arr.push(`linea-${i}-duplicada`);
      else arr.push(`línea de ejemplo número ${i}`);
    }
    // Add some deliberate duplicates
    arr.push('linea-5-duplicada');
    arr.push('linea-10-duplicada');
    arr.push('linea-5-duplicada');
    setText(arr.join('\n'));
    // Focus textarea so user can quickly interact
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  // Utility: split consistently into lines
  function getLines(src: string) {
    // Normalize CRLF -> LF
    return src.replace(/\r\n/g, '\n').split('\n');
  }

  // Remove lines by matching subcadena o regex
  function removeMatchingLines(src: string, pattern: string, isRegex: boolean) {
    if (!pattern) return src;
    const lines = getLines(src);
    let re: RegExp | null = null;
    if (isRegex) {
      try {
        re = new RegExp(pattern, 'i');
      } catch {
        // If regex is invalid, treat as literal substring
        re = null;
      }
    }
    const filtered = lines.filter((ln) => {
      const candidate = ln;
      if (isRegex && re) {
        return !re.test(candidate);
      }
      return !candidate.toLowerCase().includes(pattern.toLowerCase());
    });
    return filtered.join('\n');
  }

  // Remove duplicate lines (preserve first occurrence)
  function removeDuplicateLines(src: string) {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const ln of getLines(src)) {
      if (!seen.has(ln)) {
        seen.add(ln);
        out.push(ln);
      }
    }
    return out.join('\n');
  }

  // Apply options pipeline to text
  function applyOptionsToText(src: string, opts: Options) {
    let result = src;
    if (opts.trimLines) {
      result = getLines(result)
        .map((l) => l.trim())
        .join('\n');
    }
    if (opts.removeEmptyLines) {
      result = getLines(result)
        .filter((l) => l !== '')
        .join('\n');
    }
    if (opts.removeDuplicates) {
      result = removeDuplicateLines(result);
    }
    return result;
  }

  // Actions bound to UI
  function handleRemoveAll() {
    setText('');
  }

  function handleRemoveSelection() {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    if (start === end) return; // nada seleccionado
    const newText = text.slice(0, start) + text.slice(end);
    setText(newText);
    // reposition caret
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start;
        textareaRef.current.focus();
      }
    }, 0);
  }

  function handleRemoveMatching() {
    const updated = removeMatchingLines(text, match, useRegex);
    setText(updated);
  }

  function handleApplyOptions() {
    const updated = applyOptionsToText(text, options);
    setText(updated);
  }

  function handleDownload() {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'texto-limpio.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '12px auto' }}>
      <h2>Text Cleaner - ejemplo</h2>

      <div style={{ marginBottom: 8 }}>
        <button onClick={() => loadExample()}>Cargar ejemplo (120 líneas)</button>{' '}
        <button onClick={handleRemoveAll}>Eliminar todo</button>{' '}
        <button onClick={handleRemoveSelection}>Eliminar selección</button>{' '}
        <button onClick={handleApplyOptions}>Aplicar opciones</button>{' '}
        <button onClick={handleDownload}>Descargar .txt</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 8 }}>
          Coincidencia (subcadena o regex):
          <input
            placeholder="por ejemplo: ejemplo|duplicada|^línea"
            value={match}
            onChange={(e) => setMatch(e.target.value)}
            style={{ marginLeft: 8, width: 400 }}
          />
        </label>
        <label style={{ marginLeft: 12 }}>
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
          />{' '}
          Usar regex
        </label>{' '}
        <button onClick={handleRemoveMatching} style={{ marginLeft: 8 }}>
          Eliminar líneas coincidentes
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 12 }}>
          <input
            type="checkbox"
            checked={options.trimLines}
            onChange={(e) => setOptions({ ...options, trimLines: e.target.checked })}
          />{' '}
          Recortar espacios en líneas
        </label>
        <label style={{ marginRight: 12 }}>
          <input
            type="checkbox"
            checked={options.removeEmptyLines}
            onChange={(e) => setOptions({ ...options, removeEmptyLines: e.target.checked })}
          />{' '}
          Eliminar líneas vacías
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.removeDuplicates}
            onChange={(e) => setOptions({ ...options, removeDuplicates: e.target.checked })}
          />{' '}
          Eliminar duplicados
        </label>
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        rows={20}
        style={{
          width: '100%',
          fontFamily: 'monospace',
          fontSize: 13,
          padding: 10,
          boxSizing: 'border-box',
        }}
        placeholder="Aquí va tu texto..."
      />

      <div style={{ marginTop: 10, fontSize: 13 }}>
        <strong>Estadísticas:</strong>{' '}
        {(() => {
          const lines = getLines(text);
          const nonEmpty = lines.filter((l) => l.trim() !== '').length;
          const chars = text.length;
          return (
            <span>
              {lines.length} líneas ({nonEmpty} no vacías), {chars} caracteres
            </span>
          );
        })()}
      </div>
    </div>
  );
}
