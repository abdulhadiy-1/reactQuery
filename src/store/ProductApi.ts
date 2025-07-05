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
      query: ({ id }) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetOneProductsQuery } = productApi;
