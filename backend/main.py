from flask import Flask
main = Flask(__name__)

@main.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    main.run(debug=True)