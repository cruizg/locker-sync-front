export const getBasesWithOperator = (registros: any) => {
  const registrosConOperador: any = registros?.filter((registro: any) => registro.operador);
  return registrosConOperador.length;
}