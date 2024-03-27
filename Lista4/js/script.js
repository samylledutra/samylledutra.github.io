window.addEventListener("load", () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzI1ZTk0MTc2ODcxZDc0Zjc2ZDA4ZjQwODFkNGZhMyIsInN1YiI6IjY1ZmI3ZGUzMGJjNTI5MDE0OWFkZGE0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bOKKOXrCWcrMLE3JgZcSBubncbxytWotmeYcEf0Ku78'
        }
    };

    const language = 'pt-br';

    fetch(`https://api.themoviedb.org/3/movie/popular?language=${language}&page=1`, options)
        .then(response => response.json())
        .then(filmes => {
            exibirFilmes(filmes.results);
        })
        .catch(err => console.error(err));

    function exibirFilmes(filmes) {
        const boxFilmes = document.getElementById('boxFilmes');

        filmes.forEach(filme => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");

            const tituloFilme = document.createElement("p");
            tituloFilme.textContent = filme.title;

            const capaFilme = document.createElement("img");
            const url = "https://image.tmdb.org/t/p/w500";
            capaFilme.setAttribute("src", `${url}${filme.poster_path}`);

            const botaoVisaoGeral = document.createElement("button");
            botaoVisaoGeral.textContent = "Visão Geral";
            botaoVisaoGeral.classList.add("btnVisaoGeral"); 
            botaoVisaoGeral.addEventListener("click", () => {
                if (!movieElement.dataset.carregado) {
                    carregarDetalhesFilme(filme.id, movieElement);
                    movieElement.dataset.carregado = true;
                } else {
                    toggleDetalhesFilme(movieElement);
                }
            });

            movieElement.appendChild(capaFilme);
            movieElement.appendChild(tituloFilme);
            movieElement.appendChild(botaoVisaoGeral);
            boxFilmes.appendChild(movieElement);
        });
    }

    function carregarDetalhesFilme(filmeId, movieElement) {
        fetch(`https://api.themoviedb.org/3/movie/${filmeId}?language=${language}`, options)
            .then(response => response.json())
            .then(movieInfo => {
                const generosFilme = document.createElement("p");
                const generos = movieInfo.genres.map(genre => genre.name).join(", ");
                generosFilme.textContent = `Gêneros: ${generos}`;

                const datasLancamento = document.createElement("p");
                datasLancamento.textContent = `Data de Lançamento: ${formatarData(new Date(movieInfo.release_date))}`;

                const filmesSimilares = document.createElement("p");
                fetch(`https://api.themoviedb.org/3/movie/${filmeId}/similar?language=${language}&page=1`, options)
                    .then(response => response.json())
                    .then(similarMovies => {
                        const similarMoviesList = similarMovies.results.slice(0, 3).map(movie => movie.title).join(", ");
                        filmesSimilares.textContent = `Filmes Similares: ${similarMoviesList}`;
                    })
                    .catch(err => {
                        console.error(err);
                        filmesSimilares.textContent = "Filmes Similares: Não disponível";
                    });

                movieElement.appendChild(generosFilme);
                movieElement.appendChild(datasLancamento);
                movieElement.appendChild(filmesSimilares);
                toggleDetalhesFilme(movieElement);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function toggleDetalhesFilme(movieElement) {
        const detalhesFilme = movieElement.querySelectorAll("p");
        detalhesFilme.forEach(detalhe => {
            detalhe.classList.toggle("visivel");
        });
    }

    function formatarData(data) {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        const ano = data.getFullYear();
        return `${dia} ${mes} ${ano}`;
    }
});
