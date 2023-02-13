import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { CarComponent } from './car/car.component';
import { TempComponent } from './temp/temp.component';
import {HttpClientModule} from "@angular/common/http";
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CarDetailComponent } from './car-detail/car-detail.component';
import { MasterComponent } from './master/master.component';
import { MasterDetailComponent } from './master-detail/master-detail.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnerDetailComponent } from './owner-detail/owner-detail.component';
import { ServiceComponent } from './services/service.component';
import { ServiceDetailComponent } from './services-detail/service-detail.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    TempComponent,
    ArticleDetailComponent,
    CarComponent,
    CarDetailComponent,
    MasterComponent,
    MasterDetailComponent,
    OwnerComponent,
    OwnerDetailComponent,
    ServiceComponent,
    ServiceDetailComponent,
    OrderComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
