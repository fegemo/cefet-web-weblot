export function currifica(funcao, ...parametrosDefault) {
  return function(...parametros) {
    return funcao(...parametrosDefault, ...parametros);
  }
}
