
document.getElementById('opcao').addEventListener('change', function () {
  fetch('file.json')
    .then(response => response.json())
    .then(estudantes => {
      const opcaoSelecionada = document.getElementById('opcao').value;
      let resultado = '';

      switch (opcaoSelecionada) {
        case 'todos':
          estudantes.forEach(estudante => {
            resultado += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${(estudante.notaBim1 + estudante.notaBim2).toFixed(2)}<br>`;
          });
          break;
        case 'homens':
          estudantes.filter(estudante => estudante.sexo === 'M').forEach(estudante => {
            resultado += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${(estudante.notaBim1 + estudante.notaBim2).toFixed(2)}<br>`;
          });
          break;
        case 'mulheres':
          estudantes.filter(estudante => estudante.sexo === 'F').forEach(estudante => {
            resultado += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${(estudante.notaBim1 + estudante.notaBim2).toFixed(2)}<br>`;
          });
          break;
        case 'aprovados':
          estudantes.filter(estudante => (estudante.notaBim1 + estudante.notaBim2) / 2 >= 60).forEach(estudante => {
            resultado += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${(estudante.notaBim1 + estudante.notaBim2).toFixed(2)}<br>`;
          });
          break;
        case 'reprovados':
          estudantes.filter(estudante => (estudante.notaBim1 + estudante.notaBim2) / 2 < 60).forEach(estudante => {
            resultado += `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${estudante.notaBim2} (bimestre 2) = ${(estudante.notaBim1 + estudante.notaBim2).toFixed(2)}<br>`;
          });
          break;
        case 'media':
          const totalNotas = estudantes.reduce((acumulador, estudante) => {
            return acumulador + estudante.notaBim1 + estudante.notaBim2;
          }, 0);
          const mediaTurma = (totalNotas / (estudantes.length)).toFixed(2);
          resultado = `Nota média = ${mediaTurma}`;

          break;
        default:
          resultado = '';
          break;
      }

      document.getElementById('resultado').innerHTML = resultado;
    });
});