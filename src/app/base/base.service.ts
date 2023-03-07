import { EventEmitter, Injectable } from '@angular/core';

type Chute = {
  Tentativa: number,
  Campo: number,
  Letra: string
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
  Tentativa: number = 1
  Campo: number = 1
  Palavra: string[] = []
  LetraDigitada = new EventEmitter<Chute>()
  LetraApagada = new EventEmitter<Chute>()
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
}
