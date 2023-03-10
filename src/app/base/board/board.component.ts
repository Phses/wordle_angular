import { Component, ElementRef, Renderer2 } from '@angular/core';
import { statusLetra } from 'src/app/enums';
import { Subscription } from 'rxjs';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  letraDigitadaSubscription: Subscription = new Subscription
  letraApagadaSubscription: Subscription = new Subscription
  verificaPalavraChuteSubscription: Subscription = new Subscription
  constructor(private baseService: BaseService, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.letraDigitadaSubscription = this.baseService.letraDigitada.subscribe((chute) => {
      const campo = this.elementRef.nativeElement.querySelector(`.tentativa-${chute.tentativaAtual} .campo-${chute.campoAtual}`);
      this.renderer.setProperty(campo, 'textContent', chute.letra);
    })
    this.letraApagadaSubscription = this.baseService.letraApagada.subscribe((chute) => {
      const campo = this.elementRef.nativeElement.querySelector(`.tentativa-${chute.tentativaAtual} .campo-${chute.campoAtual}`);
      this.renderer.setProperty(campo, 'textContent', "");
    })
    this.verificaPalavraChuteSubscription = this.baseService.verificaPalavraChute.subscribe((verificacao) => {
      for(let i = 0; i <= 6; i++) {
        const campo = this.elementRef.nativeElement.querySelector(`.tentativa-${this.baseService.chute.tentativaAtual} .campo-${i + 1}`)
        switch(verificacao[i]) {
          case statusLetra.PosicaoCerta:
            this.renderer.addClass(campo, 'posicaoCerta');
            break;
          case statusLetra.PosicaoErrada:
            this.renderer.addClass(campo, 'posicaoErrada');
            break;
          case statusLetra.NaoExiste:
            this.renderer.addClass(campo, 'naoExiste');
            break;
        }
      }
    })
  }
  ngOnDestroy() {
    this.letraDigitadaSubscription.unsubscribe();
    this.letraApagadaSubscription.unsubscribe();
    this.verificaPalavraChuteSubscription.unsubscribe();
  }
}
