import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products","Computers"],
    endpoints: (build)=>({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getComputers: build.query({
            query: ()=>"client/computers",
            providesTags:["Computers"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetComputersQuery,
} = api;