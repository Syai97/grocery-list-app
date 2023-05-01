import { format } from "date-fns";

export const computeDefaultInputTime = (dateTime: string | Date) => {
  if (!dateTime) return "";
  const dt = new Date(dateTime);
  return format(dt, "HH:mm");
};
export const computeInputTime = (time: string) => {
  return new Date(`2022-01-01T${time}`);
};

export const computeDefaultInputDate = (dateTime: string | Date) => {
  if (!dateTime) return "";
  const dt = new Date(dateTime);
  return format(dt, "yyyy-MM-dd");
};
export const computeInputDate = (date: string) => {
  return date;
};

export const computeDefaultDateTimeLocal = (dateTime: string | Date) => {
  return `${format(new Date(dateTime), "yyyy-MM-dd")}T${format(new Date(dateTime), "HH:mm")}`
}
export const computeDateTimeLocal = (dateTime: string | Date) => {
  return computeDefaultDateTimeLocal(dateTime);
}

export const renameRef = (rhfProps: any) => {
  const { ref: innerRef, ...tR } = rhfProps;
  return { innerRef, ...tR };
};