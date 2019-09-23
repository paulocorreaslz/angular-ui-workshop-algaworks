import { Component, OnInit } from '@angular/core';
import { OportunidadeService } from '../oportunidade.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {

  oportunidade = {};
  oportunidades = [];
  

  constructor(
    private oportunidadeService: OportunidadeService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.oportunidadeService.listar()
      .subscribe(resposta => this.oportunidades = <any> resposta)
  }

  adicionar() {
    this.oportunidadeService.adicionar(this.oportunidade)
      .subscribe(() => {
        this.oportunidade = {};
        this.consultar();

        this.messageService.add({
          severity: 'success',
          summary: 'Oportunidade adicionada com sucesso'
        });
      },
      resposta => {
        let msg = 'Erro inesperado. Tente novamente.';

        if (resposta.error.message) {
          msg = resposta.error.message;
        }

        this.messageService.add({
          severity: 'error',
          summary: msg
        });
      });
  }

  deletar(id){
    let retornoHttp = {
      "headers":
        {
          "normalizedNames":{},
          "lazyUpdate":null
        },
      "status":0,
      "statusText":"",
      "url":"",
      "ok":false,
      "name":"",
      "message":"",
      "error":{
          "error":{},
          "text":""
      }
    }
    console.log('deletando:'+id);
    this.oportunidadeService.deletar(id)
    .subscribe(() => {
        
        this.oportunidade = {};
        this.consultar();
        
      },
      resposta => {
        let resSTR = JSON.stringify(resposta);
        retornoHttp = JSON.parse(resSTR);
        let msg = 'Erro inesperado. Tente novamente.';
        this.consultar();
        console.log("Mensagem: "+retornoHttp.error.text);

        if (resposta.error.message) {
          msg = resposta.error.message;
        } else {
          msg = retornoHttp.error.text;
        }

        this.messageService.add({
          severity: 'error',
          summary: msg
        });
      });
  }

}
