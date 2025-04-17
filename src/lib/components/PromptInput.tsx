import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { usePrompt } from "../prompt/usePrompt";
import {
  setInput,
  submitPrompt,
  submitPromptManually,
} from "../prompt/promptSlice";
import { SendHorizontal } from "lucide-react";

interface PromptInputProps {
  placeholder?: string;
  onSubmitPrompt?: (prompt: string) => Promise<string>;
  subTitle?: string;
  hasHistory: boolean;
}

const PromptInput = ({
  onSubmitPrompt,
  placeholder,
  subTitle,
  hasHistory,
}: PromptInputProps) => {
  const dispatch = useAppDispatch();
  const { loading, input } = usePrompt();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setInput(e.target.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (onSubmitPrompt) {
      const response = await onSubmitPrompt(input);
      dispatch(submitPromptManually({ input, response }));
    } else {
      dispatch(submitPrompt(input));
    }
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [input]);

  return (
    <>
      {!hasHistory && (
        <h3 className="text-3xl font-bold mb-6 text-[var(--pm-primary)] text-center">
          {subTitle}
        </h3>
      )}
      <form
        onSubmit={handleSubmit}
        className={`flex items-end gap-2 mx-2 transition-all ${
          hasHistory ? "" : "mt-4"
        }`}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder={placeholder}
          rows={1}
          className="flex-1 px-4 py-2 rounded border border-[var(--pm-border)] bg-[var(--pm-bg)] text-[var(--pm-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--pm-primary)] disabled:opacity-50 resize-none max-h-48 overflow-y-auto scrollbar-hide"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="py-3 px-4 bg-[var(--pm-primary)] text-[var(--pm-button-text)] rounded hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-pulse text-sm">...</span>
          ) : (
            <SendHorizontal size={18} strokeWidth={2} />
          )}
        </button>
      </form>
    </>
  );
};

export default PromptInput;
