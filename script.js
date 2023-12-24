// Initialize Firestore
const db = firebase.firestore();

// Function to add a client to Firestore
function cadastrarCliente() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    db.collection('clientes').add({
        nome,
        email,
        telefone,
        endereco
    })
    .then(() => {
        console.log('Cliente cadastrado com sucesso!');
        document.getElementById('cadastroForm').reset();
        listarClientes();
    })
    .catch(error => {
        console.error('Erro ao cadastrar cliente: ', error);
    });
}

// Function to list all clients from Firestore
function listarClientes() {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';

    db.collection('clientes').get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const cliente = doc.data();
            const listItem = document.createElement('li');
            listItem.textContent = `Nome: ${cliente.nome}, Email: ${cliente.email}, Telefone: ${cliente.telefone}, Endereço: ${cliente.endereco}`;
            listaClientes.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Erro ao obter clientes: ', error);
    });
}

// Listen for changes in Firestore and update the list
db.collection('clientes').onSnapshot(() => {
    listarClientes();
});
