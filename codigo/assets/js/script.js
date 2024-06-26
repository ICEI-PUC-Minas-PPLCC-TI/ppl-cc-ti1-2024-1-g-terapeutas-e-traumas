console.log("linkado")



var menuItem = document.querySelectorAll('.item-menu')

function selectLink(){
    menuItem.forEach((item)=>
    item.classList.remove('ativo')
)
    this.classList.add('ativo')
}

menuItem.forEach((item)=>
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

        fetch('http://localhost:3000/terapeutas') 
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
