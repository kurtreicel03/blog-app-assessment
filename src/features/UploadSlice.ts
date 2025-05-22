import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

interface ImageUploadState {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ImageUploadState = {
  imageUrl: null,
  loading: false,
  error: null,
};

export const uploadImage = createAsyncThunk<string, File>(
  "imageUpload/uploadImage",
  async (file, thunkAPI) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (uploadError) return thunkAPI.rejectWithValue(uploadError.message);

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);
    if (!data?.publicUrl)
      return thunkAPI.rejectWithValue("Failed to get public URL");
    console.log(data);
    return data.publicUrl;
  }
);

const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState,
  reducers: {
    reset: (state) => {
      state.imageUrl = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        uploadImage.fulfilled,
        (state, action: PayloadAction<string>) => {
          console.log(String(action.payload));
          state.loading = false;
          state.imageUrl = action.payload;
        }
      )
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Upload failed";
      });
  },
});

export const { reset } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
