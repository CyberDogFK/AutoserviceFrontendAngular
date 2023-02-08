export class CarResponseDto {
  id: bigint;
  brand: string;
  model: string;
  year: number;
  regNumber: string;
  ownerId: bigint;

  constructor(id: bigint, brand: string, model: string, year: number, regNumber: string, ownerId: bigint) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.regNumber = regNumber;
    this.ownerId = ownerId;
  }
}
