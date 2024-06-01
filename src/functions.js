export function truncateString(str, maxLength) {
    console.log(maxLength);
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.slice(0, maxLength) + "...";
    }
}
