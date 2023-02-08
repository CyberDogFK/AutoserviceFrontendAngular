export class OwnerResponseDto {
  id: bigint;
  carsIds: number[];
  ordersIds: number[];

  constructor(id: bigint, carIds: number[], orderIds: number[]) {
    this.id = id;
    this.carsIds = carIds;
    this.ordersIds = orderIds;
  }
}
