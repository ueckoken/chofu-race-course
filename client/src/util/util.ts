import { RaceOrder } from "../../_proto/spec/v1/userdata_pb";
import {
    RaceOrder_NoteType,
    HorseDetail_Image_ImageType,
} from "../../_proto/spec/v1/userdata_pb";

const raceOrderToString = (order: RaceOrder): string => {
    const type = order.orderOneof.case;
    if (type === "order") {
        return order.orderOneof.value + "";
    } else if (type === "note") {
        if (order.orderOneof.value === RaceOrder_NoteType.CANCEL) {
            return "取消";
        } else if (order.orderOneof.value === RaceOrder_NoteType.GIVEUP) {
            return "中止";
        } else if (order.orderOneof.value === RaceOrder_NoteType.EXCLUDE) {
            return "除外";
        } else {
            throw new Error();
        }
    } else {
        throw new Error();
    }
};

export type Order = "1st" | "2nd" | "3rd" | "4th" | RaceOrder_NoteType;
const stringToRaceOrder = (order: Order): RaceOrder => {
    switch (order) {
        case "1st":
            return new RaceOrder({ orderOneof: { value: 1, case: "order" } });
        case "2nd":
            return new RaceOrder({ orderOneof: { value: 2, case: "order" } });
        case "3rd":
            return new RaceOrder({ orderOneof: { value: 3, case: "order" } });
        case "4th":
            return new RaceOrder({ orderOneof: { value: 4, case: "order" } });
        case RaceOrder_NoteType.CANCEL.toString():
            return new RaceOrder({
                orderOneof: { value: RaceOrder_NoteType.CANCEL, case: "note" },
            });
        case RaceOrder_NoteType.EXCLUDE.toString():
            return new RaceOrder({
                orderOneof: { value: RaceOrder_NoteType.EXCLUDE, case: "note" },
            });
        case RaceOrder_NoteType.GIVEUP.toString():
            return new RaceOrder({
                orderOneof: { value: RaceOrder_NoteType.GIVEUP, case: "note" },
            });
    }
    throw new Error();
};

const stringToImageType = (str: string): HorseDetail_Image_ImageType => {
    if (str === "gif") {
        return HorseDetail_Image_ImageType.GIF;
    } else if (str === "jpeg") {
        return HorseDetail_Image_ImageType.JPEG;
    } else if (str === "png") {
        return HorseDetail_Image_ImageType.PNG;
    }
    throw new Error();
};

export { raceOrderToString, stringToRaceOrder, stringToImageType };
