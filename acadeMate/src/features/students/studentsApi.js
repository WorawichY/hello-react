import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE = import.meta.env.VITE_STUDENT_API_URL;

export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ['Student'],
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: () => '',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Student', id })),
                        { type: 'Student', id: 'LIST' },
                    ]
                    : [{ type: 'Student', id: 'LIST' }],
        }),
        getStudentById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Student', id }],
        }),
        addStudent: builder.mutation({
            query: (newStudent) => ({
                url: '',
                method: 'POST',
                body: newStudent,
            }),
            invalidatesTags: [{ type: 'Student', id: 'LIST' }],
        }),
        updateStudent: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchList = dispatch(
                    studentsApi.util.updateQueryData('getStudents', undefined, (draft) => {
                        const item = draft.find((s) => s.id === id);
                        if (item) Object.assign(item, patch);
                    })
                );
                const patchDetail = dispatch(
                    studentsApi.util.updateQueryData('getStudentById', id, (draft) => {
                        Object.assign(draft, patch);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchList.undo();
                    patchDetail.undo();
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }],
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Student', id },
                { type: 'Student', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useAddStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
} = studentsApi;
