// Function that creates the pomodoro session

const blueColor = "#007bff";
const greenColor = "#28a745";

const SHORT_CYCLE_MINUTES = 35;
const LONG_CYCLE_MINUTES = 60;

const INTENSITY_CHILL_PERCENTAGE = 23;
const INTENSITY_MEDIUM_PERCENTAGE = 17;
const INTENSITY_INTENSE_PERCENTAGE = 10;

// TODO - ASYNC AWAIT add

// Inputs: session length (hours and minutes), session intensity, cycle length (short or long)
// hours -> int (0-23)
// minutes -> int (0-59)
// intensity -> int (1-3) [1 = chill, 2 = medium, 3 = intense]
// longCycles -> bool [true = long, false = short]

// Outputs: an object with the session steps, consisting of alternating focus and relax times

// Example 1:

// sessionCrafter(1, 0, 3, false) ->
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
  // TODO "randomize" cycleLength in short/long range
  const cycleLength = longCycles ? LONG_CYCLE_MINUTES : SHORT_CYCLE_MINUTES;
  const intensityMapping = {
    1: INTENSITY_CHILL_PERCENTAGE,
    2: INTENSITY_MEDIUM_PERCENTAGE,
    3: INTENSITY_INTENSE_PERCENTAGE,
  };
  const intensityPercentage =
    intensityMapping[intensity] || INTENSITY_MEDIUM_PERCENTAGE;

  const relaxMinutes = Math.round(cycleLength * (intensityPercentage / 100));
  const focusMinutes = cycleLength - relaxMinutes;

  let fullCycles = Math.floor(totalMinutes / cycleLength);
  let extraMinutes = totalMinutes % cycleLength;
  let finalRelaxNotIncludedInExtraMinutes = false;

  // TODO remove logs
  console.log(
    `Pre algorithm stats:
    Total time: ${totalMinutes}
    Full cycles: ${fullCycles}
    Extra minutes: ${extraMinutes}
    Relax 1 length: ${relaxMinutes}
    Focus 1 length: ${focusMinutes}
    Intensity percentage: ${intensityPercentage}`
  );

  if (extraMinutes >= focusMinutes) {
    fullCycles++;
    extraMinutes -= focusMinutes;
    finalRelaxNotIncludedInExtraMinutes = true;
  } else {
    // The last cycle will not include the relax minutes, since a session can't end with a relax
    extraMinutes += relaxMinutes;
  }

  console.log(
    `Pre algorithm stats 2:
    Total time: ${totalMinutes}
    Full cycles: ${fullCycles}
    Cycles have increased: ${finalRelaxNotIncludedInExtraMinutes}
    Extra minutes: ${extraMinutes}
    Relax 1 length: ${relaxMinutes}
    Focus 1 length: ${focusMinutes}
    Intensity percentage: ${intensityPercentage}`
  );

  if (fullCycles < 2) {
    if (fullCycles == 1 && extraMinutes - relaxMinutes >= focusMinutes / 2) {
      console.log("Extra minutes are enough for a full cycle");
      const middleRelaxMinutes =
        relaxMinutes + relaxMinutes * (intensityPercentage / 100);
      return [
        Math.round(focusMinutes),
        Math.round(middleRelaxMinutes),
        Math.round(totalMinutes - focusMinutes - middleRelaxMinutes),
      ];
    }
    // TODO DISPLAY WARNING MESSAGE IN UI FOR THIS !!!!!!!
    else {
      return [Math.round(totalMinutes * (1 - intensityPercentage / 100))];
    }
  }

  let sessionArray = [];

  for (let i = 0; i < fullCycles; i++) {
    sessionArray.push(focusMinutes);
    if (i !== fullCycles - 1) {
      sessionArray.push(relaxMinutes);
    }
  }

  console.log(
    `Sessionarray initalized: ${sessionArray}
    extra time: ${extraMinutes}`
  );

  // Check extraMinutes ratio of focus/break time
  let extraRelaxMinutes;
  if (finalRelaxNotIncludedInExtraMinutes) {
    extraRelaxMinutes = Math.round(extraMinutes * (intensityPercentage / 100));
  } else {
    extraRelaxMinutes =
      relaxMinutes +
      Math.round((extraMinutes - relaxMinutes) * (intensityPercentage / 100));
  }
  let extraFocusMinutes = extraMinutes - extraRelaxMinutes;

  console.log(
    `Extra focus and relax minutes to add to cycles:
    extra focus: ${extraFocusMinutes}
    extra relax: ${extraRelaxMinutes}`
  );

  const FOCUS_MINUTES_TO_ADD_PER_CYCLE = 5;
  const RELAX_MINUTES_TO_ADD_PER_CYCLE = 3;

  const cycleSequence = generateCurrentCycleSequence(fullCycles);
  let iter = 0;
  while (extraMinutes > 0) {
    const currentCycleToIncrease = cycleSequence[iter];

    if (extraFocusMinutes >= FOCUS_MINUTES_TO_ADD_PER_CYCLE) {
      sessionArray[(currentCycleToIncrease - 1) * 2] +=
        FOCUS_MINUTES_TO_ADD_PER_CYCLE;
      extraMinutes -= FOCUS_MINUTES_TO_ADD_PER_CYCLE;
      extraFocusMinutes -= FOCUS_MINUTES_TO_ADD_PER_CYCLE;
    } else if (extraFocusMinutes) {
      sessionArray[(currentCycleToIncrease - 1) * 2] += extraFocusMinutes;
      extraMinutes -= extraFocusMinutes;
      extraFocusMinutes = 0;
    }

    if (extraRelaxMinutes >= RELAX_MINUTES_TO_ADD_PER_CYCLE) {
      sessionArray[(currentCycleToIncrease - 1) * 2 + 1] +=
        RELAX_MINUTES_TO_ADD_PER_CYCLE;
      extraMinutes -= RELAX_MINUTES_TO_ADD_PER_CYCLE;
      extraRelaxMinutes -= RELAX_MINUTES_TO_ADD_PER_CYCLE;
    } else if (extraRelaxMinutes) {
      sessionArray[(currentCycleToIncrease - 1) * 2 + 1] += extraRelaxMinutes;
      extraMinutes -= extraRelaxMinutes;
      extraRelaxMinutes = 0;
    }

    console.log(
      `Added extra minutes to cycle ${currentCycleToIncrease}:
      extra focus left: ${extraFocusMinutes}
      extra relax left: ${extraRelaxMinutes}`
    );

    iter++;
    if (iter === cycleSequence.length) {
      iter = 0;
    }
  }

  return sessionArray;
}

function generateCurrentCycleSequence(fullCycles) {
  const middle = Math.round(fullCycles / 2);
  let sequence = [];
  sequence.push(middle);
  let offset = 1;

  while (middle > offset) {
    if (fullCycles % 2 === 0) {
      if (middle + offset !== fullCycles) {
        sequence.push(middle + offset);
      }
      sequence.push(middle - offset);
    } else {
      sequence.push(middle - offset);
      if (middle + offset !== fullCycles) {
        sequence.push(middle + offset);
      }
    }
    offset++;
  }

  return sequence;
}

// DISCARDED FUNCTION (maybe only temporarily)

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

// TODO evenyually remove this
console.log(sessionCrafter(0, 9, 2, false));
