  export const transacao = [
    { nome: "nome", label: "Nome", tipo: "text" },
    { nome: "descricao", label: "Descrição", tipo: "text" },
    { nome: "valor", label: "Valor", tipo: "number" },
    { nome: "conta", label: "Conta", tipo: "select", lista: "contas" },
    { nome: "categoria", label: "Categoria", tipo: "select", lista: "categorias" },
    { nome: "tipo", label: "Tipo", tipo: "select", lista: "tipos" },
    { nome: "data", label: "Data", tipo: "date" },
    { nome: "parcela", label: "Parcela", tipo: "number" }
  ];

  export const conta = [
    { nome: "nome", label: "Nome", tipo: "text" },
  ]

  export const categoria = [
    { nome: "nome", label: "Nome", tipo: "text" },
  ]