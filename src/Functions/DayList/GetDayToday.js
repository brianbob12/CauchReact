// a function that returns today as a timestamp
export default () => {
  let x = (new Date(Date.now())).toString().split(" ")
  let y = ""
  for (let i = 0; i < 4; i++) {
    y += x[i] + " "
  }
  return Date.parse(y)
}