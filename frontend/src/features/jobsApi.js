import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const jobsApi = createApi({
    reducerPath: "jobsApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/"
    }),

    endpoints: (builder) => ({

        createJob: builder.mutation({
            query: (data) => ({
                url: "jobs",
                method: "POST",
                body: data
            })
        }),

        getJobs: builder.query({
            query: () => "jobs"
        }),

        getSingleJob: builder.query({
            query: (id) => `jobs/${id}`
        })

    })
})

export const {
    useCreateJobMutation,
    useGetJobsQuery,
    useGetSingleJobQuery
} = jobsApi