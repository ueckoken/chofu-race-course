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

const stringToRaceOrder = (order: string): RaceOrder => {
    console.log(order);
    const tmp = new RaceOrder();
    switch (order) {
        case "1st":
            tmp.orderOneof.value = 1;
            tmp.orderOneof.case = "order";
            return tmp;
        case "2nd":
            tmp.orderOneof.value = 2;
            tmp.orderOneof.case = "order";
            return tmp;
        case "3rd":
            tmp.orderOneof.value = 3;
            tmp.orderOneof.case = "order";
            return tmp;
        case "4th":
            tmp.orderOneof.value = 4;
            tmp.orderOneof.case = "order";
            return tmp;
        case RaceOrder_NoteType.CANCEL.toString():
            tmp.orderOneof.value = 1;
            tmp.orderOneof.case = "note";
            return tmp;
        case RaceOrder_NoteType.EXCLUDE.toString():
            tmp.orderOneof.value = 3;
            tmp.orderOneof.case = "note";
            return tmp;
        case RaceOrder_NoteType.GIVEUP.toString():
            tmp.orderOneof.value = 2;
            tmp.orderOneof.case = "note";
            return tmp;
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
