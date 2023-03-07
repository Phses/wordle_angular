import { Component } from '@angular/core';
import { BaseService } from './base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  constructor(private baseService: BaseService) {}

  ngOnInit() {
    const random = Math.floor(Math.random() * this.baseService.Palavras.length);
    console.log(random)
    this.baseService.PalavraSecreta = this.baseService.Palavras[random]
    console.log(this.baseService.PalavraSecreta)
  }
}
