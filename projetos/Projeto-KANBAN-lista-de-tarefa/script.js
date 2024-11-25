document.addEventListener("DOMContentLoaded", () => {
  const inputAberto = document.getElementById('inputAberto');
  const addTaskBtn = document.getElementById('addTaskBtn');

  carregarTarefas();

  addTaskBtn.addEventListener("click", () => {
      const texto = inputAberto.value.trim();
      if (texto !== '') {
          adicionarTarefa(texto);
          inputAberto.value = ''; 
          salvarTarefas(); 
      }
  });
});


function adicionarTarefa(descricao) {
  const listaAberto = document.getElementById('taskListAberto');

  const tarefa = document.createElement('li');
  tarefa.classList.add('task-item');
  tarefa.innerHTML = `
      <span>${descricao}</span>
      <div class="task-buttons">
          <button class="bid" onclick="moverTarefa(this, 'taskListBid')"></button>
          <button class="andamento" onclick="moverTarefa(this, 'taskListAndamento')"></button>
          <button class="entregue" onclick="moverTarefa(this, 'taskListEntregue')"></button>
      </div>
  `;

  listaAberto.appendChild(tarefa); 
  salvarTarefas(); 
}


function moverTarefa(button, destinoId) {
  const tarefa = button.closest('li');
  const destino = document.getElementById(destinoId);

  
  if (destinoId === 'taskListEntregue') {
      tarefa.querySelector('.task-buttons').innerHTML = `
          <button class="remover" onclick="removerTarefa(this)">Remover</button>
      `;
  }

  destino.appendChild(tarefa);
  salvarTarefas(); 
}


function removerTarefa(button) {
  const tarefa = button.closest('li');
  tarefa.remove(); 
  salvarTarefas(); 
}


function salvarTarefas() {
  const colunas = ['taskListAberto', 'taskListBid', 'taskListAndamento', 'taskListEntregue'];
  const tarefas = {};

  
  colunas.forEach(colunaId => {
      const lista = document.getElementById(colunaId);
      const tarefasColuna = [];
      lista.querySelectorAll('li').forEach(tarefa => {
          tarefasColuna.push(tarefa.innerHTML); 
      });
      tarefas[colunaId] = tarefasColuna; 
  });

  localStorage.setItem('tarefas', JSON.stringify(tarefas)); 
}


function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem('tarefas'));
  if (tarefas) {
      for (const colunaId in tarefas) {
          const lista = document.getElementById(colunaId);
          tarefas[colunaId].forEach(tarefaHTML => {
              const tarefa = document.createElement('li');
              tarefa.classList.add('task-item');
              tarefa.innerHTML = tarefaHTML; 
              lista.appendChild(tarefa);
          });
      }
  }
}