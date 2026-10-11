const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export function parseISODate(iso: string): Date {
    const [year, month, day] = iso.split("-").map(Number)
    return new Date(year, month - 1, day)
}

export function formatDateHeading(iso: string): string {
    const date = parseISODate(iso)
    const weekday = WEEKDAYS[date.getDay()]
    const month = MONTHS[date.getMonth()]
    const yearSuffix = date.getFullYear() === new Date().getFullYear() ? "" : `${date.getFullYear()}`
    return `${weekday}, ${date.getDate()} ${month}${yearSuffix}`
}