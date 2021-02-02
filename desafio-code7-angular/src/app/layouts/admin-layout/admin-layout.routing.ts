import { Routes } from '@angular/router';

import { DebtRegisterComponent } from '../../debt-register/debt-register.component';
import { ClientsComponent } from '../../clients/clients.component';


export const AdminLayoutRoutes: Routes = [
  
    { path: 'debt-register',  component: DebtRegisterComponent },
    { path: 'clients',        component: ClientsComponent },
];
