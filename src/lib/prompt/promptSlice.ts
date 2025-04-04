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
          const newItem: PromptItem = {
            id: crypto.randomUUID(),
            prompt: state.input,
            response: action.payload,
            timestamp: new Date().toISOString(),
          };
          state.history.unshift(newItem);
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

export const { setInput, clearHistory } = promptSlice.actions;
export default promptSlice.reducer;
