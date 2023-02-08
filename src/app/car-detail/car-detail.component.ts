import {Component, Input, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import {CarService} from "../service/car.service";
import {ActivatedRoute} from "@angular/router";
import {CarResponseDto} from "../model/response/CarResponseDto";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {
  @Input() car?: CarResponseDto;

  constructor (
    private location: Location,
    private carService: CarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCar();
  }

  getCar(): void {
    const id = BigInt(Number(this.route.snapshot.paramMap.get('id')));
    this.carService.getCar(id)
      .subscribe(car => this.car = car);
  }

  update(): void {
    if (this.car) {
      this.carService.updateCar(this.car)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
