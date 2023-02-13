import {Component, Input, OnInit} from '@angular/core';
import {formatDate, Location} from "@angular/common";
import {OrderResponseDto} from "../model/response/OrderResponseDto";
import {OrderService} from "../service/order.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() order?: OrderResponseDto;

  private problemDescription = new FormControl('');
  private acceptanceDate = new FormControl('');
  private completeDate = new FormControl('');

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
  ) {}

  public form: FormGroup = this.formBuilder.group({
    problemDescription: [this.problemDescription, [Validators.required]],
    acceptanceDate: [this.acceptanceDate, [Validators.required]],
    completeDate: [this.completeDate, [Validators.required]],
    articles: [this.formBuilder.array([new FormControl()])]
  });

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    const id = BigInt(Number(this.route.snapshot.paramMap.get('id')));
    this.orderService.getOrder(id)
      .subscribe((order) => {
        this.order = order;
        console.log(this.order.articlesIds)
      });
  }

  update(): void {
    if (this.order && this.form) {
      if (this.form.value['acceptanceDate'].value) {
        const date = new Date((this.form.value['acceptanceDate']));
        this.form.patchValue({
          acceptanceDate: formatDate(date, 'yyyy-MM-dd', 'en-US').trim()
        })
        this.order.acceptanceDate = this.form.value['acceptanceDate'];
      }
      if (this.form.value['completeDate'].value) {
        const date = new Date((this.form.value['completeDate']));
        this.form.patchValue({
          completeDate: formatDate(date, 'yyyy-MM-dd', 'en-US').trim()
        })
        this.order.completedDate = this.form.value['completeDate'];
      }
      this.orderService.updateOrder(this.order)
        .subscribe(order => this.order = order);
    }
    this.goBack();
  }

  removeService(id: number): void {
      this.getOrder();
      if (this.order) {
        let index = this.order.servicesIds.indexOf(id);
        this.order.servicesIds.splice(index, 1);
        this.update();
      }
  }

  addService(id: number): void {
    this.getOrder();
    if (this.order) {
      this.order.servicesIds.push(id);
      this.update();
    }
  }

  removeArticle(id: number): void {
    this.getOrder();
    if (this.order) {
      let index = this.order.articlesIds.indexOf(id);
      this.order.articlesIds.splice(index, 1);
      this.update();
    }
  }

  addArticle(id: number): void {
    this.getOrder();
    if (this.order) {
      this.order.articlesIds.push(id);
      this.update();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
