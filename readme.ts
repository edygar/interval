/**
 * # Shell interval helper
 *
 * Quick deno helper to call given command each given time.
 *
 * ## Installation:
 *
 * ```sh
 * deno install -f --allow-run -n interval https://raw.githubusercontent.com/edygar/readme.ts
 * ```
 *
 * ## Usage
 *
 * First argument is the amount of time in seconds or specified unit (milliseconds, seconds, minutes, and day available)
 * and the rest is the command that's going to be run
 *
 * ```sh
 * interval 10 cmd-to-execute --arg1 arg2 …
 * interval 10s cmd-to-execute --arg1 arg2 …
 * interval 2m cmd-to-execute --arg1 arg2 …
 * ```
 **/
const args = Array.from(Deno.args)
if (args.length < 2) throw new Error("No command was provided");

const time = parseTime(args.shift() ?? "");
const cmd = args.map(String);

for await (let _ of interval(time)) {
  await Deno.run({ cmd });
}

/**
 * Generator that takes the given time between each yielding
 *
 * @param time amount of time each yielding will take
 */
async function* interval(time: number) {
  do {
    yield await new Promise(resolve => setTimeout(resolve, time));
  } while (true);
}

/**
 * Parses given parameter into time, assumes seconds if numeric
 * and returns in microseconds.
 *
 * @param time raw argument to be parsed into
 */
function parseTime(time: string | number) {
  if (!Number.isNaN(Number(time))) return Number(time) * 1000;

  const parsingResult = String(time).match(/([0-9.,]+)([a-z]+)/i) || [false];

  if (parsingResult[0] === false) {
    throw new Error(`Couldn't parse given time "${time}"`);
  }

  const amount = parseFloat(String(parsingResult[1]));
  const unit = String(parsingResult[2]);

  const s = 1000; // second
  const m = s * 60; // minute
  const h = m * 60; // hour
  const d = h * 24; // day

  switch (unit.toLowerCase()) {
    case "days":
    case "day":
    case "d":
      return amount * d;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return amount * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return amount * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return amount * s;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return amount;
    default:
      throw new Error(`Unknown unit "${unit}"`);
  }
}
