import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrintComponent } from './print/print.component';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import { PasswordValidatorPipe } from './pipes/password-validator.pipe';
import { HeaderComponent } from './header/header.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    LoginComponent,
    RegisterComponent,
    PrintComponent,
    PaymentComponent,
    DashboardComponent,
    PasswordValidatorPipe,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgxPrintModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
