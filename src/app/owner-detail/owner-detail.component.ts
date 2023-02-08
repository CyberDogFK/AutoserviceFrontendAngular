import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OwnerService} from "../service/owner.service";
import {Location} from "@angular/common";
import {OwnerResponseDto} from "../model/response/OwnerResponseDto";
import {CarResponseDto} from "../model/response/CarResponseDto";
import {OrderResponseDto} from "../model/response/OrderResponseDto";

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss']
})
export class OwnerDetailComponent implements OnInit {
  @Input() owner?: OwnerResponseDto;
  @Input() cars?: CarResponseDto[];
  @Input() orders?: OrderResponseDto[];

  constructor (
    private location: Location,
    private route: ActivatedRoute,
    private ownerService: OwnerService
  ) {}

  ngOnInit(): void {
    this.getOwner();
  }

  getOwner(): void {
    const id = BigInt(Number(this.route.snapshot.paramMap.get('id')));
    this.ownerService.getOwner(id)
      .subscribe(owner => {
        this.owner = owner;
        this.getOwnerOrders();
        this.getOwnerCars();
      });
  }

  updateOwner(): void {
    if (this.owner) {
      this.ownerService.updateOwner(this.owner)
        .subscribe(() => this.goBack());
    }
  }

  getOwnerCars(): void {
    if (this.owner) {
      this.ownerService.getOwnerCars(this.owner.id)
        .subscribe(cars => this.cars = cars);
    }
  }

  getOwnerOrders(): void {
    if (this.owner) {
      this.ownerService.getOwnerOrders(this.owner.id)
        .subscribe(orders => this.orders = orders);
    }
  }

  add(id: number): void {
    this.getOwner();
    if (this.owner) {
      this.owner.carsIds.push(id);
      this.update();
    }
  }

  remove(id: bigint): void {
    this.getOwner();
    if (this.owner) {
      let number = this.owner.carsIds.indexOf(Number(id));
      this.owner.carsIds.splice(number, 1);
      this.update();
    }
  }

  update(): void {
    if (this.owner) {
      this.ownerService.updateOwner(this.owner)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
