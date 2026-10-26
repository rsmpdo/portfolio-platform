import React, { useMemo } from 'react';
import { Quote, FileCode, Check, Copy } from 'lucide-react';

/**
 * Lightweight, zero-dependency Markdown parser designed for portfolio case studies.
 * Safely parses Headings, Blockquotes, Code Blocks, Inline Code, Lists, Bold, Italic, and Links.
 */
function parseCustomMarkdown(rawMarkdown = '') {
  if (!rawMarkdown || typeof rawMarkdown !== 'string') return [];

  const lines = rawMarkdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let currentCodeBlock = null;
  let currentList = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle (```lang)
    if (line.trim().startsWith('```')) {
      if (currentCodeBlock) {
        blocks.push(currentCodeBlock);
        currentCodeBlock = null;
      } else {
        if (currentList) {
          blocks.push(currentList);
          currentList = null;
        }
        const lang = line.trim().replace(/^```/, '').trim() || 'plaintext';
        currentCodeBlock = { type: 'code', language: lang, lines: [] };
      }
      continue;
    }

    // Inside code block
    if (currentCodeBlock) {
      currentCodeBlock.lines.push(line);
      continue;
    }

    // Unordered list item (- or *)
    const ulMatch = line.match(/^\s*[-*]\s+(.*)$/);
    if (ulMatch) {
      if (!currentList || currentList.type !== 'ul') {
        if (currentList) blocks.push(currentList);
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // Ordered list item (1. 2.)
    const olMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!currentList || currentList.type !== 'ol') {
        if (currentList) blocks.push(currentList);
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[2]);
      continue;
    }

    // Close list if line is not a list item
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }

    // Horizontal Rule (--- or ***)
    if (/^(\*\*\*|---|___)$/.test(line.trim())) {
      blocks.push({ type: 'hr' });
      continue;
    }

    // Blockquote (> text)
    if (line.trim().startsWith('>')) {
      const quoteText = line.replace(/^>\s?/, '');
      blocks.push({ type: 'quote', text: quoteText });
      continue;
    }

    // Headings (##, ###, ####)
    if (line.startsWith('#### ')) {
      blocks.push({ type: 'h4', text: line.replace('#### ', '') });
      continue;
    }
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.replace('### ', '') });
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.replace('## ', '') });
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push({ type: 'h2', text: line.replace('# ', '') });
      continue;
    }

    // Empty line
    if (!line.trim()) {
      continue;
    }

    // Standard paragraph
    blocks.push({ type: 'p', text: line });
  }

  if (currentCodeBlock) blocks.push(currentCodeBlock);
  if (currentList) blocks.push(currentList);

  return blocks;
}

/**
 * Inline text formatter for bold, italic, inline code, and links.
 */
function renderInlineFormatting(text = '') {
  if (!text) return null;

  // Split tokens safely
  // Regex matches: [link](url) | `code` | **bold** | *italic*
  const pattern = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    // Link [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 font-medium transition"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Inline code `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={index}
          className="px-2 py-0.5 mx-0.5 rounded-md font-mono text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={index} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={index} className="italic text-slate-300">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}

function CodeBlock({ language, lines = [] }) {
  const [copied, setCopied] = React.useState(false);
  const codeString = lines.join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden glass border border-white/10 bg-slate-950/80 shadow-2xl">
      {/* Code window titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06] text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-2 py-1 rounded-lg glass border border-white/10 text-slate-400 hover:text-white flex items-center gap-1 text-[11px] transition"
          title="Copy code to clipboard"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code content */}
      <pre className="p-4 sm:p-5 overflow-x-auto text-xs font-mono leading-relaxed text-slate-200">
        <code>{codeString}</code>
      </pre>
    </div>
  );
}

export default function RichTextSection({ props = {}, theme = {} }) {
  const {
    badge = 'Technical Case Study',
    heading = 'Architecture & Problem Breakdown',
    subheading = 'An in-depth look into the decisions, constraints, and engineering methodology behind this project.',
    content = `## The Core Challenge\n\nWhen scaling systems to handle **hundreds of thousands of concurrent operations**, architectural trade-offs become critical.\n\n> "Simplicity is prerequisite for reliability." - Edsger W. Dijkstra\n\n### Engineering Decisions\n\n- **Zero-Copy Buffers**: Reduced memory footprint by over 35%.\n- **Stateless Edge Handlers**: Distributed load smoothly across multiple global zones.\n- **Adaptive Circuit Breakers**: Guaranteed sub-50ms latency SLAs even during peak failover events.\n\n\`\`\`javascript\n// Realtime stream processor pipeline\nexport async function processEventStream(events) {\n  return events\n    .filter(e => e.isValid)\n    .map(e => transformPayload(e));\n}\n\`\`\`\n\n### Measuring Impact\n\nBy prioritizing *observability* and *resilience* early, the system maintained 99.99% uptime through consecutive high-traffic launches.`,
    alignment = 'left'
  } = props;

  const parsedBlocks = useMemo(() => parseCustomMarkdown(content), [content]);

  return (
    <section className="py-14 md:py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        {(badge || heading || subheading) && (
          <div className={`mb-10 md:mb-14 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
            {badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold glass border border-white/10 mb-4 badge-primary">
                <FileCode className="w-3.5 h-3.5" />
                <span>{badge}</span>
              </div>
            )}
            {heading && (
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`text-slate-400 text-sm md:text-base leading-relaxed mt-3 ${alignment === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Prose Body */}
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          {parsedBlocks.map((block, idx) => {
            switch (block.type) {
              case 'h2':
                return (
                  <h3 key={idx} className="font-heading font-bold text-xl md:text-2xl text-white pt-6 pb-1">
                    {renderInlineFormatting(block.text)}
                  </h3>
                );
              case 'h3':
                return (
                  <h4 key={idx} className="font-heading font-semibold text-lg md:text-xl text-white pt-4 pb-1">
                    {renderInlineFormatting(block.text)}
                  </h4>
                );
              case 'h4':
                return (
                  <h5 key={idx} className="font-heading font-medium text-base text-slate-200 pt-3">
                    {renderInlineFormatting(block.text)}
                  </h5>
                );
              case 'quote':
                return (
                  <div
                    key={idx}
                    className="my-6 p-4 sm:p-5 rounded-2xl glass border-l-4 border-indigo-500 bg-indigo-500/5 flex items-start gap-3.5 shadow-lg"
                  >
                    <Quote className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="italic text-slate-200 text-sm md:text-base leading-relaxed m-0">
                      {renderInlineFormatting(block.text)}
                    </p>
                  </div>
                );
              case 'code':
                return (
                  <CodeBlock
                    key={idx}
                    language={block.language}
                    lines={block.lines}
                  />
                );
              case 'ul':
                return (
                  <ul key={idx} className="my-4 space-y-2 list-none pl-2">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-sm md:text-base text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                        <span>{renderInlineFormatting(item)}</span>
                      </li>
                    ))}
                  </ul>
                );
              case 'ol':
                return (
                  <ol key={idx} className="my-4 space-y-2 pl-2 list-none">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-sm md:text-base text-slate-300">
                        <span className="font-mono text-xs text-indigo-400 font-bold shrink-0 mt-0.5">
                          {itemIdx + 1}.
                        </span>
                        <span>{renderInlineFormatting(item)}</span>
                      </li>
                    ))}
                  </ol>
                );
              case 'hr':
                return (
                  <hr key={idx} className="border-none border-t border-white/[0.08] my-8" />
                );
              case 'p':
              default:
                return (
                  <p key={idx} className="m-0 text-slate-300 leading-relaxed">
                    {renderInlineFormatting(block.text)}
                  </p>
                );
            }
          })}
        </div>
      </div>
    </section>
  );
}
