import {OrderStatus} from "../OrderStatus";

export class OrderResponseDto {
  id: bigint;
  carId: number;
  problemDescription: string;
  acceptanceDate: Date;
  serviceIds: number[];
  articleIds: number[];
  status: OrderStatus;
  completeDate: Date;

  constructor(id: bigint, carId: number, problemDescription: string,
              acceptanceDate: Date, serviceIds: number[],
              articleIds: number[], status: OrderStatus, completeDate: Date) {
    this.id = id;
    this.carId = carId;
    this.problemDescription = problemDescription;
    this.acceptanceDate = acceptanceDate;
    this.serviceIds = serviceIds;
    this.articleIds = articleIds;
    this.status = status;
    this.completeDate = completeDate;
  }
}
