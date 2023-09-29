import moment from "moment";

export function convertIsoDateToDDMMYYYY(isoDateString: string) {
  if (!isoDateString) {
    return ""
  }
  return moment(isoDateString).format("DD/MM/YYYY")
}

 export function convertIsoDateToYYYYMMDD(isoDateString: string) {
   return moment(isoDateString).format("YYYY/MM/DD")
}