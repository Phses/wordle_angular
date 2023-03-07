import { Component, ElementRef, Renderer2 } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss']
})
export class TecladoComponent {

  constructor(private baseService: BaseService) {}

  onClick(letraChute: string): void {
    console.log(letraChute)
    this.baseService.addLetraChute(letraChute)
  }
  apagarLetra(): void {
    this.baseService.removeLetraChute()
  }
}
