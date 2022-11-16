import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const ProductApi = createApi({
  reducerPath: 'Product Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/products` }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/',
    }),
    getProductById: builder.query({
      query: (product_id) => `/${product_id}`,
    }),
    createProduct: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ product_id, ...data }) => ({
        url: `/${product_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (product_id) => ({
        url: `/${product_id}`,
        method: 'DELETE',
      }),
    }),
    getAllItems: builder.query({
      query: (product_id) => `/${product_id}/items`,
    }),
    createItem: builder.mutation({
      query: ({ product_id, ...data }) => ({
        url: `/${product_id}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateItem: builder.mutation({
      query: ({ product_id, item_id, ...data }) => ({
        url: `/${product_id}/items/${item_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    DeleteItem: builder.mutation({
      query: ({ product_id, item_id }) => ({
        url: `/${product_id}/items/${item_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = ProductApi;

export default ProductApi;
