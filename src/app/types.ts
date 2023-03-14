import { tipoMensagem } from "./enums"

export type Chute = {
  tentativaAtual: number,
  campoAtual: number,
  letra: string
}

export type Mensagem = {
  tipo: tipoMensagem,
  textoMensagem: string
}