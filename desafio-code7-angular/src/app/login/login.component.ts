import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { AuthenticationProvider } from '../../providers/authentication';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

export class LoginComponent implements OnInit {
    loading:boolean = false;
    currentUser: User;
    loginForm : FormGroup;
    registerForm: FormGroup;
    user: User;
    versao:String= '--';

    constructor(
        private authenticationProvider: AuthenticationProvider,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService) {

    }

    ngOnInit() {
        localStorage.clear();
        this.initForms();
        
    }


    checkPasswords(group: FormGroup) {
      const password = group.get('password').value;
      const confirmPassword = group.get('confirmPassword').value;
      return password === confirmPassword ? null : { notSame: true }     
    }

    initForms(){
      this.loginForm = this.formBuilder.group({
        email: this.formBuilder.control('',[Validators.required, Validators.email]),
        password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
      });

      this.registerForm = this.formBuilder.group({
        name:  this.formBuilder.control('',[Validators.required]),
        email: this.formBuilder.control('',[Validators.required, Validators.email]),
        password: this.formBuilder.control('',[Validators.required, Validators.minLength(6)]),
        confirmPassword: this.formBuilder.control('', [Validators.required, this.matchValues('password')]),
    });
    }


    matchValues(matchTo): (AbstractControl) => ValidationErrors | null {
      return (control: AbstractControl): ValidationErrors | null => {
        return !!control.parent && !!control.parent.value && control.value === control.parent.controls[matchTo].value
          ? null
          : { isMatching: false };
      };
    }
    

    login(){
        this.loading = true;
        this.authenticationProvider.login(this.loginForm.value)
        .then(resp=>{
            console.log(resp);
            
            if(resp['success']==true){
                localStorage.setItem('currentUser',JSON.stringify(resp['data']).replace(/\\"/g, '"'));
                this.router.navigate(['debt-register']);


            }else if(resp['success']== false){
                this.toastr.warning(resp['data']['message']);
                throw(resp);
            }           
        }).catch( error => {
            console.log('erro aqui oh: ' +  error);
            this.toastr.error('Erro ao se comunicar com o servidor', 'Ops!')       
        })
        .then(()=>this.loading=false);

    }

    register(){
      this.loading = true;
        this.authenticationProvider.cadastro(this.registerForm.value)
        .then(resp=>{
            console.log(resp);
            
            if(resp['success']==true){
                localStorage.setItem('currentUser',JSON.stringify(resp['data']).replace(/\\"/g, '"'));
                this.router.navigate(['debt-register']);
                

            }else if(resp['success']== false){
                this.toastr.warning(resp['data']['message']);
                throw(resp);
            }           
        }).catch( error => {
            console.log('erro: ' +  error);
            this.toastr.error('Erro ao se comunicar com o servidor', 'Ops!')       
        })
        .then(()=>this.loading=false);


    }
    
}