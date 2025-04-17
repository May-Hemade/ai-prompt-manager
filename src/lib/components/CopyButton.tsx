import React, { useState } from "react";

interface CopyBlockProps {
  language?: string;
  value: string;
}

const CopyBlock: React.FC<CopyBlockProps> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative rounded-lg overflow-x-auto bg-[var(--pm-code-bg)] text-[var(--pm-code-text)] text-sm font-mono">
      <button
        onClick={handleCopy}
        className="absolute top-0 right-1 text-xs px-2 py-1 rounded transition text-[var(--pm-copy-btn-text)] bg-[var(--pm-copy-btn-bg)] hover:bg-[var(--pm-copy-btn-hover-bg)]"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre>
        <code className={`language-${language}`}>{value}</code>
      </pre>
    </div>
  );
};

export default CopyBlock;
