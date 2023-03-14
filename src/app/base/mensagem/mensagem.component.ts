import { Component, Input } from '@angular/core';
import { tipoMensagem } from 'src/app/enums';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent {
  @Input() mensagem: string = ''
  @Input() tipoMensagem: string = tipoMensagem.Aviso.toString()
}
