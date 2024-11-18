// Seleciona os elementos do DOM
const display = document.getElementById("display");
const historico = document.getElementById("historico");
const botoes = document.querySelectorAll(".btn");

// Variáveis de controle
let valorAtual = "";
let operador = null;
let valorAnterior = "";

// Função para atualizar o display
function atualizarDisplay(valor) {
  display.textContent = valor;
}

// Função para exibir o histórico
function atualizarHistorico(texto) {
  historico.textContent = texto;
}

// Adicionar animação ao resultado
function animarResultado() {
  display.classList.add("animate");
  setTimeout(() => {
    display.classList.remove("animate");
  }, 200);
}

// Lógica dos botões
botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const valor = botao.getAttribute("data-value");

    if (valor) {
      // Botão numérico ou ponto
      if (!isNaN(valor) || valor === ".") {
        if (valor === "." && valorAtual.includes(".")) return;
        valorAtual += valor;
        atualizarDisplay(valorAtual);
      } else {
        // Botão de operação
        if (valorAtual) {
          valorAnterior = valorAtual;
          valorAtual = "";
        }
        operador = valor;
        atualizarHistorico(`${valorAnterior} ${operador}`);
      }
    } else if (botao.id === "igual") {
      // Botão de igual
      if (valorAnterior && operador && valorAtual) {
        try {
          const resultado = eval(`${valorAnterior} ${operador} ${valorAtual}`);
          atualizarHistorico(`${valorAnterior} ${operador} ${valorAtual} =`);
          valorAtual = resultado;
          valorAnterior = "";
          operador = null;
          atualizarDisplay(valorAtual);
          animarResultado();
        } catch (error) {
          atualizarDisplay("Erro");
        }
      }
    } else if (botao.id === "clear") {
      // Botão de limpar
      valorAtual = "";
      valorAnterior = "";
      operador = null;
      atualizarDisplay("0");
      atualizarHistorico("");
    }
  });
});
