document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.topicos');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
      navLinks.style.maxHeight = navLinks.scrollHeight + 'px';
      navLinks.style.transition = 'max-height 0.5s ease-out';
    } else {
      navLinks.style.transition = 'max-height 0.5s ease-in';
      navLinks.style.maxHeight = '0px';
    }
  });

  const desfavoritarTodos = document.querySelector('.excluir-perfil');

  desfavoritarTodos.addEventListener('click', () => {
    // Seleciona todos os profiles
    const profiles = document.querySelectorAll('.Favoritados');

    // Interação entre cada profile
    profiles.forEach((profile) => {
      // Remove o profile do DOM
      profile.remove();
    });

    // Adiciona a mensagem no container
    mostrarMensagemSemFav();
  });
});

var mensagemMostrada = false;

function mostrarMensagemSemFav() {
  if(!mensagemMostrada) {
    const message = document.createElement('p');
    message.textContent = 'Sem perfis favoritados';
    message.classList.add('Sem_Favoritos');
    const container = document.getElementById('favoritos-container');
    container.appendChild(message);
    mensagemMostrada = true;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('/Pef_favoritos') // Faz uma requisição para o JSON Server
   .then(response => response.json()) // Converte a resposta para JSON
   .then(data => {
      const favoritosContainer = document.getElementById('favoritos-container');

      favoritosContainer.innerHTML = '';

      // Itera sobre cada item da lista de favoritos
      data.forEach(favorito => {
    
        const divFavorito = document.createElement('div');
        divFavorito.classList.add('Favoritados');

        const imagemPerfil = document.createElement('img');
        imagemPerfil.classList.add('Imagem_perfil');
        imagemPerfil.src = favorito.image; 
        imagemPerfil.alt = "Foto de Perfil";

        const divInfo = document.createElement('div');
        divInfo.classList.add('Favoritados-info');

        const linkPerfil = document.createElement('a');
        linkPerfil.href = 'Perfil_Terapeuta.html'; 

        const spanNome = document.createElement('span');
        spanNome.classList.add('Perfil');
        spanNome.innerHTML = `<strong>${favorito.nome}</strong>`;

        const spanArea = document.createElement('span');
        spanArea.classList.add('Especializacao');
        spanArea.textContent = favorito.area;

        const favBotton = document.createElement('botton');
        favBotton.classList.add('excluir-perfil');
        favBotton.textContent = 'Desfavoritar';
        favBotton.addEventListener('click', function (e) {
        
          const profile = e.target.closest('.Favoritados');

          if (profile) {
            profile.remove();
            const remainingProfiles = document.querySelectorAll('.Favoritados');
            if (remainingProfiles.length === 0) {
              mostrarMensagemSemFav();
            }
          }
        });

        linkPerfil.appendChild(spanNome);
        divInfo.appendChild(linkPerfil);
        divInfo.appendChild(spanArea);
        divInfo.appendChild(favBotton);
        divFavorito.appendChild(imagemPerfil);
        divFavorito.appendChild(divInfo);

        favoritosContainer.appendChild(divFavorito);
      });
    })
   .catch(error => console.error('Erro ao carregar favoritos:', error));
});