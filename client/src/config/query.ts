import { QueryClientConfig } from "@tanstack/react-query";

export const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
};
