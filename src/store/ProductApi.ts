import { API } from "@/hooks/gerEnv";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getOneProducts: builder.query({
      query: ({ id }) => ({
        method: "get",
        url: `/products/${id}`,
      }),
    }),
    createProduct: builder.mutation({
      query: ({ body }) => ({
        method: "post",
        url: "/products",
        body,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({id, body}) => ({
        method: "put",
        url: `/products/${id}`,
        body
      })
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        method: "delete",
        url: `/products/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetOneProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productApi;
