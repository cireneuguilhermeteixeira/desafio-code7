import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DebtRegisterComponent } from '../../debt-register/debt-register.component';
import { ClientsComponent } from '../../clients/clients.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { ClientProvider } from '../../../providers/client';
import { DebtProvider } from '../../../providers/debt';



@NgModule({
  imports: [
    MatCheckboxModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ToastrModule.forRoot({ autoDismiss: true, }),
    MatTooltipModule,
  ],
  declarations: [
    DebtRegisterComponent,
    ClientsComponent,
  ],
  providers: [
    ClientProvider,
    DebtProvider
  ]
})

export class AdminLayoutModule {}
