export const formatDateElapsed = (time: string | number) => {
  const currentDateTime = Date.now() / (1000 * 60 * 60 * 24);
  const currentHourTime = Date.now() / (1000 * 60 * 60);
  const currentMinuteTime = Date.now() / (1000 * 60);
  const dateTime = new Date(time).getTime() / (1000 * 60 * 60 * 24);
  const hourTime = new Date(time).getTime() / (1000 * 60 * 60);
  const minuteTime = new Date(time).getTime() / (1000 * 60);
  let diffTime = currentDateTime - dateTime;

  if (diffTime >= 365) {
    return `${Math.floor(diffTime / 365)} 년 전`;
  }
  if (diffTime > 31) {
    return `${Math.floor(diffTime / 30)} 달 전`;
  }
  if (diffTime >= 1) {
    return `${Math.floor(diffTime)}일 전`;
  }
  if (diffTime > 0.01) {
    diffTime = currentHourTime - hourTime;
    return `약 ${Math.floor(diffTime <= 1 ? 1 : diffTime)} 시간 전`;
  }
  if (diffTime > 0) {
    diffTime = currentMinuteTime - minuteTime;
    return `약 ${Math.floor(diffTime <= 1 ? 1 : diffTime)} 분 전`;
  }
  return `방금 전`;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDateToMDY = (date: string | number) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate().toString().padStart(2, "0");

  return `${MONTHS[month]} ${day}, ${year}`;
};
