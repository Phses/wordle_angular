import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board/board.component";
import { TecladoComponent } from "./teclado/teclado.component";
import { BaseComponent } from "./base.component";
import { BaseService } from "./base.service";
import { MensagemComponent } from './mensagem/mensagem.component';

@NgModule ({
  imports: [
    CommonModule
  ],
  declarations: [
    BaseComponent,
    BoardComponent,
    TecladoComponent,
    MensagemComponent
  ],
  providers: [BaseService]
})

export class BaseModule {}