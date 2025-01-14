const wordElement = document.getElementById("word");
const inputBox = document.getElementById("inputBox");
const feedback = document.getElementById("feedback");
const successSound = document.getElementById("successSound");
const themeButtons = document.querySelectorAll(".theme-btn");
const wordImage = document.getElementById("word-image");

// Dicionário de temas e palavras
const themes = {
    animais: [
        "CACHORRO", "GATO", "ELEFANTE", "PASSARINHO", "PEIXE",
        "LEÃO", "TIGRE", "GIRAFA", "COELHO", "CROCODILO",
        "MACACO", "PINGUIM", "URSO", "COBRA", "BORBOLETA"
    ],
    objetos: [
        "CADEIRA", "MESA", "LIVRO", "CANETA", "CELULAR",
        "COMPUTADOR", "RELOGIO", "GARRAFA", "CHAVE", "OCULOS",
        "GUITARRA", "BICICLETA", "CAMERA", "LAMPADA", "MOCHILA"
    ],
    lugares: [
        "ESCOLA", "PRAIA", "PARQUE", "MERCADO", "IGREJA",
        "HOSPITAL", "BIBLIOTECA", "CINEMA", "RESTAURANTE", "AEROPORTO",
        "MUSEU", "ESTADIO", "ZOOLÓGICO", "FLoresta", "MONTAÑA"
    ]
};


let currentTheme = []; // Armazena as palavras do tema atual
let currentWordIndex = 0; // Índice da palavra atual

// Função para iniciar um tema
function selectTheme(theme) {
    currentTheme = themes[theme];
    currentWordIndex = 0;
    loadWord();
    inputBox.disabled = false;
    inputBox.value = "";
    feedback.innerHTML = "";
    inputBox.focus();
}

// Função para carregar uma palavra e sua imagem
function loadWord() {
    const currentWord = currentTheme[currentWordIndex];
    wordElement.textContent = currentWord;

    // Exibir imagem correspondente
    const imagePath = `images/${currentWord.toLowerCase()}.jpg`; // Caminho da imagem
    wordImage.src = imagePath;
    wordImage.style.display = "block"; // Exibir a imagem
}

// Função para verificar a entrada do usuário
function checkInput() {
    const typedText = inputBox.value.toUpperCase();
    const currentWord = currentTheme[currentWordIndex];

    let feedbackText = "";
    let isCorrect = true;

    for (let i = 0; i < currentWord.length; i++) {
        if (typedText[i] === currentWord[i]) {
            feedbackText += `<span style="color: green;">${currentWord[i]}</span>`;
        } else if (typedText[i]) {
            feedbackText += `<span style="color: red;">${typedText[i]}</span>`;
            isCorrect = false;
        } else {
            feedbackText += "_"; // Para letras não digitadas
            isCorrect = false;
        }
    }

    feedback.innerHTML = feedbackText;

    if (typedText === currentWord) {
        successSound.play();
        inputBox.value = "";
        currentWordIndex = (currentWordIndex + 1) % currentTheme.length; // Avançar para a próxima palavra
        setTimeout(() => {
            loadWord();
            feedback.innerHTML = "";
        }, 1000);
    }
}

// Adicionar eventos aos botões de tema
themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const theme = button.getAttribute("data-theme");
        selectTheme(theme);
    });
});

// Adicionar evento ao campo de entrada
inputBox.addEventListener("input", checkInput);
