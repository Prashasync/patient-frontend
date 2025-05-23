import { format, isToday, isYesterday } from "date-fns";

export const getDateLabel = (date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d, yyyy");
};
