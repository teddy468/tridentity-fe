import moment from "moment";

export const formatDateTime = (dateString: string): string => {
  const date: Date = new Date(dateString);
  return moment(date).format("YYYY-MM-DD, HH:mm");
};

export const getCurrency = (currency: string): string => {
  switch (currency) {
    case "usd":
      return "";
    case "vnd":
      return "₫";
    case "sgd":
      return "S";
    default:
      return "$";
  }
};
