import { unref, ref } from "vue";
import { date } from "quasar";

export function useTimerTools(format = "HH:mm:ss") {
    // if maybeRef is indeed a ref, its .value will be returned
    // otherwise, maybeRef is returned as-is
    // const value = unref(maybeRef)

    const offset = 60 * 60 * 1000 - 1;

    function convertDateToMillis(duration_date) {
        let result = 0;
        duration_date = unref(duration_date);
        // result += duration_date.getYear()    * 1000 * 60 * 60 * 24 * 12 * ?????
        // result += duration_date.getMonth()   * 1000 * 60 * 60 * 24 * 12
        // result += duration_date.getDate()    * 1000 * 60 * 60 * 24
        result += duration_date.getHours() * 1000 * 60 * 60;
        result += duration_date.getMinutes() * 1000 * 60;
        result += duration_date.getSeconds() * 1000;
        result += duration_date.getMilliseconds();
        return result;
    }

    function convertTimeStrToDuration(time_str) {
        // console.group("convert_time_str_to_duration")
        // console.log(`time_str: ${time_str}`)
        let duration = convertDateToMillis(date.extractDate(unref(time_str), unref(format)));
        // console.log(`duration: ${duration}`)
        // console.groupEnd()
        return duration;
    }

    function convertDurationToTimeStr(duration) {
        // we have to subtract a hour
        // i do not remember why exactly - just that i stumbled across this before..
        let time_string = "";
        if (duration < 0) {
            time_string = date.formatDate(unref(duration * -1) - offset, unref(format));
            time_string = "-" + time_string;
        } else {
            time_string = date.formatDate(unref(duration) - offset, unref(format));
        }
        return time_string;
    }

    function durationFormatted(duration) {
        return convertDurationToTimeStr(duration);
    }

    return {
        convertDateToMillis,
        convertTimeStrToDuration,
        convertDurationToTimeStr,
        durationFormatted,
    };
}
