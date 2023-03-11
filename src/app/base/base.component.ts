import { Component } from '@angular/core';
import { BaseService } from './base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  constructor(private baseService: BaseService) {}
  mostrarAviso: boolean = true
  mensagemAviso: string = 'teste'
  ngOnInit() {
    const random = Math.floor(Math.random() * this.baseService.palavras.length);
    console.log(random)
    this.baseService.palavraSecreta = this.baseService.palavras[random]
    console.log(this.baseService.palavraSecreta)
  }
}
