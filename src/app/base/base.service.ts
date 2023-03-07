import { EventEmitter, Injectable } from '@angular/core';

type Chute = {
  Tentativa: number,
  Campo: number,
  Letra: string
}

export enum statusLetra {
  PosicaoCerta,
  PosicaoErrada,
  NaoExiste
}
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  Palavras: string[] = ["falso", "bacia", "wordle"]
  chute: Chute = {
    Tentativa: 1,
    Campo: 1,
    Letra: ''
  }
  Verificacao: statusLetra[] = []
  PalavraSecreta: string = ""
  Tentativa: number = 1
  Campo: number = 1
  Palavra: string[] = []
  LetraDigitada = new EventEmitter<Chute>()
  LetraApagada = new EventEmitter<Chute>()
  VerificaChute = new EventEmitter<Array<statusLetra>>()
  constructor() { }

  addLetraChute(letra: string) {
    if(this.Palavra.length < 5) {
      this.Palavra.push(letra)
      this.chute.Letra = letra
      this.LetraDigitada.emit(this.chute)
      this.chute.Campo ++
    }
  }
  removeLetraChute() {
    this.Palavra.pop()
    this.chute.Campo --;
    this.LetraApagada.emit(this.chute)
  }
  verificaLetrasDoChute() {
    this.Palavra.forEach((letraChute, index) => {
      if(letraChute.toLowerCase() === this.PalavraSecreta[index]) {
        this.Verificacao.push(statusLetra.PosicaoCerta)
      } else if(this.PalavraSecreta.indexOf(letraChute.toLowerCase()) !== -1) {
        console.log(letraChute)
        console.log(this.PalavraSecreta.indexOf(letraChute.toLowerCase()))
        this.Verificacao.push(statusLetra.PosicaoErrada)
      } else {
        this.Verificacao.push(statusLetra.NaoExiste)
      }
    });
    this.VerificaChute.emit(this.Verificacao);
    this.Tentativa ++;
  }
}
