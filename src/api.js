import { format } from "date-fns";

const apiDateFormat = "dd.MM.yyyy";
const proxy = "https://proxy-server-for-private-api.onrender.com";

export function loadRates(date) {
  const formattedDate = format(new Date(date), apiDateFormat);

  return fetch(`${proxy}?date=${formattedDate}`)
    .then((r) => r.json())
    .then((r) => r.exchangeRate);
}
