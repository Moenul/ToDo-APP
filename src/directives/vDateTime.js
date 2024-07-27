import { useDateFormat } from "@vueuse/core";
export const vDateTime = (get_date, get_format) => {
    let date = new Date(get_date);
    const formated = useDateFormat(date, get_format);
    return formated.value;
};