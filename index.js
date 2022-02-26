const getClienteById = (id) => {
  let divTable = document.querySelector("#table");
  divTable.innerHTML = `
  <div style="margin-left: 45%;" style="text-align:center;" class="spinner-grow text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

  const url = id > 0 ? `https://localhost:44358/Clientes/Listar/${id}` : `https://localhost:44358/Clientes/Listar/All`;
    setTimeout(() => {
      axios.get(url)
        .then(response => {
          let clientes = response.data;
          let trd;
          let newDate;
          clientes.forEach(cliente => {
            newDate = new Date(cliente.nascimento).toLocaleDateString("pt-BR");
            trd += `
              <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${newDate}</td>
              </tr>
            `;
          })

          table.innerHTML = `
            <table class="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Dt Nasc</th>
                </tr>
              </thead>
              <tbody>
              ${trd}
              </tbody>
            </table>`;
      })
      .catch(error => console.log(error))
    }, 1500)
}

$(document).ready(getClienteById(0))

let id = document.querySelector("#id-cliente")
let nome = document.querySelector("#nome");
let cpf = document.querySelector("#cpf");
let nascimento = document.querySelector("#nascimento");

function findCliente() {
  getClienteById(id.value);
}

const deleteClienteById = () => {
  axios.delete(`https://localhost:44358/Clientes/Deletar/${id.value}`)
  .then(response => {
    alert(response.data);
    getClienteById(0);
  })
  .catch(error => console.log(error))
}

const updateClienteById = () => {
  axios.put(`https://localhost:44358/Clientes/Atualizar/${id.value}`, {
    nome : nome.value,
    cpf : cpf.value,
    nascimento : nascimento.value
  })
  .then(response => {
    alert(response.data)
    console.log(response.data);
    getClienteById(0);
  })
  .catch(error => console.log(error))
}

const insertCliente = () => {
  axios.post(`https://localhost:44358/Clientes/Incluir`, [
    {
      nome : nome.value,
      cpf : cpf.value,
      nascimento : nascimento.value
    }
  ])
  .then(response => {
    alert(response.data);
    getClienteById(0);
  })
  .catch(error => console.log(error))
}