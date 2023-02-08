import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from "./article/article.component";
import {CarComponent} from "./car/car.component";
import {TempComponent} from "./temp/temp.component";
import {ArticleDetailComponent} from "./article-detail/article-detail.component";
import {CarDetailComponent} from "./car-detail/car-detail.component";
import {MasterComponent} from "./master/master.component";
import {MasterDetailComponent} from "./master-detail/master-detail.component";
import {OwnerComponent} from "./owner/owner.component";
import {OwnerDetailComponent} from "./owner-detail/owner-detail.component";
import {ServiceComponent} from "./services/service.component";
import {ServiceDetailComponent} from "./services-detail/service-detail.component";
import {OrderComponent} from "./order/order.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";

const routes: Routes = [
  { path: ``, component: TempComponent, pathMatch: 'full'},
  { path: `article`, component: ArticleComponent },
  { path: `article/:id`, component: ArticleDetailComponent },
  { path: `car`, component: CarComponent },
  { path: `car/:id`, component: CarDetailComponent },
  { path: `master`, component: MasterComponent },
  { path: `master/:id`, component: MasterDetailComponent },
  { path: `owner`, component: OwnerComponent },
  { path: `owner/:id`, component: OwnerDetailComponent },
  { path: `service`, component: ServiceComponent },
  { path: `service/:id`, component: ServiceDetailComponent },
  { path: `order`, component: OrderComponent },
  { path: `order/:id`, component: OrderDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
