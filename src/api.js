import { format } from "date-fns";

const apiDateFormat = "dd.MM.yyyy";
const proxy = "https://secure-headland-28756.herokuapp.com";

export function loadRates(date) {
  const formattedDate = format(new Date(date), apiDateFormat);

  return fetch(`${proxy}?date=${formattedDate}`)
    .then((r) => r.json())
    .then((r) => r.exchangeRate);
}
