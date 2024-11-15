function copyCode(button) {
    const code = button.parentElement.querySelector('pre').innerText;
    navigator.clipboard.writeText(code).then(function() {
        // Створюємо повідомлення, яке з'являється на кілька секунд
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
        
        // Видаляємо повідомлення через 3 секунди
        setTimeout(() => {
            message.remove();
        }, 3000);
    }, function() {
        // Можна також показати повідомлення про помилку
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
        
        // Видаляємо повідомлення через 3 секунди
        setTimeout(() => {
            message.remove();
        }, 3000);
    });
}

function loadContent(section) {
    const mainContent = document.getElementById('mainContent');

    let content = '';
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
    } else if (section === 'section2') {
        content = `<h2>Perceptron Model</h2>
                   <p>The perceptron is one of the simplest types of artificial neural networks. It is a binary linear classifier that assigns inputs to one of two possible categories using weights and a threshold function. The model is based on a single layer of neurons, where each neuron calculates a weighted sum of its inputs, compares it to a threshold, and produces an output based on this comparison.</p>
                   <h3>Mathematical Representation</h3>
                   <p>The perceptron function is defined as:</p>
                   <div class="code-container">
                       <span class="copy-button" onclick="copyCode(this)">Copy</span>
                       <pre> <code class="language-python"># Python representation of perceptron
def perceptron(input, weights, threshold):
    weighted_sum = sum(w * i for w, i in zip(weights, input))
    return 1 if weighted_sum >= threshold else 0
                       </code> </pre>
                   </div>
                   <h3>Training the Perceptron</h3>
                   <p>The perceptron learns by adjusting weights based on errors from misclassified inputs. The algorithm iteratively improves its classification accuracy by minimizing errors. This process is done through the perceptron learning rule, which updates weights after each input is processed.</p>
                   <h3>Limitations</h3>
                   <p>Although the perceptron can classify linearly separable data, it cannot handle non-linear problems. The introduction of multi-layer networks and backpropagation solved this limitation, leading to more powerful models like deep neural networks.</p>`;
    } else if (section === 'section3') {
        content = `<h2>Activation Functions</h2>
                   <p>Activation functions introduce non-linearity into a neural network. Without them, the model would be limited to solving linear problems, regardless of the network's complexity. These functions determine whether a neuron should be activated or not based on the weighted sum of its inputs.</p>
                   <h3>Types of Activation Functions</h3>
                   <ul>
                       <li><b>Sigmoid:</b> Maps inputs to the range (0, 1), often used for binary classification. The sigmoid function is smooth and differentiable, making it suitable for gradient-based optimization.</li>
                       <li><b>Tanh:</b> Maps inputs to (-1, 1), making it useful for centered data. Tanh is a scaled version of the sigmoid function, which can help with convergence during training.</li>
                       <li><b>ReLU (Rectified Linear Unit):</b> Outputs 0 for negative inputs and the input itself for positive inputs. It is computationally efficient and widely used. ReLU has become the default activation function for many deep learning models.</li>
                   </ul>
                   <h3>Implementation Example</h3>
                   <div class="code-container">
                       <span class="copy-button" onclick="copyCode(this)">Copy</span>
                       <pre> <code class="language-python"># Python implementation of activation functions
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def relu(x):
    return max(0, x)

def tanh(x):
    return np.tanh(x)
                       </code> </pre>
                   </div>
                   <h3>Choosing an Activation Function</h3>
                   <p>The choice of activation function depends on the problem being solved. For binary classification, sigmoid is often used. For multi-class problems, softmax is typically preferred. ReLU is commonly used in hidden layers of deep neural networks due to its computational efficiency.</p>`;
    } else if (section === 'section4') {
        content = `<h2>Forward and Backward Propagation</h2>
                   <h3>Forward Propagation</h3>
                   <p>Forward propagation is the process of passing input data through the layers of a neural network to compute the output. Each layer transforms its inputs using weights, biases, and an activation function. The forward propagation process computes the activations for each layer in a feedforward manner.</p>
                   <h3>Backward Propagation</h3>
                   <p>Backward propagation, or backpropagation, is a technique used to minimize the loss function by updating the weights in the network. It works by calculating the gradient of the loss function with respect to each weight and then using an optimization algorithm like gradient descent to adjust the weights accordingly.</p>
                   <h3>Example Code for Forward Propagation</h3>
                   <div class="code-container">
                       <span class="copy-button" onclick="copyCode(this)">Copy</span>
                       <pre> <code class="language-python"># Forward propagation example
def forward_propagation(inputs, weights, biases, activation_function):
    layer_output = activation_function(np.dot(inputs, weights) + biases)
    return layer_output
                       </code> </pre>
                   </div>
                   <h3>Training a Neural Network</h3>
                   <p>To train a neural network, both forward and backward propagation are used in an iterative process. In each iteration, the network performs forward propagation to compute the output, calculates the error, and then uses backward propagation to update the weights and minimize the error.</p>
                   <h3>Optimization Algorithms</h3>
                   <p>Common optimization algorithms include gradient descent, stochastic gradient descent (SGD), and Adam. These algorithms adjust the learning rate and other hyperparameters to improve the training process and convergence speed.</p>`;
    }

    mainContent.innerHTML = content;

    // Re-initialize Prism.js after updating the content to ensure proper syntax highlighting
    Prism.highlightAll();
}
