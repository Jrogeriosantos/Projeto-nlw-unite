//array
let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024,2,22,19,20),
    dataCheckIn: null,
  },
  {
    nome: "Rogério Santos",
    email: "rogerio@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0),
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: null,
  },
  {
    nome: "João Oliveira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 14, 45),
    dataCheckIn: new Date(2024, 2, 25, 20, 30),
  },
  {
    nome: "Maria Souza",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 8, 0),
    dataCheckIn: new Date(2024, 2, 25, 20, 0),
  },
  {
    nome: "Pedro Carvalho",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 12, 15),
    dataCheckIn: null,
  },
  {
    nome: "Lúcia Pereira",
    email: "lucia@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 15, 30),
    dataCheckIn: new Date(2024, 2, 25, 19, 0),
  },
  {
    nome: "Carlos Martins",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 9, 45),
    dataCheckIn: new Date(2024, 2, 25, 18, 30),
  },
  {
    nome: "Patrícia Lima",
    email: "patricia@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 13, 0),
    dataCheckIn: new Date(2024, 2, 25, 18, 0),
  },
  {
    nome: "Fernando Costa",
    email: "fernando@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 16, 15),
    dataCheckIn: new Date(2024, 2, 25, 17, 30),
  },
]
const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </butoon>
    `
  }
  
  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td> ${dataInscricao} </td>
      <td> ${dataCheckIn} </td>
    </tr>
    `
}

const atualizarLista = (participantes) => { 
  let output =""

  //estrutura de repetição - loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
  //substituir informação do HTML
  document.querySelector ('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()


  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participantesExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if (participantesExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if (confirm(mensagemConfirmacao) == false) {
    return
  }

 // encontrar o participante dentro da lista
 const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
 })
 // atualizar o check-in do participante
 participante.dataCheckIn = new Date()
 // atualizar a lista de participantes.
 atualizarLista(participantes)
}

