// use-client.ts
import { useMemo } from "react";
import { ServiceType } from "@bufbuild/protobuf";
import {
    createConnectTransport,
    createPromiseClient,
    PromiseClient,
} from "@bufbuild/connect-web";

// This transport is going to be used throughout the app
const transport = createConnectTransport({
    baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT!,
});

/**
 * Get a promise client for the given service.
 */
export function useClient<T extends ServiceType>(service: T): PromiseClient<T> {
    // We memoize the client, so that we only create one instance per service.
    return useMemo(() => createPromiseClient(service, transport), [service]);
}
