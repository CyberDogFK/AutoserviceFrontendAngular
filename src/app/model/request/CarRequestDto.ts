export class CarRequestDto {
  brand: string;
  model: string;
  year: number;
  regNumber: string;
  ownerId: number;

  constructor(brand: string, model: string, year: number, regNumber: string, ownerId: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.regNumber = regNumber;
    this.ownerId = ownerId;
  }
}
