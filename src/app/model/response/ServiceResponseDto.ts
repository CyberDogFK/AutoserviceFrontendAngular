import {ServiceStatus} from "../ServiceStatus";

export class ServiceResponseDto {
  id: bigint;
  name: string;
  masterId: bigint;
  price: number;
  status: ServiceStatus;

  constructor(id: bigint, name: string, masterId: bigint, price: number, status: ServiceStatus) {
    this.id = id;
    this.name = name;
    this.masterId = masterId;
    this.price = price;
    this.status = status;
  }
}
