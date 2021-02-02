import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'model/client';
import { Debt } from 'model/debt';
import { ClientProvider } from 'providers/client';
import { ToastrService } from 'ngx-toastr';
import { DebtProvider } from 'providers/debt';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-debt-register',
  templateUrl: './debt-register.component.html',
  styleUrls: ['./debt-register.component.css']
})
export class DebtRegisterComponent implements OnInit {
  currentClient : Client;
  currentDebt : Debt;
  clients: Array<Client> = [];
  loadingClients: boolean = false;
  loadingDebts: boolean = false;
  debtForm : FormGroup;
  debtsFromClient: Array<Debt> = [];
  savingOrUpdating : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private clientProvider: ClientProvider,
    private toastr: ToastrService,
    private debtProvider: DebtProvider
  ) { }

  ngOnInit() {
    this.currentClient = null;
    this.debtsFromClient = [];
    this.initNewForm();
    this.getClients();
  }


  getClients(){
    this.loadingClients = true;
    this.clientProvider.getClients()
    .then(resp=>{
      console.log(resp);
      
      if(resp['success']==true){
          this.clients = resp['data'];

      }else if(resp['success']== false){
          this.toastr.warning(resp['data']['message']);
          throw(resp);
      }           
    }).catch( error => {
        console.log('erro: ' +  error);
        this.toastr.error('Erro ao se comunicar com o servidor', 'Ops!')       
    })
    .then(()=>this.loadingClients=false)
  }

  deleteDebt(debt: Debt){
    Swal.fire({
      title: 'Aviso',
      text: 'Deseja realmente deletar a dívida('+debt._id+') de R$ '+debt.value+' do client de id '+debt.clientId+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.debtProvider.deleteDebt(String(debt._id))
        .then(resp=>{
        
          if(resp['success']){
            Swal.fire(
              'Ok!',
              'Dívida deletada com sucesso.',
              'success'
            ).then(()=>this.ngOnInit())
          }else{
            this.toastr.error(resp['data']['message']);
          }          
        }).catch(erro=>{
          this.toastr.error("Erro ao tentar deletar dívida.")
          console.log(erro);
          
        })
      }
    });
  }

  getDebtFromClient(){
    this.loadingDebts = true;
    this.debtProvider.getDebtsFromClient(String(this.currentClient.id))
    .then(resp=>{
      console.log(resp);
      
      if(resp['success']==true){
        this.debtsFromClient = resp['data']

      }else if(resp['success']== false){
          this.toastr.warning(resp['data']['message']);
          throw(resp);
      }         
    }).catch( error => {
        console.log('erro: ' +  error);
        this.toastr.error('Erro ao se comunicar com o servidor', 'Ops!')       
    })    
    .then(()=>this.loadingDebts=false)
  }


  changeClient(clientId){
    this.currentClient = this.clients.find(client => client.id == clientId);
    this.getDebtFromClient();
  }

  initNewForm(){
    this.debtForm = this.formBuilder.group({
      _id : this.formBuilder.control(''),
      clientId: this.formBuilder.control(null, Validators.required),
      reason: this.formBuilder.control(null, Validators.required),
      date: this.formBuilder.control(null, Validators.required),
      value: this.formBuilder.control(null, [Validators.required, Validators.min(1)]),
   
    });
  }



  saveDebt(){
    this.savingOrUpdating = true;
    let debToSave = this.debtForm.value;
    delete debToSave._id
    this.debtProvider.createDebt(debToSave)
    .then(resp=>{
      console.log(resp);
      
      if(resp['success']==true){
        this.toastr.success('Dívida salva com sucesso.');
        this.ngOnInit();
      }else if(resp['success']== false){
          this.toastr.warning(resp['data']['message']);
          throw(resp);
      }         
    }).catch( error => {
        console.log('erro: ' +  error);
        this.toastr.error('Erro ao se comunicar com o servidor', 'Ops!')       
    })
    .then(()=>this.savingOrUpdating=false)

  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  
  patchValueDebtForm(debtId:String){
    this.debtProvider.getDebtById(debtId)
    .then(resp=>{
      console.log(resp);
      
      if(resp['success']==true){
        this.currentDebt = resp['data'];
        this.debtForm.patchValue(this.currentDebt);
        this.debtForm.get('date').patchValue(this.formatDate(this.currentDebt.date))

      }else if(resp['success']== false){
          this.toastr.warning(resp['data']['message']);
          throw(resp);
      }        
    }).catch( error => {
        console.log('erro: ' +  error);
        this.toastr.error('Erro ao se comunicar com o servidor', 'Ops!')       
    })
    .then(()=>this.savingOrUpdating=false)
  }

  updateDebt(){
    this.savingOrUpdating = true;
    let debToUpdate: Debt = this.debtForm.value;
    this.debtProvider.updateDebt(debToUpdate)
    .then(resp=>{
      console.log(resp);
      
      if(resp['success']==true){
        this.toastr.success('Dívida atualizada com sucesso.');
        this.ngOnInit();
      }else if(resp['success']== false){
          this.toastr.warning(resp['data']['message']);
          throw(resp);
      }           
    }).catch( error => {
        console.log('erro: ' +  error);
        this.toastr.error('Erro ao se comunicar com o servidor', 'Ops!')       
    })
  }


}


