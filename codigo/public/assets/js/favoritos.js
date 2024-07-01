document.addEventListener('DOMContentLoaded', function () {
  const favoritosContainer = document.getElementById('favoritos-container');

  fetch('http://localhost:3000/Pef_favoritos')
    .then(response => response.json())
    .then(data => {
      favoritosContainer.innerHTML = '';

      // Filtra apenas os favoritados
      const favoritados = data.filter(favorito => favorito.favoritado);

      if (favoritados.length === 0) {
        mostrarMensagemSemFav();
      } else {
        favoritados.forEach(favorito => {
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
          favButton.textContent = 'Desfavoritar';
          favButton.addEventListener('click', function (e) {
            const newStatus = false; // Definir para desfavoritar

            fetch(`http://localhost:3000/Pef_favoritos/${favorito.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ favoritado: newStatus })
            })
            .then(response => response.json())
            .then(updatedFavorito => {
              favorito.favoritado = newStatus; // Atualiza localmente para desfavoritado
              divFavorito.remove(); // Remove o perfil da lista
              if (favoritados.length === 1) {
                mostrarMensagemSemFav();
              }
            })
            .catch(error => console.error('Erro ao desfavoritar:', error));
          });

          linkPerfil.appendChild(spanNome);
          divInfo.appendChild(linkPerfil);
          divInfo.appendChild(spanArea);
          divInfo.appendChild(favButton);
          divFavorito.appendChild(imagemPerfil);
          divFavorito.appendChild(divInfo);

          favoritosContainer.appendChild(divFavorito);
        });
      }
    })
    .catch(error => console.error('Erro ao carregar favoritos:', error));
});

var mensagemMostrada = false;

function mostrarMensagemSemFav() {
  if (!mensagemMostrada) {
    const message = document.createElement('p');
    message.textContent = 'Sem perfis favoritados';
    message.classList.add('Sem_Favoritos');
    const container = document.getElementById('favoritos-container');
    container.appendChild(message);
    mensagemMostrada = true;
  }
}