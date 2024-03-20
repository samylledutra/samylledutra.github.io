window.addEventListener("load", function () {

    const idades = [20, 25, 30, 35];

    const somaIdades = idades.reduce((total, idade) => total + idade, 0);
    const mediaIdades = somaIdades / idades.length;
    const maiorIdade = idades.reduce((maior, idade) => idade > maior ? idade : maior);
    const idadesImpares = idades.filter(idade => idade % 2 !== 0);
    const todasMaioresDeIdade = idades.every(idade => idade >= 18);

    const valorInformado = parseInt(prompt("Informe um valor:", "19"));
    const todasMaioresQueValor = idades.every(idade => idade >= valorInformado);

    const idadeDeterminada = parseInt(prompt("Informe uma idade:", "18"));
    const idadesMaioresQueDeterminada = idades.filter(idade => idade >= idadeDeterminada);

    const somaIdadesMaioresQueDeterminada = idadesMaioresQueDeterminada.reduce((total, idade) => total + idade, 0);
    const mediaIdadesMaioresQueDeterminada = somaIdadesMaioresQueDeterminada / idadesMaioresQueDeterminada.length;

    // a)
    document.write("Soma das idades: " + somaIdades + "<br>");

    //b)
    document.write("Média aritmética das idades: " + mediaIdades.toFixed(2) + "<br>");

    //c)
    document.write("Maior idade: " + maiorIdade + "<br>");

    //d)
    document.write("Idades ímpares: " + idadesImpares.join(", ") + "<br>");

    //e)
    document.write("Idades são maiores ou iguais a 18: " + todasMaioresDeIdade + "<br>");

    //f)
    document.write("Idades são maiores ou iguais a " + valorInformado + ": " + todasMaioresQueValor + "<br>");

    //g)
    document.write("Idades maiores ou iguais a " + idadeDeterminada + " são: " + idadesMaioresQueDeterminada.join(", ") + "<br>");

    //h)
    document.write("Média das idades das pessoas com idades maiores ou iguais a " + idadeDeterminada + " é: " + mediaIdadesMaioresQueDeterminada.toFixed(2) + "<br>");
});
