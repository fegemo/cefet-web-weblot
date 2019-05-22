export function ordenaAlfabeticamente(vetor, nomePropriedade) {
  return vetor.sort((objeto1, objeto2) => {
    const valor1 = (objeto1[nomePropriedade] || '').toLowerCase();
    const valor2 = (objeto2[nomePropriedade] || '').toLowerCase();

    return valor1 < valor2 ? -1 : (valor1 > valor1 ? 1 : 0);
  });
}
