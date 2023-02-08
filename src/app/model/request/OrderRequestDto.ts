import {OrderStatus} from "../OrderStatus";

export class OrderRequestDto {
  carId: number;
  problemDescription: string;
  acceptanceDate: string;
  serviceIds: number[];
  articleIds: number[];
  status: OrderStatus;
  completeDate: string;

  constructor(carId: number, problemDescription: string,
              acceptanceDate: string, serviceIds: number[],
              articleIds: number[], status: OrderStatus, completeDate: string) {
    this.carId = carId;
    this.problemDescription = problemDescription;
    this.acceptanceDate = acceptanceDate;
    this.serviceIds = serviceIds;
    this.articleIds = articleIds;
    this.status = status;
    this.completeDate = completeDate;
  }
}
