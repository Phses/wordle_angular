import { Component, ElementRef, Renderer2 } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  constructor(private baseService: BaseService, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.baseService.LetraDigitada.subscribe((chute) => {
      const campo = this.elementRef.nativeElement.querySelector(`.tentativa-${chute.Tentativa} .campo-${chute.Campo}`);
      this.renderer.setProperty(campo, 'textContent', chute.Letra);
    })
    this.baseService.LetraApagada.subscribe((chute) => {
      const campo = this.elementRef.nativeElement.querySelector(`.tentativa-${chute.Tentativa} .campo-${chute.Campo}`);
      this.renderer.setProperty(campo, 'textContent', "");
    })
  }
}
