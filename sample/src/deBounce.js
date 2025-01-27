export const debounceSearch = (callback, wait) => {
    setTimeout(() => {
        callback()
    }, wait)
}