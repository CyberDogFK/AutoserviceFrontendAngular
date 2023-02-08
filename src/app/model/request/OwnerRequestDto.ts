export class OwnerRequestDto {
  carIds: number[];
  orderIds: number[];

  constructor(carIds: number[], orderIds: number[]) {
    this.carIds = carIds;
    this.orderIds = orderIds;
  }
}
