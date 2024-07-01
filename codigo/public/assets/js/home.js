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
    fetch('http://localhost:3000/Pef_favoritos')
      .then(response => response.json())
      .then(data => {
        const favoritosContainer = document.getElementById('favoritos-container');
        favoritosContainer.innerHTML = '';
  
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
  
          const favButton = document.createElement('button');
          favButton.classList.add('excluir-perfil');
  
          if (favorito.favoritado) {
            favButton.textContent = 'Desfavoritar';
          } else {
            favButton.textContent = 'Favoritar';
          }
  
          favButton.addEventListener('click', function (e) {
            const newStatus = !favorito.favoritado; // Inverte o status atual
            fetch(`http://localhost:3000/Pef_favoritos/${favorito.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ favoritado: newStatus })
            })
            .then(response => response.json())
            .then(updatedFavorito => {
              favorito.favoritado = newStatus; // Atualiza o status localmente
              if (newStatus) {
                favButton.textContent = 'Desfavoritar';
              } else {
                favButton.textContent = 'Favoritar';
              }
            })
            .catch(error => console.error('Erro ao atualizar favorito:', error));
          });
  
          linkPerfil.appendChild(spanNome);
          divInfo.appendChild(linkPerfil);
          divInfo.appendChild(spanArea);
          divInfo.appendChild(favButton);
          divFavorito.appendChild(imagemPerfil);
          divFavorito.appendChild(divInfo);
          favoritosContainer.appendChild(divFavorito);
        });
      })
      .catch(error => console.error('Erro ao carregar favoritos:', error));
  });