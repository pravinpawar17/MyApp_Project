# main.py
from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

def generate_random_numbers(count, min_value, max_value):
    return [random.randint(min_value, max_value) for _ in range(count)]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['GET'])
def generate():
    count = int(request.args.get('count'))
    min_value = int(request.args.get('min_value'))
    max_value = int(request.args.get('max_value'))

    random_numbers = generate_random_numbers(count, min_value, max_value)
    return jsonify({'random_numbers': random_numbers})

if __name__ == '__main__':
    app.run(debug=True)
