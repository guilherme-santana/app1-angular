import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import {Frase} from '../shared/frase.model';
import {FRASES} from './frases-mock';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {
  
  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''
  public rodada: number =0
  public rodadaFrase: Frase
  public progressos:number =0
  public tentativas:number =3 
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()
 
  constructor() { 
    this.atualizaRodada()
    // console.log(this.rodadaFrase)
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    //console.log("Componente destruido")
  }

  public atualizaResposta(resposta: Event):void{
    this.resposta =(<HTMLInputElement>resposta.target).value
    // console.log(this.resposta)
  }

  public verificarResposta(): void{
    
    if(this.rodadaFrase.frasePtBr.toUpperCase() == this.resposta.toUpperCase()){
      //incrementa o atributo rodada
      this.rodada++
      //atualização da barra de progresso
      this.progressos = this.progressos + (100/this.frases.length) 
      //define o término com sucesso do jogo
      if(this.rodada ==this.frases.length){
        this.encerrarJogo.emit('vitoria')
       } 
      //atualiza o objeto rodadaFrase   
      this.atualizaRodada()
    }else{
      //decrementar a variavel tentativas
      this.tentativas--
      if(this.tentativas===-1){
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  public atualizaRodada(): void{
      //Define a frase da rodada com base em alguma lógica
      this.rodadaFrase = this.frases[this.rodada]   
      //limpar resposta
      this.resposta = ''  
  }

}
