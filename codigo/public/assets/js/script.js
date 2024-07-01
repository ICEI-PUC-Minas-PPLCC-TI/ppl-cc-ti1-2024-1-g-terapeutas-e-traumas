console.log("linkado")

var menuItem = document.querySelectorAll('.item-menu')

function selectLink() {
    menuItem.forEach((item) =>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

menuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
)



console.log("linkado");

var menuItem = document.querySelectorAll('.item-menu');

function selectLink() {
    menuItem.forEach((item) =>
        item.classList.remove('ativo')
    );
    this.classList.add('ativo');
}

menuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
);

function exibirPerfil(terapeuta) {
    console.log(terapeuta);
    const perfilTerapeuta = document.getElementById('perfilTerapeuta');
    perfilTerapeuta.innerHTML = '';

    const perfilInfo = document.createElement('div');
    perfilInfo.classList.add('perfil-info');


    const terapeutaImg = document.createElement('img');
    terapeutaImg.src = terapeuta.image;
    terapeutaImg.alt = terapeuta.name;
    perfilInfo.appendChild(terapeutaImg);


    const detalhes = document.createElement('div');
    detalhes.classList.add('perfil-details');
    const nomeTerapeuta = document.createElement('h2');
    nomeTerapeuta.textContent = terapeuta.name;
    const especialidade = document.createElement('p');
    especialidade.textContent = `Especialidade: ${terapeuta.specialty}`;
    const planosAtendidos = document.createElement('p');
    planosAtendidos.textContent = `Planos atendidos: ${terapeuta.disponibilidade.join(', ')}`;
    const contato = document.createElement('p');
    detalhes.appendChild(nomeTerapeuta);
    detalhes.appendChild(especialidade);
    detalhes.appendChild(planosAtendidos);
    perfilInfo.appendChild(detalhes);


    const marcarConsultaBtn = document.createElement('button');
    marcarConsultaBtn.textContent = 'Marcar Consulta';
    marcarConsultaBtn.classList.add('marcar-consulta-btn');


    marcarConsultaBtn.addEventListener('click', function () {
        marcarConsulta(terapeuta);
    });

    perfilInfo.appendChild(marcarConsultaBtn);


    const btnFavoritar = document.createElement('button');
    btnFavoritar.textContent = 'Favoritar';
    btnFavoritar.classList.add('favoritar');
    btnFavoritar.addEventListener('click', function () {
        adicionarFavorito(terapeuta);
    });
    perfilInfo.appendChild(btnFavoritar);


    const btnFechar = document.createElement('button');
    btnFechar.textContent = 'Fechar';
    btnFechar.classList.add('fechar-perfil');
    btnFechar.addEventListener('click', function () {
        perfilTerapeuta.style.display = 'none';
    });
    perfilInfo.appendChild(btnFechar);


    perfilTerapeuta.appendChild(perfilInfo);
    perfilTerapeuta.style.display = 'block';
}


function marcarConsulta(terapeuta) {

    console.log('Consulta marcada com:', terapeuta.nome);

    // fetch para enviar os dados
    fetch('http://localhost:3000/agenda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: terapeuta.name,
            image: terapeuta.image,
            especialidade: terapeuta.specialty

        })
    })
        .then(response => {
            if (response.ok) {
                alert('Consulta marcada com sucesso!');
            } else {
                throw new Error('Erro ao marcar consulta.');
            }
        })
        .catch(error => {
            console.error('Erro ao marcar consulta:', error);
            alert('Erro ao marcar consulta. Por favor, tente novamente.');
        });
}

function filtrarTerapeutas(event, terapeutasData) {
    const terapeutaList = document.getElementById("therapist-list");
    const searchTerm = event.target.value.trim().toLowerCase();


    terapeutaList.innerHTML = '';


    if (searchTerm !== '') {
        const filteredTerapeutas = terapeutasData.filter(terapeuta =>
            terapeuta.name.toLowerCase().includes(searchTerm)
        );


        filteredTerapeutas.forEach(terapeuta => {
            const terapeutaCard = document.createElement('div');
            terapeutaCard.classList.add('resultado-pesquisa');

            const terapeutaImg = document.createElement('img');
            terapeutaImg.src = terapeuta.image;
            terapeutaImg.alt = terapeuta.name;
            terapeutaCard.appendChild(terapeutaImg);


            const terapeutaNome = document.createElement('span');
            terapeutaNome.textContent = terapeuta.name;
            terapeutaCard.appendChild(terapeutaNome);


            terapeutaCard.addEventListener('click', function () {
                exibirPerfil(terapeuta);
            });

            terapeutaList.appendChild(terapeutaCard);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const corpoCalendario = document.getElementById("calendar-body");
    const mesAno = document.getElementById("month-year");
    const botaoAnterior = document.getElementById("prev");
    const botaoProximo = document.getElementById("next");
    const containerTerapeutas = document.getElementById("therapist-container");
    const listaTerapeutas = document.getElementById("therapist-list");

    let dataAtual = new Date();

    function renderizarCalendario(data) {
        corpoCalendario.innerHTML = "";
        const mesAtual = data.getMonth();
        const anoAtual = data.getFullYear();

        mesAno.textContent = data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

        const primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1).getDay();
        const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

        let linha = document.createElement("tr");
        for (let i = 0; i < primeiroDiaDoMes; i++) {
            let celula = document.createElement("td");
            linha.appendChild(celula);
        }

        for (let dia = 1; dia <= diasNoMes; dia++) {
            if (linha.children.length === 7) {
                corpoCalendario.appendChild(linha);
                linha = document.createElement("tr");
            }

            let celula = document.createElement("td");
            celula.textContent = dia;
            celula.addEventListener("click", () => mostrarTerapeutas(dia, mesAtual, anoAtual));
            linha.appendChild(celula);
        }

        if (linha.children.length > 0) {
            corpoCalendario.appendChild(linha);
        }
    }

    function mostrarTerapeutas(dia, mes, ano) {
        containerTerapeutas.style.display = "block";
        listaTerapeutas.innerHTML = "";

        const dataSelecionada = new Date(ano, mes, dia);
        const diaDaSemana = dataSelecionada.getDay() + 1; // 1=Domingo, 2=Segunda, etc.

        fetch('http://localhost:3000/Calendario')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const terapeutas = data;

                // Filtrando os terapeutas disponíveis no dia da semana especificado
                const terapeutasDia = terapeutas.filter(elem => elem.disponibilidade.includes(diaDaSemana));

                if (terapeutasDia.length === 0) {
                    const semTerapeutas = document.createElement("li");
                    semTerapeutas.textContent = "Nenhum terapeuta disponível neste dia.";
                    listaTerapeutas.appendChild(semTerapeutas);
                } else {
                    terapeutasDia.forEach(terapeuta => {
                        const itemLista = document.createElement("li");

                        const img = document.createElement("img");
                        img.src = terapeuta.image;
                        img.alt = terapeuta.name;

                        const texto = document.createElement("span");
                        texto.textContent = `${terapeuta.name} - ${terapeuta.specialty}`;

                        itemLista.appendChild(img);
                        itemLista.appendChild(texto);
                        listaTerapeutas.appendChild(itemLista);
                        const searchBar = document.querySelector(".caixa-pesquisa input");
                        searchBar.addEventListener('input', (event) => filtrarTerapeutas(event, data));
                    });
                }
            })
            .catch(error => console.error('Erro ao carregar os dados:', error));
    }

    botaoAnterior.addEventListener("click", function () {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderizarCalendario(dataAtual);
    });

    botaoProximo.addEventListener("click", function () {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderizarCalendario(dataAtual);
    });

    renderizarCalendario(dataAtual);
});
