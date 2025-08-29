export interface Escolhas {
    nome: string
    off: string
    on: string
}

export interface Usuarios {
    ordem: number
    comprador: string
    data: string
    status: number
}

export interface Status {
    cor: string
    nome: string
}

export interface Grafico {
    name: string
    Atual: number
    Previsto: number
}

export interface Produtos {
  nome: string
  desc: string
  icone: string
}

export interface Valores {
    budget: number
    customers: number
    task: any
    total: number
}

export interface Infos {
  [x: string]: string | number | readonly string[] | undefined
  nome: string
  email: string
  idade: string
  rg: string
  loc: string
  celular: string
  horario: string
  foto: string
}

export interface Senhas {
    senhaA: string
    senhaN: string
}

export interface Types {
    antiga: string
    nova: string
}

export interface Compradores {
    nome: string
    email: string
    loc: string
    cell: string
    rg: string
    foto: string
}

export interface Registro {
    email: string,
    senha: string,
    nome: string,
    idade: number,
    celular: string,
    rg: string
}