// export const getTime = (timestamp: Date) => {
//     const date = new Date(timestamp)
//     // Extract date, hour, and minute components
//     const year = date.getFullYear()
//     const month = ('0' + (date.getMonth() + 1)).slice(-2)
//     const day = ('0' + date.getDate()).slice(-2)
//     const formattedDateTime = `${day}/${month}/${year}`

//     return formattedDateTime
// }
export const getTime = (timestamp: Date | string) => {
  const date = new Date(timestamp)
  const now = new Date()

  // Normalizamos fechas (sin horas) para comparar días
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const targetDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const diffDays =
    (today.getTime() - targetDay.getTime()) / (1000 * 60 * 60 * 24)

  // Hora y minutos
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)

  if (diffDays === 0) {
    return `Hoy ${hours}:${minutes}`
  }

  if (diffDays === 1) {
    return `Ayer ${hours}:${minutes}`
  }

  // Fecha DD/MM/YYYY
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)

  return `${day}/${month}/${year}`
}