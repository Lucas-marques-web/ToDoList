// export a function that returns the current date formated
exports.getDate = getDate();

function getDate(){
    const date = new Date();

    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
  
    }
    let day = date.toLocaleDateString("en-US", options);
    return day
}

// export a function that returns the current day formated
exports.getDay = getDay();

function getDay(){
    const date = new Date();

    const options = {
      weekday: 'long'

    }
    let day = date.toLocaleDateString("en-US", options);
    return day
}