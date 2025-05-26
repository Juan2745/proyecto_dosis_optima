from flask import Flask, request, jsonify, send_from_directory
import subprocess
import os

# Ruta al frontend
FRONTEND_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend'))

app = Flask(__name__, static_url_path='', static_folder=FRONTEND_FOLDER)

@app.route('/')
def home():
    return send_from_directory(FRONTEND_FOLDER, 'index.html')

@app.route('/calcular', methods=['POST'])
def calcular():
    datos = request.json
    edad = datos['edad']
    peso = datos['peso']
    medicamento = datos['medicamento']

    comando = [
        "octave", "--eval",
        f"dosis_optima({edad}, {peso}, '{medicamento}')"
    ]
    
    subprocess.run(comando, cwd=os.path.dirname(os.path.abspath(__file__)))

    resultado_path = os.path.join(os.path.dirname(__file__), "resultados.txt")
    with open(resultado_path, "r") as archivo:
        resultado = archivo.read()

    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True)
