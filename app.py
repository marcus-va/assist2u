# Instale as dependências usando o comando: pip install Flask google-cloud-firestore

from flask import Flask, render_template, request, jsonify
from google.cloud import firestore

app = Flask(__name__)

# Configuração do Firestore
db = firestore.Client()

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota para cadastrar um novo cliente
@app.route('/cadastrar_cliente', methods=['POST'])
def cadastrar_cliente():
    data = request.get_json()
    nome = data['nome']
    email = data['email']
    telefone = data['telefone']
    endereco = data['endereco']

    # Adiciona o cliente ao Firestore
    db.collection('clientes').add({
        'nome': nome,
        'email': email,
        'telefone': telefone,
        'endereco': endereco
    })

    return jsonify({'message': 'Cliente cadastrado com sucesso!'})

# Rota para consultar todos os clientes
@app.route('/consultar_clientes', methods=['GET'])
def consultar_clientes():
    clientes = db.collection('clientes').stream()
    lista_clientes = [{'id': cliente.id, **cliente.to_dict()} for cliente in clientes]
    return jsonify(lista_clientes)

if __name__ == '__main__':
    app.run(debug=True)
