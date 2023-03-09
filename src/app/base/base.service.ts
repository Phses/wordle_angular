import { EventEmitter, Injectable } from '@angular/core';
import { statusLetra } from '../enums';
import { Chute } from '../types';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  palavras: string[] = ["falso", "bacia", "wordle"]
  chute: Chute = {
    tentativaAtual: 1,
    campoAtual: 1,
    letra: ''
  }
  numeDeLetrasPalavraSecreta: number = 5
  verificacaoDasLetras: statusLetra[] = []
  palavraSecreta: string = ""
  numeroDeTentativas: number = 6
  palavraChute: string[] = []
  letraDigitada = new EventEmitter<Chute>()
  letraApagada = new EventEmitter<Chute>()
  verificaPalavraChute = new EventEmitter<Array<statusLetra>>()

  constructor() { }

  addLetraChute(letra: string) {
    if(this.palavraChute.length < this.numeDeLetrasPalavraSecreta) {
      this.palavraChute.push(letra)
      this.chute.letra = letra
      this.letraDigitada.emit(this.chute)
      this.chute.campoAtual ++
    }
  }
  removeLetraChute() {
    this.palavraChute.pop()
    this.chute.campoAtual --;
    this.letraApagada.emit(this.chute)
  }
  verificaLetrasDoChute() {
    if(this.palavraChute.length === this.numeDeLetrasPalavraSecreta) {
      this.palavraChute.forEach((letraChute, index) => {
        if(letraChute.toLowerCase() === this.palavraSecreta[index]) {
          this.verificacaoDasLetras.push(statusLetra.PosicaoCerta)
        } else if(this.palavraSecreta.indexOf(letraChute.toLowerCase()) !== -1) {
          console.log(letraChute)
          console.log(this.palavraSecreta.indexOf(letraChute.toLowerCase()))
          this.verificacaoDasLetras.push(statusLetra.PosicaoErrada)
        } else {
          this.verificacaoDasLetras.push(statusLetra.NaoExiste)
        }
      });
    }
    this.verificaPalavraChute.emit(this.verificacaoDasLetras);
    this.chute.tentativaAtual ++;
    this.chute.campoAtual = 1;
    while(this.palavraChute.length) {
      this.palavraChute.pop();
    }
    while(this.verificacaoDasLetras.length) {
      this.verificacaoDasLetras.pop();
    }
  }
}
