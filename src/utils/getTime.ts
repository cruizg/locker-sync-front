export const getTime = (timestamp: Date) => {
    const date = new Date(timestamp)
    // Extract date, hour, and minute components
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const formattedDateTime = `${day}/${month}/${year}`

    return formattedDateTime
}