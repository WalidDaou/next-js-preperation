// hooks/useApi.ts
import useApiRequest from "./useApiRequest";

export function useApi() {
    const request = useApiRequest();

    return {
        get: (endpoint: string) =>
            request.makeRequest({
                type: "GET",
                endpoint,
            }),

        post: (endpoint: string, body: unknown) =>
            request.makeRequest({
                type: "POST",
                endpoint,
                body,
            }),

        loading: request.loading,
        errors: request.errors,
        called: request.called,
    };
}