import React from "react";
import { usePrompt } from "../prompt/usePrompt";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import CopyBlock from "./CopyButton";

const PromptHistory: React.FC = () => {
  const { history } = usePrompt();

  if (history.length === 0) return null;

  const getCodeString = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getCodeString).join("");
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      return element.props.children
        ? getCodeString(element.props.children)
        : "";
    }
    return "";
  };

  const formatTimestamp = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <ul className="space-y-4">
      {history.map((item) => (
        <li key={item.id} className="space-y-4">
          {/* User prompt */}
          <div className="flex justify-end">
            <div className="bg-[var(--pm-bg)] text-[var(--pm-text)] border border-[var(--pm-border)] px-4 py-2 max-w-[80%] rounded shadow break-words whitespace-pre-wrap overflow-hidden overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words">
                {item.prompt}
              </pre>
              <p className="text-xs text-gray-400 text-right mt-1">
                {formatTimestamp(item.timestamp)}
              </p>
            </div>
          </div>

          {/* AI response */}
          <div className="flex justify-start">
            <div className="px-4 py-2 ">
              <div className="prose max-w-none prose-sm text-[var(--pm-response-text)] [&_pre]:bg-[var(--pm-code-bg)] [&_pre]:text-[var(--pm-code-text)] [&_pre]:shadow-none [&_pre]:rounded-lg [&_pre]:text-sm [&_code]:text-sm">
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code({
                      inline,
                      className,
                      children,
                      ...props
                    }: React.HTMLAttributes<HTMLElement> & {
                      inline?: boolean;
                    }) {
                      const match = /language-(\w+)/.exec(className || "");
                      const codeText = getCodeString(children).trim();

                      return !inline && match ? (
                        <CopyBlock language={match[1]} value={codeText} />
                      ) : (
                        <code
                          className={`px-1 py-0.5 rounded text-sm font-mono ${className}`}
                          {...props}
                        >
                          {codeText}
                        </code>
                      );
                    },
                  }}
                >
                  {item.response}
                </ReactMarkdown>
                <p className="text-xs text-gray-400 mt-1">
                  {formatTimestamp(item.timestamp)}
                </p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PromptHistory;
