//Seleção de Filtro

const cidadesEBairros = {
    "São Paulo": ["Centro", "Moema", "Pinheiros", "Jardins (Paulista, América, Europa), Itaim Bibi, Vila Mariana", "Santana", "Tatuepé", "Mooca", "Liberdade"], 
    
    "Rio de Janeiro": ["Copacabana", "Ipanema", "Botafogo", "Leblon", "Flamengo", "Laranjeiras", "Barra da Tijuca", "Tijuca", "Santa Tereza", "Centro"],
    
    "Belo Horizonte": ["Savassi", "Sion", "Serra", "Lourdes", "Belvedere", "Pampulha", "Castelo", "Funcionários", "Buritis", "Santo Agostinho", "São Pedro", "Santa Efigênia", "Santo Antônio", "Cidade Jardim", "Barro Preto", "Padre Eustáquio", "Havaí", "Floresta", "Santa Tereza", "Prado", "Nova Suiça", "Caiçares", "Cachoeirinha", "Barreiro", "Grajaú", "Gutierrez", "Santa Lúcia", "Mangabeiras", "Anchieta", "Centro", "São Bento", "Sagrada Família", "Itapoã"],
    
    "Vitória": ["Jardim da Penha","Praia do Canto", "Jardim Camburi", "Mata da Praia", "Enseada do Suá", "Bairro República", "Ilha de Santa Maria", "Jucutuquara", "Maruípe", "Jabour"],
    
    "Curitiba": ["Batel","Centro","Água Verde","Bigorrilho (Champagnat)","Cabral","Juvevê","Mercês","Santa Felicidade","Portão","São Francisco"],
    
    "Florianópolis": ["Centro","Beira-Mar Norte", "Trindade", "Agronômica", "Jurerê", "Lagoa da Conceição", "Campeche", "Itacorubi", "Canasvieiras", "Coqueiros"],
    
    "Porto Alegre": ["Centro Histórico","Moinhos de Vento", "Bela Vista", "Petrópolis", "Bom Fim", "Três Figuras", "Menino Deus", "Partenon", "Rio Branco", "Santana"],
    
    "Brasília": ["Asa Norte","Asa Sul", "Lago Sul", "Lago Norte", "Sudoeste", "Noroeste", "Cruzeiro", "Guará", "Taguatinga", "Águas Claras"],
    
    "Goiânia": ["Setor Bueno","Setor Marista", "Setor Oeste", "Setor Central", "Setor Sul", "Jardim Goiás", "Setor Coimbra", "Setor Bela Vista", "Setor Aeroporto", "Setor Campinas"],
    
    "Cuiabá": ["Centro","Santa Rosa", "Bosque da Saúde", "Jardim das Américas", "Quilombo", "Goiaberas", "Araés", "Centro Político Administrativo (CPA)", "Morada do Ouro", "Altos do Copixó"],
    
    "Campo Grande": ["Centro","Jardim dos Estados", "Carandá Bosque", "Chacará Cachoeira", "Vila Rosa Pires", "Jardim dos Estados", "Vila Vilas Boas", "Vila Planalto", "Tiradentes", "Mata do Jacinto"],
    
    "Salvador": ["Barra","Ondina", "Rio Vermelho", "Itapuã", "Pituba", "Caminho das Árvores", "Stella Maris", "Bonfim", "Vitória", "Graça"], 
    
    "Recife": ["Boa Viagem","Casa Forte", "Graças", "Parnamirim", "Encruzilhada", "Madalena", "Santo Amaro", "Boa Vista", "Setúbal", "Campo Grande"],
    
    "Fortaleza": ["Meireles","Aldeota", "Cocó", "Varjota", "Mucuripe", "Papicu", "Praia de Iracema", "Dionísio Torres", "Montese", "Parquelândia"],
    
    "João Pessoa": ["Manaíra","Tambaú", "Bessa", "Cabo Grande", "Tambauzinho", "Miramar", "Altiplano Cabo Branco", "Bancários", "Jaguaribe", "Bairro dos Estados"],
    
    "Natal": ["Ponta Negra", "Tirol", "Petrópolis", "Candelária", "Capim Macio", "Lagoa Nova", "Neopólis", "Alecrim", "Pitimbu", "Nova Parnamirim"],
    
    "Manaus": ["Centro", "Adrianópolis", "Parque 10 de Novembro", "Nossa Senhora das Graças", "Aleixo", "Cachoeirinha", "Dom Pedro", "Compensa", "Flores", "São Francisco"],
    
    "Belém": ["Batista", "Nazaré", "Umarizal", "Reduto", "Cremação", "Marco", "São Brás", "Guamá", "Pedreira", "Jurunas"],
    
    "Boa Vista": ["Pintolândia", "Centenário", "Raiar do Sol", "Tancredo Neves", "Asa Branca", "Liberade", "Cidade Satélite", "Nova Cidade", "São Francisco", "Jóquei Clube"],
    
    "Macapá": ["Central", "Santa Rita", "Buritizal", "Laguinho", "Trem", "Beirol", "Congós", "Noca Esperança", "Perpétuo Socorro", "Infraero"],
    
    "Palmas": ["Plano Diretor Norte", "Plano Diretor Sul", "Taquaralto", "Graciosa", "Aureny I", "Aureny II", "Aureny III", "Aureny IV", "Aureny V", "Taquari"],
    
    "Porto Velho": ["Centro", "Olaria", "Embratel", "Areal", "Nova Porto Velho", "Flodoaldo Pontes Pinto", "Pedrinhas", "Liberdade", "Nacional", "Caiari"],
    
    "Rio Branco": ["Centro", "Bosque", "Quinze", "Capoeira", "Seis de Agosto", "Base", "Jardim Europa", "Aeroporto Velho", "Cadeia Velha", "Taquari"]
    //Adicionar cidade/bairros
  };
  
  const cidadeSelect = document.getElementById("cidade");
const bairroSelect = document.getElementById("bairro");

cidadeSelect.addEventListener("change", carregarBairros);

function carregarBairros() {
    const cidadeSelecionada = cidadeSelect.value;
    console.log(cidadeSelecionada);
    const bairros = cidadesEBairros[cidadeSelecionada] || [];

    limparSelect(bairroSelect);

    if (bairros.length === 0) {
        adicionarOption(bairroSelect, "Selecione uma cidade primeiro");
    } else {
        bairros.forEach((bairro) => {
            adicionarOption(bairroSelect, bairro);
        });
    }
}

function limparSelect(selectElement) {
    while (selectElement.options.length > 0) {
        selectElement.remove(0);
    }
}

function adicionarOption(selectElement, text) {
    const option = document.createElement("option");
    option.textContent = text;
    selectElement.appendChild(option);
}

function toggle(el){
    var display = document.getElementById(el).style.display;
     if (display == "none"){
       document.getElementById(el).style.display = 'block';
     }
    else{
     document.getElementById(el).style.display = 'none';
    }
   }

   
// Seleciona o botão de filtro
const botaoFiltro = document.querySelector('.botão_filtro');

// Seleciona a parte principal da página
const mainSection = document.querySelector('Filtro_de_Seleção');

// Adiciona um evento de clique ao botão de filtro
botaoFiltro.addEventListener('click', function() {
    // Verifica se a parte principal está oculta
    if (mainSection.style.display === 'none') {
       
        mainSection.style.display = 'block';
    }
});

