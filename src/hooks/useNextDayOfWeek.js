import moment from "moment";

export default function useNextDayOfWeek(
  dayOfWeekIndex,
  format = "DD.MM.YYYY"
) {
  let now = new Date();
  let result = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + ((7 + dayOfWeekIndex - now.getDay()) % 7)
  );

  if (result < now) {
    result.setDate(result.getDate() + 7);
  }

  return moment(result).format(format);
}
