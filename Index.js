const synaptic = require("synaptic");
const fs = require("fs");

// Criando a rede neural
const { Layer, Network, Trainer } = synaptic;

const inputLayer = new Layer(3);
const hiddenLayer = new Layer(5);
const outputLayer = new Layer(3);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const neuralNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer,
});

const trainer = new Trainer(neuralNetwork);

// Função para treinar com respostas do usuário
function trainWithUserInput(input, expectedOutput) {
  trainer.train([{ input, output: expectedOutput }], {
    rate: 0.1,
    iterations: 5000,
    shuffle: true,
    log: 1000,
  });

  // Salvar os pesos aprendidos em um arquivo JSON
  fs.writeFileSync("neuralData.json", JSON.stringify(neuralNetwork.toJSON(), null, 2));
}

// Pergunta ao modelo e ajuste com resposta do usuário
function askModel(input) {
  const prediction = neuralNetwork.activate(input);
  console.log("Resposta da IA:", prediction);
  
  // Simulação: Perguntamos ao usuário se a resposta está correta
  const userFeedback = [1, 0, 0]; // Exemplo de resposta do usuário

  trainWithUserInput(input, userFeedback);
  console.log("Modelo atualizado com nova resposta!");
}

// Exemplo de uso
const userQuestion = [0, 0, 1]; // Entrada fictícia
askModel(userQuestion);
