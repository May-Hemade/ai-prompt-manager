import React from "react";
import { usePrompt } from "../prompt/usePrompt";

const PromptHistory: React.FC = () => {
  const { history } = usePrompt();

  if (history.length === 0) return null;

  return (
    <ul className="max-w-md space-y-3 text-gray-800 list-disc list-inside mt-8">
      {history.map((item) => (
        <li key={item.id}>
          <p className="text-sm text-gray-500">
            Prompt: <span className="text-gray-700">{item.prompt}</span>
          </p>
          <p className="text-sm text-green-700">Response: {item.response}</p>
          <hr className="my-2" />
        </li>
      ))}
    </ul>
  );
};

export default PromptHistory;
