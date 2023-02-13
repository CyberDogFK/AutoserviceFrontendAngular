import {Component, OnInit} from '@angular/core';
import {OrderResponseDto} from "../model/response/OrderResponseDto";
import {OrderService} from "../service/order.service";
import {OrderStatus} from "../model/OrderStatus";
import {OrderRequestDto} from "../model/request/OrderRequestDto";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: OrderResponseDto[] = [];
  price?: string;

  constructor(
    public orderService: OrderService,
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders)
      .add(() => this.sort())
  }

  addOrder(carId: number, problemDescription: string,
            serviceIds: number[], articleIds: number[], unAcceptanceDate: Date | null, uncompleteDate?: Date | null): void {
    if (!carId || !problemDescription
      || !unAcceptanceDate || !serviceIds
      || !articleIds || !uncompleteDate) {
      return;
    }

    const acceptanceDate = formatDate(unAcceptanceDate, 'yyyy-MM-dd', 'en-US')
    const completeDate = formatDate(unAcceptanceDate, 'yyyy-MM-dd', 'en-US')

    if (!acceptanceDate || !completeDate) {
      return;
    }

    let status = OrderStatus.ACCEPTED.trim();

    this.orderService.addOrder({carId, problemDescription, acceptanceDate, serviceIds,
      articleIds, status, completeDate} as OrderRequestDto)
      .subscribe(order => this.orders.push(order));
  }

  setOrderStatus(id: bigint, statusString: string) {
    let status = statusString as OrderStatus;
    this.orderService.updateOrderStatus(id, status)
      .subscribe(() => this.ngOnInit());
  }

  getPrice(id: number): string {
    let result = '';
    this.orderService.getOrderPrice(id)
      .subscribe((value) => {
        this.price = value.toString();
        result = value.toString();
      });
    return result;
  }

  sort(): void {
    this.orders.sort((a, b) => (
      a.id < b.id ? -1 : 1
    ));
  }
}
