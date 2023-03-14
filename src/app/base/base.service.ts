import { EventEmitter, Injectable } from '@angular/core';
import { statusLetra, tipoMensagem } from '../enums';
import { Chute, Mensagem } from '../types';

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
  emiteMensagem = new EventEmitter<Mensagem>()

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
      this.verificaPalavraChute.emit(this.verificacaoDasLetras);
      if(this.verificaSeGanhou()) {
        const mensagem: Mensagem = {
          tipo: tipoMensagem.Sucesso,
          textoMensagem: "Parabéns você ganhou!"
        }
        this.emiteMensagem.emit(mensagem);
        return
      }
      console.log(this.chute.tentativaAtual);
      console.log(this.numeroDeTentativas)
      if(this.verificaSePerdeu()) {
        const mensagem: Mensagem = {
          tipo: tipoMensagem.Erro,
          textoMensagem: "Você perdeu, tente outra palavra!"
        }
        this.emiteMensagem.emit(mensagem);
        return
      }
      this.chute.tentativaAtual ++;
      this.chute.campoAtual = 1;
      while(this.palavraChute.length) {
        this.palavraChute.pop();
      }
      while(this.verificacaoDasLetras.length) {
        this.verificacaoDasLetras.pop();
      }
    } else {
      const mensagem: Mensagem = {
        tipo: tipoMensagem.Erro,
        textoMensagem: "Preencha todas as letras"
      }
      this.emiteMensagem.emit(mensagem);
    }
  }
  verificaSeGanhou(): boolean {
    if(this.verificacaoDasLetras.indexOf(statusLetra.NaoExiste) == -1 && this.verificacaoDasLetras.indexOf(statusLetra.PosicaoErrada) == -1) {
      return true
    }
    return false
  }

  verificaSePerdeu(): boolean {
    if(this.verificacaoDasLetras.indexOf(statusLetra.NaoExiste) == -1 || this.verificacaoDasLetras.indexOf(statusLetra.PosicaoErrada) == -1) {
      if(this.chute.tentativaAtual === this.numeroDeTentativas) {
        return true
      }
      return false
    }
    return false
  }
}
