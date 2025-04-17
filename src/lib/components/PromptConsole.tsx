import { useEffect, useRef } from "react";
import { usePrompt } from "../prompt";
import PromptHistory from "./PromptHistory";
import PromptInput from "./PromptInput";
import NavBar from "./NavBar";

interface PromptConsoleProps {
  title?: string;
  subTitle?: string;
  placeholder?: string;
  onSubmitPrompt?: (prompt: string) => Promise<string>;
}

const PromptConsole = ({
  title,
  subTitle = "Let's start our chat",
  placeholder,
  onSubmitPrompt,
}: PromptConsoleProps) => {
  const { history } = usePrompt();
  const hasHistory = history.length > 0;
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <div className="min-h-screen bg-[var(--pm-bg)] text-[var(--pm-text)] flex flex-col">
      <NavBar title={title} />

      <main className="max-w-4xl mx-auto w-full flex flex-col flex-1 mt-4">
        {hasHistory ? (
          <>
            <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
              <PromptHistory />
              <div ref={endOfMessagesRef} />
            </div>
            <div className="sticky bottom-0 bg-[var(--pm-bg)] border-t border-[var(--pm-border)] pt-2 pb-4">
              <PromptInput
                placeholder={placeholder}
                onSubmitPrompt={onSubmitPrompt}
                subTitle={subTitle}
                hasHistory
              />
            </div>
          </>
        ) : (
          <div className="flex flex-1 justify-center items-center px-4">
            <div className="w-full">
              <PromptInput
                onSubmitPrompt={onSubmitPrompt}
                placeholder={placeholder}
                subTitle={subTitle}
                hasHistory={false}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PromptConsole;
