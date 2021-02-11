// a function that returns all of the days in this week as timestamps from the timestamp for Monday

//note monday was chosen as the first day of the week. Please note that Monday is not acutally the first day of the week.
export default (timesStampOfMonday) => {
  let sel = new Date(timesStampOfMonday)
  //sel is now monday
  let out = [sel.getTime()]
  for (let i = 1; i < 7; i++) {
    let nextDay = new Date(sel.getTime())//clone of sel
    nextDay.setDate(sel.getDate() + i)//move dateAlong i
    out.push(nextDay.getTime())
  }
  return out
}