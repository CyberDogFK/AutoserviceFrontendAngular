import {Component, Input, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import {ArticleService} from "../service/article.service";
import {ActivatedRoute} from "@angular/router";
import {MasterResponseDto} from "../model/response/MasterResponseDto";
import {MasterService} from "../service/master.service";
import {OrderResponseDto} from "../model/response/OrderResponseDto";

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit{
  @Input() master?: MasterResponseDto;
  orders?: OrderResponseDto[];
  salary?: number;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.getMaster();
  }

  getMaster(): void {
    const id = BigInt(Number(this.route.snapshot.paramMap.get('id')));
    this.masterService.getMaster(id)
      .subscribe(master =>  this.master = master)
      .add(() => this.getOrders());
  }

  getSalary(): void {
    if (this.master) {
      this.masterService.getSalaryForMaster(this.master.id)
        .subscribe(salary => this.salary = salary);
    }
  }

  update(): void {
    if (this.master) {
      this.masterService.updateMaster(this.master)
        .subscribe(() => this.goBack());
    }
  }

  getOrders(): void {
    if (this.master) {
      this.masterService.getOrdersForMaster(this.master.id)
        .subscribe(orders => this.orders = orders)
    }
  }

  goBack(): void {
    this.location.back();
  }
}
