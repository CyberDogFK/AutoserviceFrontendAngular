import {OrderStatus} from "../OrderStatus";

export class OrderResponseDto {
  id: bigint;
  carId: number;
  problemDescription: string;
  acceptanceDate: string;
  servicesIds: number[];
  articlesIds: number[];
  status: OrderStatus;
  completedDate: string;

  constructor(id: bigint, carId: number, problemDescription: string,
              acceptanceDate: string, servicesIds: number[],
              articlesIds: number[], status: OrderStatus, completedDate: string) {
    this.id = id;
    this.carId = carId;
    this.problemDescription = problemDescription;
    this.acceptanceDate = acceptanceDate;
    this.servicesIds = servicesIds;
    this.articlesIds = articlesIds;
    this.status = status;
    this.completedDate = completedDate;
  }
}
