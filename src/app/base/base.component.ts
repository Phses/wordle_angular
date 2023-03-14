import { Component } from '@angular/core';
import { BaseService } from './base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  constructor(private baseService: BaseService) {}
  mostrarAviso: boolean = false
  mensagemAviso: string = ''
  tipoMensagem: string = ''
  ngOnInit() {
    const random = Math.floor(Math.random() * this.baseService.palavras.length);
    console.log(random)
    this.baseService.palavraSecreta = this.baseService.palavras[random]
    console.log(this.baseService.palavraSecreta)
    this.baseService.emiteMensagem.subscribe((mensagem) => {
      this.mostrarAviso = true;
      this.mensagemAviso = mensagem.textoMensagem
      this.tipoMensagem = mensagem.tipo
      console.log(mensagem.tipo.toString())
      setTimeout(() => {
        this.mostrarAviso = false;
      }, 3000)
    })
  }
}
