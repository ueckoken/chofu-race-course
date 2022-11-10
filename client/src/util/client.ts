import {
    createConnectTransport,
    createPromiseClient,
} from "@bufbuild/connect-web";
import {
    HorseDataService,
    RaceDataService,
    UserDataService,
} from "../../_proto/spec/v1/userdata_connectweb";

const transport = createConnectTransport({
    baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT!,
});

const horseClient = createPromiseClient(HorseDataService, transport);
const raceClient = createPromiseClient(RaceDataService, transport);
const userClient = createPromiseClient(UserDataService, transport);

export { horseClient, raceClient, userClient };
