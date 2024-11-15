function copyCode(button) {
    const code = button.parentElement.querySelector('pre').innerText;
    navigator.clipboard.writeText(code).then(function() {
        const message = document.createElement('div');
        message.textContent = 'Code copied to clipboard!';
        message.style.position = 'fixed';
        message.style.bottom = '20px';
        message.style.right = '20px';
        message.style.backgroundColor = '#28a745';
        message.style.color = 'white';
        message.style.padding = '10px';
        message.style.borderRadius = '5px';
        message.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        message.style.zIndex = '9999';
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    }, function() {
        const message = document.createElement('div');
        message.textContent = 'Error copying code!';
        message.style.position = 'fixed';
        message.style.bottom = '20px';
        message.style.right = '20px';
        message.style.backgroundColor = '#dc3545';
        message.style.color = 'white';
        message.style.padding = '10px';
        message.style.borderRadius = '5px';
        message.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        message.style.zIndex = '9999';
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    });
}

function loadContent(section) {
    const mainContent = document.getElementById('mainContent');

    let content = '';
    let question = '';
    
    if (section === 'section1') {
        content = `<h2>Introduction to Neural Networks</h2>
                   <p>Neural networks are computational models inspired by the human brain's structure and functionality. They consist of layers of nodes (neurons), where each node receives inputs, processes them using weights and biases, and passes the result through an activation function.</p>
                   <h3>Key Characteristics</h3>
                   <ul>
                       <li><b>Input Layer:</b> Takes raw data inputs and preprocesses them.</li>
                       <li><b>Hidden Layers:</b> Perform computations and feature extraction.</li>
                       <li><b>Output Layer:</b> Produces the final prediction or classification.</li>
                   </ul>
                   <h3>Applications</h3>
                   <p>Neural networks are widely used in image recognition, natural language processing, autonomous systems, and more. They have revolutionized fields like speech recognition, medical diagnoses, and even game-playing AI.</p>
                   <h3>Advantages of Neural Networks</h3>
                   <ul>
                       <li>Ability to learn complex patterns from data.</li>
                       <li>Can handle large amounts of unstructured data like images and text.</li>
                       <li>Adaptive to changes in data over time (e.g., through transfer learning).</li>
                   </ul>
                   <h3>Challenges</h3>
                   <p>Despite their success, neural networks face challenges like overfitting, interpretability, and high computational costs. These challenges require careful model design and training techniques.</p>`;

        question = `<div class="question-container">
                        <h4>Quiz:</h4>
                        <p>What is the primary purpose of the input layer in a neural network?</p>
                        <input type="radio" id="q1a1" name="q1" value="a1">
                        <label for="q1a1">To produce the final prediction</label><br>
                        <input type="radio" id="q1a2" name="q1" value="a2">
                        <label for="q1a2">To preprocess raw data inputs</label><br>
                        <input type="radio" id="q1a3" name="q1" value="a3">
                        <label for="q1a3">To adjust the weights and biases</label><br>
                        <button onclick="checkAnswer('q1', 'a2')">Check Answer</button>
                        <p id="q1Answer"></p>
                    </div>`;
    } else if (section === 'section2') {
        content = `<h2>Perceptron Model</h2>
                   <p>The perceptron is one of the simplest types of artificial neural networks. It is a binary linear classifier that assigns inputs to one of two possible categories using weights and a threshold function. The model is based on a single layer of neurons, where each neuron calculates a weighted sum of its inputs, compares it to a threshold, and produces an output based on this comparison.</p>
                   <h3>Mathematical Representation</h3>
                   <p>The perceptron function is defined as:</p>
                   <div class="code-container">
                       <span class="copy-button" onclick="copyCode(this)">Copy</span>
                       <pre><code class="language-python"># Python representation of perceptron
def perceptron(input, weights, threshold):
    weighted_sum = sum(w * i for w, i in zip(weights, input))
    return 1 if weighted_sum >= threshold else 0
                       </code></pre>
                   </div>
                   <h3>Training the Perceptron</h3>
                   <p>The perceptron learns by adjusting weights based on errors from misclassified inputs. The algorithm iteratively improves its classification accuracy by minimizing errors. This process is done through the perceptron learning rule, which updates weights after each input is processed.</p>
                   <h3>Limitations</h3>
                   <p>Although the perceptron can classify linearly separable data, it cannot handle non-linear problems. The introduction of multi-layer networks and backpropagation solved this limitation, leading to more powerful models like deep neural networks.</p>`;

        question = `<div class="question-container">
                        <h4>Quiz:</h4>
                        <p>What is the perceptron model primarily used for?</p>
                        <input type="radio" id="q2a1" name="q2" value="a1">
                        <label for="q2a1">Binary classification</label><br>
                        <input type="radio" id="q2a2" name="q2" value="a2">
                        <label for="q2a2">Image recognition</label><br>
                        <input type="radio" id="q2a3" name="q2" value="a3">
                        <label for="q2a3">Optimization of neural networks</label><br>
                        <button onclick="checkAnswer('q2', 'a1')">Check Answer</button>
                        <p id="q2Answer"></p>
                   </div>`;
    } else if (section === 'section3') {
        content = `<h2>Activation Functions</h2>
                   <p>Activation functions introduce non-linearity into a neural network. Without them, the model would be limited to solving linear problems, regardless of the network's complexity. These functions determine whether a neuron should be activated or not based on the weighted sum of its inputs.</p>
                   <h3>Types of Activation Functions</h3>
                   <ul>
                       <li><b>Sigmoid:</b> Maps inputs to the range (0, 1), often used for binary classification.</li>
                       <li><b>Tanh:</b> Maps inputs to (-1, 1), making it useful for centered data.</li>
                       <li><b>ReLU (Rectified Linear Unit):</b> Outputs 0 for negative inputs and the input itself for positive inputs.</li>
                   </ul>
                   <h3>Implementation Example</h3>
                   <div class="code-container">
                       <span class="copy-button" onclick="copyCode(this)">Copy</span>
                       <pre><code class="language-python"># Python implementation of activation functions
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def relu(x):
    return max(0, x)

def tanh(x):
    return np.tanh(x)
                       </code></pre>
                   </div>
                   <h3>Choosing an Activation Function</h3>
                   <p>The choice of activation function depends on the problem being solved. For binary classification, sigmoid is often used. For multi-class problems, softmax is typically preferred. ReLU is commonly used in hidden layers of deep neural networks due to its computational efficiency.</p>`;

        question = `<div class="question-container">
                        <h4>Quiz:</h4>
                        <p>Which activation function is often used in binary classification?</p>
                        <input type="radio" id="q3a1" name="q3" value="a1">
                        <label for="q3a1">Sigmoid</label><br>
                        <input type="radio" id="q3a2" name="q3" value="a2">
                        <label for="q3a2">ReLU</label><br>
                        <input type="radio" id="q3a3" name="q3" value="a3">
                        <label for="q3a3">Tanh</label><br>
                        <button onclick="checkAnswer('q3', 'a1')">Check Answer</button>
                        <p id="q3Answer"></p>
                   </div>`;
    } else if (section === 'section4') {
        content = `<h2>Forward and Backward Propagation</h2>
                   <p>Forward propagation involves passing the input data through the network and calculating the output. The network's predictions are compared to the true labels, and the loss is computed. Backpropagation is the process of adjusting the network's weights based on the error (loss) calculated during forward propagation.</p>
                   <h3>Mathematical Formulation</h3>
                   <p>During forward propagation, the network's output is computed by performing matrix multiplication between the input data and weights, followed by applying an activation function. During backpropagation, the gradient of the loss function is computed with respect to each weight, and the weights are updated using an optimization algorithm like gradient descent.</p>
                   <h3>Example</h3>
                   <div class="code-container">
                       <span class="copy-button" onclick="copyCode(this)">Copy</span>
                       <pre><code class="language-python"># Forward and Backward Propagation Example
def forward_propagation(X, weights, activation_fn):
    return activation_fn(np.dot(X, weights))

def backward_propagation(X, y, output, learning_rate):
    error = y - output
    gradient = np.dot(X.T, error) * learning_rate
    return gradient
                       </code></pre>
                   </div>`;

        question = `<div class="question-container">
                        <h4>Quiz:</h4>
                        <p>What is the purpose of backpropagation in neural networks?</p>
                        <input type="radio" id="q4a1" name="q4" value="a1">
                        <label for="q4a1">To calculate the output of the network</label><br>
                        <input type="radio" id="q4a2" name="q4" value="a2">
                        <label for="q4a2">To adjust the weights based on the error</label><br>
                        <input type="radio" id="q4a3" name="q4" value="a3">
                        <label for="q4a3">To optimize the activation function</label><br>
                        <button onclick="checkAnswer('q4', 'a2')">Check Answer</button>
                        <p id="q4Answer"></p>
                   </div>`;
    }

    mainContent.innerHTML = content + question;
    Prism.highlightAll();
}

function checkAnswer(questionId, correctAnswer) {
    const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
    const resultMessage = document.getElementById(`${questionId}Answer`);
    
    if (!selectedAnswer) {
        resultMessage.textContent = "Please select an answer.";
        resultMessage.style.color = "red";
        return;
    }
    
    if (selectedAnswer.value === correctAnswer) {
        resultMessage.textContent = "Correct answer!";
        resultMessage.style.color = "#158e5d";
    } else {
        resultMessage.textContent = "Incorrect answer. Try again!";
        resultMessage.style.color = "red";
    }
}
