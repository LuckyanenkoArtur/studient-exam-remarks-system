import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { users } from "../../../../data/users";
import { UserManager } from "../../../../models/User";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: (credentials) => {
        // Check users in localStorage first
        const localUsers = UserManager.getUsers();
        const userFromLocalStorage = localUsers.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );

        if (userFromLocalStorage) {
          const { password, ...userWithoutPassword } = userFromLocalStorage;
          return { data: { user: userWithoutPassword } };
        }

        // If user not found in localStorage, fallback to users.json
        const userFromFile = users.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );

        if (userFromFile) {
          // Add user to localStorage
          try {
            UserManager.createUser(
              userFromFile.username,
              userFromFile.password
            );
          } catch (error) {
            console.error("Error adding user to localStorage:", error.message);
          }

          const { password, ...userWithoutPassword } = userFromFile;
          return { data: { user: userWithoutPassword } };
        }

        // If user not found in both sources, return an error
        return {
          error: {
            status: 401,
            data: {
              message: "Неверный логин или пароль",
            },
          },
        };
      },
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: null }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
