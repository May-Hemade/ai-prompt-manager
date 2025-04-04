import React from "react";
import { usePrompt } from "../prompt/usePrompt";

const PromptResponse: React.FC = () => {
  const { latest } = usePrompt();

  if (!latest) return null;

  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <p className="text-sm text-gray-500 mb-1">Last prompt:</p>
      <p className="font-medium mb-2">{latest.prompt}</p>
      <p className="text-green-700 font-semibold">{latest.response}</p>
    </div>
  );
};

export default PromptResponse;
