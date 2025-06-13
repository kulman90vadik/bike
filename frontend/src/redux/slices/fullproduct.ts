import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
// import { BasketProps } from '../../propstype';
import { RootState } from "../store";
import { FormReview, IComment, ProductProps } from "../../propstype";

// type DeleteReviewPayload = {
//   productId: string;
//   reviewId: string;
// };

type EditReviewPayload = {
  productId: string;
  reviewId: string;
  text: string;
  rating: number;
};

type reviewPayload = {
  id: string;
  values: FormReview;
  rating: number;
};

export const fetchProduct = createAsyncThunk<ProductProps, string, { state: RootState }>("auth/fetchProduct", async (productId) => {
  const { data } = await axios.get<ProductProps>(`./products/${productId}`);
  return data;
});

// export const fetchDelProductComment = createAsyncThunk< ProductProps, DeleteReviewPayload, { state: RootState }>("auth/fetchDelProductComment", async ({ productId, reviewId }) => {
//   const { data } = await axios.delete<ProductProps>( `./products/${productId}/comments/${reviewId}` );
//   return data;
// });


export const fetchDelProductComment = createAsyncThunk<
  { deletedCommentId: string }, // <--- Ответ от сервера (payload от fulfilled)
  { productId: string; reviewId: string } // <--- Аргументы, которые ты передаёшь в thunk
>("auth/fetchDelProductComment", async ({ productId, reviewId }) => {
  const { data } = await axios.delete<{ deletedCommentId: string }>(`/products/${productId}/comments/${reviewId}`);
  return data;
});






export const fetchEditProductComment = createAsyncThunk<
  { updatedComment: IComment }, // типизируем ответ
  EditReviewPayload,
  { state: RootState }
>(
  "auth/fetchEditProductComment",
  async ({ productId, reviewId, text, rating }) => {
    const { data } = await axios.patch(`/products/${productId}/comments/${reviewId}`, { text, rating });
    return data;
  }
);



export const fetchProductComment = createAsyncThunk< ProductProps, reviewPayload, { state: RootState }>("auth/fetchProductComment", async ({ id, values, rating }) => {
  const payload = { ...values, rating };
  const { data } = await axios.patch<ProductProps>(`/products/${id}/comments`, payload);
  return data;
});

export const fetchLikeComment = createAsyncThunk<ProductProps, { id: string; idcomment: string, like: string }>("auth/fetchLikeComment", async ({ id, idcomment, like }) => {
  const { data } = await axios.patch<ProductProps>(`./products/${id}/comments/${idcomment}/${like}`);
  return data;
});



type Props = {
  data: ProductProps | null;
  status: string;
};

const initialState: Props = {
  data: null,
  status: "loading",
};




const fullProductSlice = createSlice({
  name: "fullProduct",
  initialState,
  reducers: {
    //         // logout: (state) => {
    //         //     state.data = null;
    //         // }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = "loading";
      // state.data = [];
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });

    // fetchDelProductComment

    builder.addCase(fetchDelProductComment.pending, (state) => {
      state.status = "loading";
      // state.data = [];
    });
    builder.addCase(fetchDelProductComment.fulfilled, (state, action) => {
      state.status = "loaded";
    
      const deletedCommentId = action.payload.deletedCommentId;
    
      if (state.data) {
        state.data.comments = state.data.comments.filter(
          (comment) => comment._id !== deletedCommentId
        );
      }
    });
    
    builder.addCase(fetchDelProductComment.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });

    // fetchProductComment

    builder.addCase(fetchProductComment.pending, (state) => {
      state.status = "loading";
      // state.data = [];
    });
    builder.addCase(fetchProductComment.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchProductComment.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });

    // fetchLikeComment

    builder.addCase(fetchLikeComment.pending, (state) => {
      state.status = "loading";
      // state.data = [];
    });
    builder.addCase(fetchLikeComment.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchLikeComment.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });

    // fetchEditProductComment

    builder.addCase(fetchEditProductComment.pending, (state) => {
      state.status = "loading";
      // state.data = [];
    });


    builder.addCase(fetchEditProductComment.fulfilled, (state, action) => {
      state.status = "loaded";
    
      const updatedComment = action.payload.updatedComment;
    
      if (state.data) {
        const commentIndex = state.data.comments.findIndex((comment) => comment._id === updatedComment._id // Вот здесь правильно
        );
    
        if (commentIndex !== -1) {
          state.data.comments[commentIndex] = updatedComment;
        }
      }
    });

    

    builder.addCase(fetchEditProductComment.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
  },
});

export const fullProductReducer = fullProductSlice.reducer;
