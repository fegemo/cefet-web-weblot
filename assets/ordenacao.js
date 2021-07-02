function comparadorNatural(a, b) {
  return a - b
}

export function geradorComparadorPropriedade(propriedade) {
  return function comparadorPropriedade(a, b) {
    const valorA = a[propriedade].toLowerCase()
    const valorB = b[propriedade].toLowerCase()
    if (valorA < valorB) return -1
    else if (valorA > valorB) return 1
    else return 0
  }
}

export function insereOrdenado(vetor, valor, comparador = comparadorNatural) {
  const i = indiceInsercao(vetor, valor, comparador)
  vetor.splice(i, 0, valor)
  return i
}

export function indiceInsercao(vetor, valor, comparador = comparadorNatural) {
  let low = 0
  let high = vetor.length

  while (low < high) {
    const mid = low + high >>> 1
    if (comparador(vetor[mid], valor) < 0) {
      low = mid + 1
    }
    else {
      high = mid
    }
  }
  return low
}