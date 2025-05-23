import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string | null;
  author: string;
  created_at: string;
  created_by: string;
}

interface FetchPostParams {
  search?: string;
  sortOrder: "asc" | "desc";
  start: number;
  end: number;
}

interface PostsState {
  posts: Post[];
  post: Post | null;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  post: null,
  total: 0,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params: FetchPostParams): Promise<{ data: Post[]; total: number }> => {
    const { search, sortOrder, start, end } = params;
    let query = supabase
      .from<"posts", Post>("posts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: sortOrder === "asc" })
      .range(start, end);

    if (search) {
      query = query.or(
        `title.ilike.%${params.search}%,description.ilike.%${params.search}%`
      );
    }

    const { data, count, error } = await query;

    if (error) throw new Error(error.message);

    return { data: data || [], total: count || 0 };
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: string) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single<Post>();

    if (error) throw new Error(error.message);
    return data;
  }
);

export const createPost = createAsyncThunk<
  Post[],
  {
    title: string;
    content: string;
    description: string;
    author: string;
    imageUrl: string | null;
  }
>(
  "posts/createPost",
  async ({ title, content, description, author, imageUrl }) => {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, description, author, imageUrl }])
      .select();

    if (error) throw new Error(error.message);
    console.log(data);
    return data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({
    id,
    title,
    content,
    description,
    author,
    imageUrl,
  }: {
    id: string;
    title: string;
    content: string;
    description: string;
    author: string;
    imageUrl: string;
  }) => {
    const updates: Partial<Post> = {};
    console.log("imgeurl", imageUrl);
    if (title !== undefined || title !== null) updates.title = title;
    if (content !== undefined || content !== null) updates.content = content;
    if (description !== undefined || description !== null)
      updates.description = description;
    if (author !== undefined || author !== null) updates.author = author;
    if (imageUrl !== undefined || imageUrl !== null)
      updates.imageUrl = imageUrl;

    if (Object.keys(updates).length === 0) {
      return {};
    }

    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return id;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.post = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<{ data: Post[]; total: number }>) => {
          state.loading = false;
          state.posts = action.payload.data;
          state.total = action.payload.total;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          console.log(action.payload);
          state.loading = false;
          state.post = action.payload;
        }
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch post";
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post[]>) => {
        console.log(action.payload);
        state.loading = false;
        state.posts.unshift(...action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create post";
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update post";
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});
export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
