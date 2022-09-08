const UNIXTimeToHHmm = (UNIXTime: number): string => {
    const date = new Date(UNIXTime);
    const h = date.getHours();
    const m = date.getMinutes();
    const HHmm = `${h}:${("" + m).padStart(2, "0")}`;
    return HHmm;
};
const UNIXTimeToYYYYMMDD = (UNIXTime: number): string => {
    const date = new Date(UNIXTime);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const YYYYMMDD = `${y}/${m}/${d}`;
    return YYYYMMDD;
};

export { UNIXTimeToHHmm, UNIXTimeToYYYYMMDD };
