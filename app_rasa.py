from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Rasa server URL
RASA_URL = "https://rasa-bot2.onrender.com/webhooks/rest/webhook"


@app.route('/')
def index():
    return render_template('index_rasa.html')

@app.route('/webhook', methods=['POST'])
def send_message():
    user_message = request.json.get('message')
    
    # Send the user's message to the Rasa server
    response = requests.post(
        RASA_URL,
        json={"sender": "user", "message": user_message}
    )
    
    # Check if the response contains data
    if response.ok and response.json():
        rasa_response = response.json()
        bot_message = rasa_response[0].get('text', "Sorry, I didn't understand that.")
    else:
        bot_message = "Sorry, I didn't get that. Could you please rephrase?"

    return jsonify({"message": bot_message})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006, debug=True)






# def webhook():
    # user_message = request.json.get('message')
    # response = get_response(user_message)
    # return jsonify({'text': response})

# if __name__ == '__main__':
    # app.run(debug=True,port=5006)







