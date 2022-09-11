const dateToHHmm = (date: Date): string => {
    const h = date.getHours();
    const m = date.getMinutes();
    const HHmm = `${h}:${("" + m).padStart(2, "0")}`;
    return HHmm;
};
const dateToYYYYMMDD = (date: Date): string => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const YYYYMMDD = `${y}/${m}/${d}`;
    return YYYYMMDD;
};

export { dateToHHmm, dateToYYYYMMDD };
