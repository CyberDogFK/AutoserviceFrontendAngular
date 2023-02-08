import {ServiceStatus} from "../ServiceStatus";

export class ServiceRequestDto {
  name: string;
  masterId: number;
  price: number;
  status: ServiceStatus;

  constructor(name: string, masterId: number, price: number, status: ServiceStatus) {
    this.name = name;
    this.masterId = masterId;
    this.price = price;
    this.status = status;
  }
}
