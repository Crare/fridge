
/**
 * date converted to string in format 'dd.MM.YYYY'
 * @var date a Javascript Date object.
 * @returns a date string in format 'dd.MM.YYYY'
 */
export const dateToString = (date) => {
  if (!date ||date.constructor.name === 'String') {
    return date;
  }

  const day = date.getDate() < 10 ? ('0'+date.getDate()) : date.getDate();
  const month = (date.getMonth()+1) < 10 ? ('0'+(date.getMonth()+1)) : (date.getMonth()+1);
  const year = date.getFullYear();
  
  return `${day}.${month}.${year}`;
}

/**
 * converts dateString to Javascript Date object.
 * @var dateString a string in format 'dd.MM.YYYY'
 * @returns Date object
 */
export const stringToDate = (dateString) => {
  if (!dateString || dateString.constructor.name === 'Date') {
    return dateString;
  }

  const day = dateString.substring(0,2);
  const month = dateString.substring(3,5);
  const year = dateString.substring(6,10);
  
  return new Date(`${year}-${month}-${day}`);
}