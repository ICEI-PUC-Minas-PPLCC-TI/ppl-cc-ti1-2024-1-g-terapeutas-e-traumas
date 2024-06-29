document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const telaContainer = document.getElementById('tela');
    let todasAsConsultas = [];

    function carregarConsultas(consultas) {
        let tela = '<h1>Consultas Marcadas</h1>';
        for(let i = 0; i < consultas.length; i++)
        {
            let consulta = consultas[i];
            tela += `
        <div class="consulta" data-consulta-id="${i+1}">
            <div class="circle-img">
                <img src="${consulta.image}" alt="Foto de ${consulta.nome}" width="130px">
            </div>
            <div class="info">
                <h2 class="nome">${consulta.nome}</h2>
                <p class="especialidade">${consulta.especialidade}</p>
            </div>
            <div class="button-container">
                <button class="desmarcar-btn" id="${consulta.id}">Desmarcar Consulta</button> 
            </div>
        </div>`
        }
        document.getElementById('agenda').innerHTML = tela;
        document.querySelectorAll('.desmarcar-btn').forEach(button => {
            button.addEventListener('click', () => {
                let botaoId = button.id; 
                desmarcarConsulta(botaoId); 
            });
        });
    }

    function carregarConsultasJSON() {
        fetch('http://localhost:3000/agenda')
        .then(res => res.json())
        .then(data => {
            todasAsConsultas = data;
            carregarConsultas(todasAsConsultas)
        });
    }

    const input = document.querySelector(".caixa-pesquisa input")
    
    input.addEventListener("input", (event) => {
        const consultasFiltradas = todasAsConsultas.filter(consulta => consulta.nome.toLowerCase().startsWith(event.target.value))
        carregarConsultas(consultasFiltradas)
    })

    function desmarcarConsulta(botaoId) {
        const url = `http://localhost:3000/agenda/${botaoId}`
        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if necessary, such as authorization tokens
            },
        }).then((res) => {
            if (!res.ok) {
                throw new Erro("Não foi possivel desmarcar a consulta")
            }
            var consultaDiv = document.querySelector(`.consulta[data-consulta-id="${botaoId}"]`);
            consultaDiv.style.display = "none";
            showSuccessPopup();
            todasAsConsultas[botaoId-1] = null;
        }).catch((err) => {
            alert(err)
        })
        console.log(todasAsConsultas);
    }

    function showSuccessPopup() {
        alert("Consulta desmarcada!");
    }

    

    function mostrarMensagemSemConsulta() {
        telaContainer.innerHTML = '<p class="Sem_Consultas">Nenhuma consulta agendada!</p>';
    }
    function mostrarMensagemErro(mensagem) {
        telaContainer.innerHTML = `<p class="Sem_Consultas">${mensagem}</p>`;
    }


    // Função para alternar a exibição de elementos
    function toggle(el) {
        var display = document.getElementById(el);
        if (display.style.display === "none") {
            display.style.display = 'grid';
        } else {
            display.style.display = 'none';
        }
    }

    // Adiciona event listener ao item do menu lateral para alternar a agenda
    var agendaMenu = document.querySelector('.item-menu.ativo');
    agendaMenu.addEventListener('click', function() {
        toggle('agenda');
    });

    // Função para ajustar o tamanho do bloco rosa com efeito de transição
    function ajustarTamanhoBlocoRosa() {
        // ... (seu código original para ajustar o tamanho do bloco rosa)
    }

    // Função para expandir o menu lateral (NOVO)
    function expandirMenuLateral() {
        const menuLateral = document.querySelector('.menu-lateal');
        menuLateral.classList.add('expandido');
    }document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const telaContainer = document.getElementById('tela');
    let todasAsConsultas = [];

    fetch('http://localhost:3000/agenda')
        .then(res => res.json())
        .then(data => {
            todasAsConsultas = data.agenda; 
            exibirConsultas(todasAsConsultas);
            searchInput.addEventListener('input', filtrarConsultas);
        })
        .catch(error => {
            console.error('Erro ao carregar dados da agenda:', error);
            mostrarMensagemErro('Ocorreu um erro ao carregar os dados da agenda.');
        });

    function exibirConsultas(consultas) {
        telaContainer.innerHTML = ''; 

        if (consultas.length === 0) {
            mostrarMensagemSemConsulta();
        } else {
            consultas.forEach(consulta => {
                const consultaElement = document.createElement('div');
                consultaElement.classList.add('consulta');
                consultaElement.innerHTML = `
                    <div class="circle-img">
                        <img src="${consulta.image}" alt="Foto de ${consulta.nome}" width="130px">
                    </div>
                    <div class="info">
                        <h2 class="nome">${consulta.nome}</h2>
                        <p class="especialidade">${consulta.especialidade}</p>
                    </div>
                    <div class="button-container">
                        <button class="desmarcar-btn">Desmarcar Consulta</button> 
                    </div>
                `;
                consultaElement.querySelector('.desmarcar-btn').addEventListener('click', () => desmarcarConsulta(consultaElement));
                telaContainer.appendChild(consultaElement);
            });
        }
    }

    function filtrarConsultas() {
        const searchTerm = searchInput.value.toLowerCase();
        const consultasFiltradas = todasAsConsultas.filter(item =>
            item.nome.toLowerCase().includes(searchTerm)
        );
        exibirConsultas(consultasFiltradas); 
    }

    function desmarcarConsulta(consultaElement) {
        const nome = consultaElement.querySelector('h2').textContent;
        todasAsConsultas = todasAsConsultas.filter(item => item.nome !== nome);
        exibirConsultas(todasAsConsultas);
        showSuccessPopup();
    }

    function showSuccessPopup() {
        alert("Consulta desmarcada!");
    }

    function mostrarMensagemSemConsulta() {
        telaContainer.innerHTML = '<p class="Sem_Consultas">Nenhuma consulta agendada!</p>';
    }
    function mostrarMensagemErro(mensagem) {
        telaContainer.innerHTML = `<p class="Sem_Consultas">${mensagem}</p>`;
    }


    function toggle(el) {
        var display = document.getElementById(el);
        if (display.style.display === "none") {
            display.style.display = 'grid';
        } else {
            display.style.display = 'none';
        }
    }

    var agendaMenu = document.querySelector('.item-menu.ativo');
    agendaMenu.addEventListener('click', function() {
        toggle('agenda');
    });

    function expandirMenuLateral() {
        const menuLateral = document.querySelector('.menu-lateal');
        menuLateral.classList.add('expandido');
    }

    function recolherMenuLateral() {
        const menuLateral = document.querySelector('.menu-lateal');
        menuLateral.classList.remove('expandido');
    }
    
    const btnExpandir = document.querySelector('.btn-expandir');
    btnExpandir.addEventListener('click', expandirMenuLateral);
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.menu-lateal')) {
            recolherMenuLateral();
        }
    });
});


    // Função para recolher o menu lateral (NOVO)
    function recolherMenuLateral() {
        const menuLateral = document.querySelector('.menu-lateal');
        menuLateral.classList.remove('expandido');
    }

    // Adiciona event listeners para expandir/recolher o menu lateral (NOVO)
    const btnExpandir = document.querySelector('.btn-expandir');
    btnExpandir.addEventListener('click', expandirMenuLateral);
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.menu-lateal')) {
            recolherMenuLateral();
        }
    });

    carregarConsultasJSON()
});
