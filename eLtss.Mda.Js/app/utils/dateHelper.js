import moment from 'moment';
export function formatJsonDate(jsonDateString) {
  if (jsonDateString) {
    return moment(jsonDateString).utcOffset(moment().utcOffset()).format('MM/DD/YYYY');
  }
  return '';
}
export function formatJsonDateTime(jsonDateString,format) {
  if (jsonDateString) {
    if(format)
    {      
      return moment(jsonDateString).utcOffset(moment().utcOffset()).format(format);
    }
    return moment(jsonDateString).utcOffset(moment().utcOffset()).format('MM/DD/YYYY HH:mm:SS');
  }
  return '';
}
export function formatJsonDateString(date) {
  if (date) {
    return "/Date(" + new Date(date).getTime() + ")/";
  }
  return '';
}


