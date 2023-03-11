import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { statusLetra } from 'src/app/enums';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss']
})
export class TecladoComponent {

  verificaPalavraChuteSubscription: Subscription = new Subscription
  letrasJaChutadas: string[] = []

  constructor(private baseService: BaseService, private elementRef: ElementRef, private renderer: Renderer2) {}
  
  ngOnInit() {
    
    this.verificaPalavraChuteSubscription = this.baseService.verificaPalavraChute.subscribe((verificacao) => {
      for(let i = 0; i < this.baseService.palavraChute.length; i++) {
        console.log(this.baseService.palavraChute[i].toLocaleLowerCase())
        const letra: string = this.baseService.palavraChute[i].toLocaleLowerCase()
        if(this.letrasJaChutadas.find(x => x === letra)) {
          return
        }
        this.letrasJaChutadas.push(letra)
        const tecla = this.elementRef.nativeElement.querySelector(`.${letra}`)
        console.log(tecla)
        switch(verificacao[i]) {
          case statusLetra.PosicaoCerta:
            this.renderer.addClass(tecla, 'letraExiste')
            break;
          case statusLetra.PosicaoErrada:
            this.renderer.addClass(tecla, 'letraExiste')
            break;
          case statusLetra.NaoExiste:
            this.renderer.addClass(tecla, 'naoExiste');
            break;
        }
      }
    })
  }
  onClick(letraChute: string): void {
    console.log(letraChute)
    this.baseService.addLetraChute(letraChute)
  }
  apagarLetra(): void {
    this.baseService.removeLetraChute()
  }
  verificaChute(): void {
    this.baseService.verificaLetrasDoChute()
  }
}
