import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Debt } from 'model/debt';
import { environment } from '../environments/environment';


@Injectable()
export class DebtProvider {

    config = environment;

    constructor(
        private http: HttpClient,
        private router: Router
    ){}


    getDebtsFromClient(clientId: String){
        return this.http.get(this.config.apiUrl + '/debt/client/'+clientId)
        .toPromise()
        .then(resp=>{
            return resp;
        });

    }

    getDebtById(debtId: String){
        return this.http.get(this.config.apiUrl + '/debt/'+debtId)
        .toPromise()
        .then(resp=>{
            return resp;
        });

    }


    createDebt(debt: Debt){
        return this.http.post(this.config.apiUrl + '/debt',debt)
        .toPromise()
        .then(resp=>{
            return resp;
        });
    }

    updateDebt(debt: Debt){
        return this.http.put(this.config.apiUrl + '/debt',debt)
        .toPromise()
        .then(resp=>{
            return resp;
        });
    }

    deleteDebt(debtId: String){
        return this.http.delete(this.config.apiUrl + '/debt/' + debtId)
        .toPromise()
        .then(resp=>{
            return resp;
        });
    }

}