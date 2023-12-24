// Configuração do Firebase
const firebaseConfig = {
    apiKey: 'SuaAPIKey',
    authDomain: 'SeuDominio.firebaseapp.com',
    projectId: 'SeuProjetoId',
    storageBucket: 'SeuBucket.appspot.com',
    messagingSenderId: 'SeuSenderId',
    appId: 'SuaAppId'
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);

// Inicialização do Firestore
const db = firebase.firestore();

// Função para cadastrar um novo cliente
function cadastrarCliente() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    // Adiciona o cliente ao Firestore
    db.collection('clientes').add({
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco
    })
    .then(() => {
        alert('Cliente cadastrado com sucesso!');
        document.getElementById('clienteForm').reset();
        listarClientes();
    })
    .catch(error => {
        console.error('Erro ao cadastrar cliente: ', error);
    });
}

// Função para listar todos os clientes
function listarClientes() {
    const clientesList = document.getElementById('clientesList');

    // Limpa a lista
    clientesList.innerHTML = '';

    // Consulta todos os clientes no Firestore
    db.collection('clientes').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            const cliente = doc.data();
            const clienteItem = document.createElement('div');
            clienteItem.innerHTML = `
                <strong>${cliente.nome}</strong><br>
                Email: ${cliente.email}<br>
                Telefone: ${cliente.telefone}<br>
                Endereço: ${cliente.endereco}<br>
                <hr>
            `;
            clientesList.appendChild(clienteItem);
        });
    })
    .catch(error => {
        console.error('Erro ao listar clientes: ', error);
    });
}

// Lista os clientes ao carregar a página
listarClientes();
