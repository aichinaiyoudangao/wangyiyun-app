export function _throttle (fn, delay) {
  let timer
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, delay);
    }
  }
}