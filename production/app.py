from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your TensorFlow model
# Replace with the path to your SavedModel directory
model = tf.saved_model.load("my_model")


@app.route('/', methods=['GET'])
@cross_origin()
def hello_world():
    return "Hello World!"


@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    try:
        # Get the JSON data from the request
        data = request.json

        # Extract the "text" field from the JSON data
        text = data.get("text", "")

        # Preprocess the text and convert it to a list
        preprocessed_data = [text]

        # Make predictions using your loaded model
        predictions = model(preprocessed_data)

        # Convert the TensorFlow tensor to a NumPy array
        predictions_numpy = np.array(predictions)

        # Apply thresholding to convert predictions to class labels
        predicted_labels = ["POSITIF" if pred >=
                            0.5 else "NEGATIF" for pred in predictions_numpy]

        # Format the predictions as class labels
        result = {"prediction": predicted_labels[0], "text": text}

        # Set CORS headers for this route
        response = jsonify(result)
        # You can restrict this to your domain if needed
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
