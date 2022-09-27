import { RaceOrder } from "../../_proto/spec/v1/userdata_pb";
import { RaceOrder_NoteType } from "../../_proto/spec/v1/userdata_pb";

const raceOrderToString = (order: RaceOrder): string => {
    const type = order.orderOneof.case;
    if (type === "order") {
        return order.orderOneof.value + "";
    } else if (type === "note") {
        if (order.orderOneof.value === RaceOrder_NoteType.CANCEL) {
            return "取消";
        } else if (order.orderOneof.value === RaceOrder_NoteType.GIVEUP) {
            return "中止";
        } else {
            throw new Error();
        }
    } else {
        throw new Error();
    }
};

export { raceOrderToString };
