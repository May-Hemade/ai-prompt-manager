import React from "react";

import { setInput, submitPrompt } from "../prompt";
import { useAppDispatch } from "../../hooks";
import { usePrompt } from "../prompt/usePrompt";

const PromptInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const { loading, input } = usePrompt();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInput(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(submitPrompt(input));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        disabled={loading}
        placeholder="Ask something..."
        className="flex-1 px-4 py-2 rounded border border-gray-300"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </form>
  );
};

export default PromptInput;
