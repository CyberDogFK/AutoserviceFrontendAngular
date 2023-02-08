import {Component, Input, OnInit} from '@angular/core';
import {formatDate, Location} from "@angular/common";
import {OrderResponseDto} from "../model/response/OrderResponseDto";
import {OrderService} from "../service/order.service";
import {ActivatedRoute} from "@angular/router";
import {Form, FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() order?: OrderResponseDto;
  @Input() dates?: Date

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
  ) {}

  private form?: FormGroup;

  ngOnInit(): void {
    this.getOrder();

    this.form = this.formBuilder.group({
      carId: [this.order?.carId, [Validators.required]],
      problemDescription: [this.order?.problemDescription, [Validators.required]],
      acceptanceDate: [this.order?.acceptanceDate, [Validators.required]]});
  }

  getOrder(): void {
    const id = BigInt(Number(this.route.snapshot.paramMap.get('id')));
    this.orderService.getOrder(id)
      .subscribe(order => this.order = order);
  }

  update(): void {
    if (this.order && this.form) {
      this.form.patchValue({
        problemDescription: 'promblem',
        acceptanceDate: formatDate(this.order.acceptanceDate, 'yyyy', 'en-US')
      })
      this.orderService.updateOrder(this.order)
        .subscribe(order => this.order = order);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
