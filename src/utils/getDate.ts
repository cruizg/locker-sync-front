export const formatearFecha = (fecha: any) => {
    if (!(fecha instanceof Date)) {
        // Si fecha no es un objeto Date, intenta crear uno
        fecha = new Date(fecha);
        // Si después de intentar crear un objeto Date sigue sin ser válido, retorna un mensaje de error
        if (isNaN(fecha.getTime())) {
          return 'Fecha inválida';
        }
      }
    
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const año = fecha.getFullYear();
      const horas = String(fecha.getHours()).padStart(2, '0');
      const minutos = String(fecha.getMinutes()).padStart(2, '0');
      const segundos = String(fecha.getSeconds()).padStart(2, '0');
    
      const fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
      return fechaFormateada;
}