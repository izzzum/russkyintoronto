import Ember from 'ember';

export function getDate(unix_timestamp/*, hash*/) {
unix_timestamp = unix_timestamp.toString();
  let date = new Date(unix_timestamp*1000);
  //time
  let hours = date.getHours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  //date
  const monthNames = [
    "Январь", "Февраль", "Март",
    "Апрель", "Май", "Июнь", "Июль",
    "Август", "Сентябрь", "Октябрь",
    "Ноябрь", "Декабрь"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  // will display time in 'Month 31, 2099, 23:59:59' format
  let formattedTime = `${monthNames[monthIndex]} ${day}, ${year}, ${hours}:${minutes}:${seconds}`;
  return formattedTime;
}

export default Ember.Helper.helper(getDate);
