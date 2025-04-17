import { useAppSelector } from "../../hooks";

export const usePrompt = () => {
  const input = useAppSelector((state) => state.prompt.input);
  const loading = useAppSelector((state) => state.prompt.loading);
  const history = useAppSelector((state) => state.prompt.history);
  const error = useAppSelector((state) => state.prompt.error);

  return { input, loading, history, error };
};
