import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';


@Injectable()
export class AuthenticationProvider {

    config = environment;

    constructor(
        private http: HttpClient,
        private router: Router
    ){}


    login(user){
        return this.http.post(this.config.apiUrl + '/auth/signin',user)
        .toPromise()
        .then(resp=>{
            return resp;
        });

    }


    cadastro(user){
        return this.http.post(this.config.apiUrl + '/auth/signup',user)
        .toPromise()
        .then(resp=>{
            return resp;
        });

    }
}