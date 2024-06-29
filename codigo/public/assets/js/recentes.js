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
        const profiles = document.querySelectorAll('.Favoritados');
        profiles.forEach((profile) => {
            profile.remove();
        });
        mostrarMensagemSemFav();
    });

    fetch('/Pef_favoritos')
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

                linkPerfil.appendChild(spanNome);
                divInfo.appendChild(linkPerfil);
                divInfo.appendChild(spanArea);
                divFavorito.appendChild(imagemPerfil);
                divFavorito.appendChild(divInfo);

                favoritosContainer.appendChild(divFavorito);
            });
            loadProfiles(data);
        })
        .catch(error => console.error('Erro ao carregar favoritos:', error));
});

var mensagemMostrada = false;

function mostrarMensagemSemFav() {
    if (!mensagemMostrada) {
        const message = document.createElement('p');
        message.textContent = 'Histórico vazio';
        message.classList.add('Sem_Favoritos');
        const container = document.getElementById('favoritos-container');
        container.appendChild(message);
        mensagemMostrada = true;
    }
}

function loadProfiles(data) {
    const profileContainer = document.getElementById('profile-container');
    const searchBar = document.getElementById('search-bar');

    function displayProfiles(profiles) {
        profileContainer.innerHTML = '';
        if (profiles.length === 0) {
            const noProfileMessage = document.createElement('div');
            noProfileMessage.classList.add('no-profile');
            noProfileMessage.textContent = 'Perfil não localizado';
            profileContainer.appendChild(noProfileMessage);
        } else {
            profiles.forEach(profile => {
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('profile');

                const profileImg = document.createElement('img');
                profileImg.src = profile.image;
                profileImg.alt = profile.nome;

                const profileNameLink = document.createElement('a');
                profileNameLink.href = 'Perfil_Terapeuta.html';
                profileNameLink.classList.add('name');
                profileNameLink.textContent = profile.nome;

                profileDiv.appendChild(profileImg);
                profileDiv.appendChild(profileNameLink);
               
                profileContainer.appendChild(profileDiv);
            });
        }
    }

    searchBar.addEventListener('input', () => {
        const searchText = searchBar.value.toLowerCase();
        const filteredProfiles = data.filter(profile => 
            profile.nome.toLowerCase().includes(searchText) || 
            profile.area.toLowerCase().includes(searchText)
        );
        displayProfiles(filteredProfiles);
    });

    displayProfiles(data); // Display all profiles initially
}
