import dayjs from "dayjs";

export const getToday = (): string => {
  return dayjs().format("YYYY-MM-DD");
};

export const getLast7Days = (): string[] => {
  const dates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
    dates.push(date);
  }
  return dates
};
