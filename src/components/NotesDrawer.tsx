"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Edit3,
  Eye,
  Save,
  Check,
  Download,
  Copy,
  Sparkles,
  Bold,
  Italic,
  Code,
  List,
  CheckSquare,
  Heading3,
  Link2,
  Trash2,
  FileText,
} from "lucide-react";

interface NotesDrawerProps {
  topicId: string;
  topicTitle: string;
  initialNote: string;
  onSaveNote: (topicId: string, note: string) => void;
  onExportAllNotes?: () => void;
}

const SENIOR_NOTE_TEMPLATE = `### 1. Key Architectural Mental Models
- 

### 2. Bottlenecks, Edge Cases & Trade-offs
- Pros: 
- Cons: 
- Production Gotchas: 

### 3. Implementation Checklist
- [ ] Implement core prototype
- [ ] Handle failure / fallback modes
- [ ] Measure latency and throughput under load

### 4. Hands-on Lab & GitHub Repo
- Repository: https://github.com/your-username/
`;

export function NotesDrawer({
  topicId,
  topicTitle,
  initialNote,
  onSaveNote,
  onExportAllNotes,
}: NotesDrawerProps) {
  const [note, setNote] = useState(initialNote);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state when switching topics
  useEffect(() => {
    setNote(initialNote);
    setSaveStatus("saved");
  }, [topicId, initialNote]);

  // Debounced auto-save
  const triggerAutoSave = useCallback(
    (newText: string) => {
      setSaveStatus("saving");
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        onSaveNote(topicId, newText);
        setSaveStatus("saved");
      }, 600);
    },
    [topicId, onSaveNote]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNote(val);
    triggerAutoSave(val);
  };

  const handleManualSave = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onSaveNote(topicId, note);
    setSaveStatus("saved");
  };

  // Quick formatting insert helper
  const insertFormatting = (prefix: string, suffix: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = note.substring(start, end) || placeholder;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newNote = note.substring(0, start) + replacement + note.substring(end);

    setNote(newNote);
    triggerAutoSave(newNote);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 10);
  };

  const handleInsertTemplate = () => {
    if (note.trim() && !confirm("Insert template? This will append to your current notes.")) {
      return;
    }
    const newNote = note.trim()
      ? `${note.trim()}\n\n---\n\n${SENIOR_NOTE_TEMPLATE}`
      : SENIOR_NOTE_TEMPLATE;
    setNote(newNote);
    triggerAutoSave(newNote);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadNote = () => {
    const blob = new Blob([note], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${topicId}-notes.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const wordCount = note.trim() ? note.trim().split(/\s+/).length : 0;
  const charCount = note.length;

  return (
    <div
      id="topic-notes-studio"
      className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-gray-800 border border-zinc-200 dark:border-gray-700">
            <Edit3 className="h-4 w-4 text-zinc-900 dark:text-gray-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                In-App Topic Notes Studio
              </h3>
              {/* Live Save Status */}
              <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-500 dark:text-gray-400">
                {saveStatus === "saving" ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Saved to browser</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs font-medium text-zinc-600 dark:text-gray-400 mt-0.5">
              Personal markdown notes & architecture insights for <span className="font-semibold text-zinc-900 dark:text-gray-100">{topicTitle}</span>
            </p>
          </div>
        </div>

        {/* Top Actions: Edit / Preview Switcher & Save */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Tab Switcher */}
          <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-100/80 p-0.5 dark:border-gray-700 dark:bg-gray-800">
            <button
              onClick={() => setActiveTab("edit")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "edit"
                  ? "bg-white text-zinc-950 shadow-xs dark:bg-gray-700 dark:text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-zinc-200"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Write</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === "preview"
                  ? "bg-white text-zinc-950 shadow-xs dark:bg-gray-700 dark:text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-zinc-200"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </button>
          </div>

          <button
            onClick={handleManualSave}
            title="Save note to localStorage"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors shadow-2xs"
          >
            <Save className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      {/* Quick Formatting Toolbar (only in Edit mode) */}
      {activeTab === "edit" && (
        <div className="flex items-center justify-between gap-2 py-2 border-b border-zinc-100 dark:border-gray-800 text-xs overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => insertFormatting("**", "**", "bold text")}
              title="Bold (**text**)"
              className="p-1.5 rounded text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-100 transition-colors"
            >
              <Bold className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => insertFormatting("*", "*", "italic text")}
              title="Italic (*text*)"
              className="p-1.5 rounded text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-100 transition-colors"
            >
              <Italic className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => insertFormatting("`", "`", "code")}
              title="Inline code (`code`)"
              className="p-1.5 rounded text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-100 transition-colors font-mono text-[11px]"
            >
              <Code className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => insertFormatting("```go\n", "\n```", "// code here")}
              title="Fenced code block"
              className="px-2 py-1 rounded text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-zinc-100 transition-colors font-mono text-[11px] font-bold"
            >
              {"{ }"}
            </button>
            <div className="h-3.5 w-[1px] bg-zinc-200 dark:bg-gray-700 mx-1" />
            <button
              onClick={() => insertFormatting("### ", "", "Section Heading")}
              title="Heading (### Heading)"
              className="p-1.5 rounded text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-100 transition-colors"
            >
              <Heading3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => insertFormatting("- ", "", "List item")}
              title="Bullet List (- item)"
              className="p-1.5 rounded text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-100 transition-colors"
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => insertFormatting("- [ ] ", "", "Task checklist item")}
              title="Checklist item (- [ ] task)"
              className="p-1.5 rounded text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-100 transition-colors"
            >
              <CheckSquare className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => insertFormatting("[", "](https://github.com)", "link title")}
              title="Insert link ([title](url))"
              className="p-1.5 rounded text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-zinc-100 transition-colors"
            >
              <Link2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={handleInsertTemplate}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-100/70 px-2.5 py-1 text-xs font-bold text-amber-900 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-950/90 transition-colors shrink-0 font-mono"
            title="Inject structured architecture note template"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Insert Senior Template</span>
          </button>
        </div>
      )}

      {/* Editor Body */}
      <div className="mt-3">
        {activeTab === "edit" ? (
          <textarea
            ref={textareaRef}
            id="topic-notes-textarea"
            rows={10}
            value={note}
            onChange={handleChange}
            placeholder="Document key architecture trade-offs, gotchas, personal mental models, or paste your GitHub repo link (persisted automatically in localStorage)..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 sm:p-5 font-mono text-[13px] sm:text-[13.5px] text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 transition-colors leading-relaxed resize-y min-h-[220px]"
          />
        ) : (
          <div className="w-full min-h-[220px] max-h-[480px] overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/60 leading-relaxed text-sm sm:text-[14.5px]">
            {note.trim() ? (
              <SimpleMarkdownRenderer content={note} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                <FileText className="h-8 w-8 mb-2 opacity-50" />
                <p className="font-semibold text-sm text-zinc-600 dark:text-gray-300">No notes written yet</p>
                <p className="text-xs text-zinc-500 dark:text-gray-400 mt-1">
                  Switch to the Write tab to draft insights or click "Insert Senior Template".
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Tools: Word Count, Download, Copy, Global Export */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-zinc-500 dark:text-gray-400">
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopy}
            disabled={!note.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:pointer-events-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadNote}
            disabled={!note.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:pointer-events-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            title="Download this topic's note as a Markdown file"
          >
            <Download className="h-3 w-3" />
            <span>Export Note (.md)</span>
          </button>

          {onExportAllNotes && (
            <button
              onClick={onExportAllNotes}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-colors"
              title="Download all notes across all 31 modules"
            >
              <Download className="h-3 w-3" />
              <span>Export All Notes</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Lightweight, safe Markdown renderer for in-app notes
function SimpleMarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");

  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = "";

  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check code block fence
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <div
            key={`code-${i}`}
            className="my-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-100 overflow-x-auto"
          >
            <pre>{codeBlockContent.join("\n")}</pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockContent = [];
      } else {
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3);
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---" || line.trim() === "***") {
      elements.push(<hr key={i} className="my-4 border-zinc-200 dark:border-gray-700" />);
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={i} className="mt-4 mb-1.5 font-bold text-sm text-zinc-900 dark:text-gray-100">
          {renderInline(line.slice(4))}
        </h4>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h3 key={i} className="mt-5 mb-2 font-bold text-base text-zinc-900 dark:text-gray-100">
          {renderInline(line.slice(3))}
        </h3>
      );
      continue;
    }
    if (line.startsWith("# ")) {
      elements.push(
        <h2 key={i} className="mt-6 mb-2.5 font-bold text-lg text-zinc-900 dark:text-gray-100">
          {renderInline(line.slice(2))}
        </h2>
      );
      continue;
    }

    // Checklist
    if (line.trim().startsWith("- [ ] ")) {
      elements.push(
        <div key={i} className="flex items-start gap-2 my-1 text-zinc-700 dark:text-gray-300">
          <input type="checkbox" disabled className="mt-1 rounded border-zinc-300" />
          <span>{renderInline(line.trim().slice(6))}</span>
        </div>
      );
      continue;
    }
    if (line.trim().startsWith("- [x] ") || line.trim().startsWith("- [X] ")) {
      elements.push(
        <div key={i} className="flex items-start gap-2 my-1 text-zinc-400 dark:text-gray-500 line-through">
          <input type="checkbox" defaultChecked disabled className="mt-1 rounded border-zinc-300" />
          <span>{renderInline(line.trim().slice(6))}</span>
        </div>
      );
      continue;
    }

    // Bullet List
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      elements.push(
        <li key={i} className="ml-4 list-disc my-0.5 text-zinc-700 dark:text-gray-300">
          {renderInline(line.trim().slice(2))}
        </li>
      );
      continue;
    }

    // Blockquote
    if (line.trim().startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-2 border-zinc-300 dark:border-gray-600 pl-3 my-2 italic text-zinc-600 dark:text-gray-400"
        >
          {renderInline(line.trim().slice(2))}
        </blockquote>
      );
      continue;
    }

    // Empty line
    if (!line.trim()) {
      elements.push(<div key={i} className="h-2" />);
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="my-1 text-zinc-800 dark:text-gray-200">
        {renderInline(line)}
      </p>
    );
  }

  return <div className="space-y-0.5">{elements}</div>;
}

// Inline formatting parser: **bold**, *italic*, `code`, [link](url)
function renderInline(text: string): React.ReactNode {
  // Regex to match inline tokens
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={idx} className="italic">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="rounded bg-zinc-200/80 px-1 py-0.5 font-mono text-[11px] text-zinc-900 dark:bg-gray-700 dark:text-gray-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        return (
          <a
            key={idx}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:opacity-80 inline-flex items-center gap-0.5"
          >
            {match[1]}
          </a>
        );
      }
    }
    if (part.startsWith("http://") || part.startsWith("https://")) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:opacity-80"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}
