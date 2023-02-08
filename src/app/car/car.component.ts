import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {CarResponseDto} from "../model/response/CarResponseDto";
import {CarService} from "../service/car.service";
import {CarRequestDto} from "../model/request/CarRequestDto";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  cars: CarResponseDto[] = [];

  constructor(
    private location: Location,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars()
      .subscribe(cars => this.cars = cars)
      .add(() => this.sort())
  }

  add(brand: string, model: string, year: number, regNumber: string, ownerId: number): void {
    if (!brand || !model || !year || !regNumber || !ownerId) {
      return;
    }
    this.carService.addCar({brand, model, year, regNumber, ownerId} as CarRequestDto)
      .subscribe(car => {
        this.cars.push(car)
      });
  }

  sort(): void {
    this.cars.sort((a, b) => (
      a.id < b.id ? -1 : 1
    ));
  }

  goBack(): void {
    this.location.back();
  }
}
