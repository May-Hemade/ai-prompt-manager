import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PromptItem {
  id: string;
  prompt: string;
  response: string;
  timestamp: string;
}

interface PromptState {
  input: string;
  history: PromptItem[];
  loading: boolean;
  error: string | null;
}

const initialState: PromptState = {
  input: "",
  history: [],
  loading: false,
  error: null,
};

export const submitPrompt = createAsyncThunk(
  "/prompt/submitPrompt",
  async (prompt: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `${prompt} - response`;
  }
);

function createPromptItem(prompt: string, response: string): PromptItem {
  return {
    id: crypto.randomUUID(),
    prompt,
    response,
    timestamp: new Date().toISOString(),
  };
}
const MAX_HISTORY = 100;

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setInput: (state: PromptState, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
    },

    submitPromptManually: (
      state,
      action: PayloadAction<{ input: string; response: string }>
    ) => {
      const { input, response } = action.payload;
      state.history.push(createPromptItem(input, response));

      if (state.history.length > MAX_HISTORY) {
        state.history.shift();
      }
      state.input = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        submitPrompt.fulfilled,
        (state, action: PayloadAction<string>) => {
          const prompt = state.input;
          const response = action.payload;
          state.history.push(createPromptItem(prompt, response));
          if (state.history.length > MAX_HISTORY) {
            state.history.shift();
          }

          state.input = "";
          state.loading = false;
        }
      )
      .addCase(submitPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setInput, clearHistory, submitPromptManually } =
  promptSlice.actions;
export default promptSlice.reducer;
