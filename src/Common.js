function getDayKey( dayObj ) {
  return [
    dayObj.getFullYear(),
    (dayObj.getMonth() + '1').padStart(2, '0'),
    dayObj.getDate()
  ].join('-');
}

module.exports.getDayKey = getDayKey;
