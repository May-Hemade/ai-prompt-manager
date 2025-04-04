import { useAppSelector } from "../../hooks";

export const usePrompt = () => {
  const input = useAppSelector((state) => state.prompt.input);
  const loading = useAppSelector((state) => state.prompt.loading);
  const history = useAppSelector((state) => state.prompt.history);
  const error = useAppSelector((state) => state.prompt.error);
  const latest = history[0];

  return { input, loading, history, error, latest };
};
