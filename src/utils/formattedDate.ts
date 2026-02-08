import { format } from "date-fns";

export const  formattedDate = (date?: Date) => {
  if (date) {
      return format(date, 'dd:MM:yyyy HH:mm:ss');
  } else {
      return 'Fecha no disponible';
  }
};