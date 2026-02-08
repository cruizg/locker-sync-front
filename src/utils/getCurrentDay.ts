export const getCurrentDate = () => {
  const today = new Date();
  const year: number = today.getFullYear();
  let month: number = today.getMonth() + 1;
  let day: number = today.getDate();

  // Agregar ceros al día si es menor que 10
  const dayString: string = day < 10 ? '0' + day : day.toString();

  // Agregar ceros al mes si es menor que 10
  const monthString: string = month < 10 ? '0' + month : month.toString();

  return `${year}-${monthString}-${dayString}`;
}