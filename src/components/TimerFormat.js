import { unref, ref } from 'vue'
import { date } from 'quasar'

export function useTimerTools(format='HH:mm:ss') {
  // if maybeRef is indeed a ref, its .value will be returned
  // otherwise, maybeRef is returned as-is
  // const value = unref(maybeRef)


  function convertDateToMillis(duration_date) {
      let result = 0;
      duration_date = unref(duration_date)
      // result += duration_date.getYear()    * 1000 * 60 * 60 * 24 * 12 * ?????
      // result += duration_date.getMonth()   * 1000 * 60 * 60 * 24 * 12
      // result += duration_date.getDate()    * 1000 * 60 * 60 * 24
      result += duration_date.getHours()   * 1000 * 60 * 60
      result += duration_date.getMinutes() * 1000 * 60
      result += duration_date.getSeconds() * 1000
      result += duration_date.getMilliseconds()
      return result
  }

  function convertTimeStrToDuration(time_str) {
      // console.group("convert_time_str_to_duration")
      // console.log(`time_str: ${time_str}`)
      let duration =  convertDateToMillis(
          date.extractDate(unref(time_str), unref(format))
      )
      // console.log(`duration: ${duration}`)
      // console.groupEnd()
      return duration
  }

  function durationFormatted(duration) {
      return date.formatDate(unref(duration), unref(format))
  }

  return {
      convertDateToMillis,
      convertTimeStrToDuration,
      durationFormatted,
  }
}
