
export const getDateLabel = (dateStr) => {
  const today = new Date();
  const messageDate = new Date(dateStr);

  const isToday = today.toDateString() === messageDate.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const isYesterday = yesterday.toDateString() === messageDate.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return messageDate.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};


  