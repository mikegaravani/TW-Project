// Function that creates the pomodoro session

const blueColor = "#007bff";
const greenColor = "#28a745";

// Inputs: session length (hours and minutes), session intensity, cycle length (short or long)
// hours -> int (0-23)
// minutes -> int (0-59)
// intensity -> int (1-3) [1 = chill, 2 = medium, 3 = intense]
// longCycles -> bool [true = long, false = short]

// Outputs: an object with the session steps, consisting of alternating focus and relax times

// Example 1:

// sessionCrafter(1, 0, 3, true) ->
// [
//   { time: "25 min", description: "FOCUS", color: blueColor },
//   { time: "5 min", description: "RELAX", color: greenColor },
//   { time: "30 min", description: "FOCUS", color: blueColor },
// ];

// Example 2:

// sessionCrafter(4, 0, 1, true) ->
// [
//   { time: "50 min", description: "FOCUS", color: blueColor },
//   { time: "10 min", description: "RELAX", color: greenColor },
//   { time: "55 min", description: "FOCUS", color: blueColor },
//   { time: "10 min", description: "RELAX", color: greenColor },
//   { time: "55 min", description: "FOCUS", color: blueColor },
//   { time: "10 min", description: "RELAX", color: greenColor },
//   { time: "50 min", description: "FOCUS", color: blueColor },
// ];

export function sessionCrafter(hours, minutes, intensity, longCycles) {
  const totalMinutes = hours * 60 + minutes;
  if (totalMinutes <= 30) {
    // If the session is 30 minutes or less, return a single focus session
    return convertResult(totalMinutes);
  }
}

// Converts the array of time sequences into a more verbose format

// Example: convertResult([25, 5, 30]) ->
// [
//   { time: "25 min", description: "FOCUS", color: blueColor },
//   { time: "5 min", description: "RELAX", color: greenColor },
//   { time: "30 min", description: "FOCUS", color: blueColor },
// ];

function convertResult(arr) {
  if (!Array.isArray(arr)) {
    arr = [arr];
  }
  return arr.map((time, index) => {
    if (index % 2 === 0) {
      return { time: `${time} min`, description: "FOCUS", color: blueColor };
    } else {
      return { time: `${time} min`, description: "RELAX", color: greenColor };
    }
  });
}
