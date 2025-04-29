async function fetchUsuarios() {
    try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await resposta.json();

        mostrarUsuarios(usuarios);
    } catch (erro) {
        console.error('Erro ao buscar usuários:', erro);
    }
}

function mostrarUsuarios(usuarios) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const favoritos = pegarFavoritos();

    usuarios.forEach(usuario => {
        const div = document.createElement('div');
        div.classList.add('user');

        const favoritado = favoritos.some(fav => fav.id === usuario.id);

        div.innerHTML = `
            <h3>${usuario.name}</h3>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Telefone:</strong> ${usuario.phone}</p>
            <p><strong>Endereço:</strong> ${usuario.address.street}, ${usuario.address.city}</p>
            <button class="favorite-btn">${favoritado ? '⭐' : '☆'}</button>
        `;

        const botaoFavorito = div.querySelector('.favorite-btn');
        botaoFavorito.addEventListener('click', () => {
            alternarFavorito(usuario);
        });

        userList.appendChild(div);
    });
}

function pegarFavoritos() {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
}

function salvarFavoritos(favoritos) {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function alternarFavorito(usuario) {
    let favoritos = pegarFavoritos();

    const jaFavoritado = favoritos.some(fav => fav.id === usuario.id);

    if (jaFavoritado) {
        favoritos = favoritos.filter(fav => fav.id !== usuario.id);
    } else {
        favoritos.push(usuario);
    }

    salvarFavoritos(favoritos);
    mostrarUsuariosCarregados();
    mostrarFavoritos();
}

function mostrarFavoritos() {
    const favoriteList = document.getElementById('favoriteList');
    favoriteList.innerHTML = '';

    const favoritos = pegarFavoritos();

    favoritos.forEach(usuario => {
        const div = document.createElement('div');
        div.classList.add('user');

        div.innerHTML = `
            <h3>${usuario.name}</h3>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Telefone:</strong> ${usuario.phone}</p>
            <p><strong>Endereço:</strong> ${usuario.address.street}, ${usuario.address.city}</p>
        `;

        favoriteList.appendChild(div);
    });
}

let usuariosCarregados = [];

function mostrarUsuariosCarregados() {
    mostrarUsuarios(usuariosCarregados);
}

async function iniciar() {
    try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
        usuariosCarregados = await resposta.json();
        mostrarUsuarios(usuariosCarregados);
        mostrarFavoritos();
    } catch (erro) {
        console.error('Erro ao buscar usuários:', erro);
    }
}

iniciar();
