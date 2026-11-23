//Seleção dos elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

//Funções
//Letras, números e símbolos

//gera um número aleatório com Math.random e arrendonda-o com Math.floor para criar uma letra minúscula
//dentro da "biblioteca fromCharCode do método String"
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//gera um número aleatório com Math.random e arrendonda-o com Math.floor para criar uma letra maiúscula
//dentro da "biblioteca fromCharCode do método String"
const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//gera um número aleatório entre 0 e 9
const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}

//seleciona um caractere especial do array symbols
const getSymbol = () => {
    const symbols = "()[]=<>/,.!@#$%&*+-?;'|"
    return symbols[Math.floor(Math.random() * symbols.length)]
}

//chama as funções criadas anteriormente para gerar uma senha aleatória
const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    //variável que recebe a senha criada
    let password = ""

    //determina a quantidade de caracteres para a senha a ser criada
    const passwordLength = +lengthInput.value

    const generators = [];

    if (lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }

    if (numbersInput.checked) {
        generators.push(getNumber)
    }

    if (symbolsInput.checked) {
        generators.push(getSymbol)
    }

    if (generators.length === 0) {
        return
    }

    //através do loop "for", as funções de criação de caracteres são executadas de forma aleatória
    //e atribuem a let password os caracteres gerados para a senha
    for (i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue =
                generators[Math.floor(Math.random() * generators.length)]();
            password += randomValue
        })
    }

    //inicialmente password contém 12 caracteres e com .slice é "recortado" 2 caracteres extras da password
    password = password.slice(0, passwordLength)

    //insere no elemento selecionado o display block e apresenta a password no campo h4 do elemento
    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
}
//Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol)
})

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
})

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault()

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Copiada"
        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar Senha"
        }, 1000)
    })
})