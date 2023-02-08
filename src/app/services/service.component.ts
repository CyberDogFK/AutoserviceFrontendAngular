import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../service/service.service";
import {ServiceResponseDto} from "../model/response/ServiceResponseDto";
import {ServiceStatus} from "../model/ServiceStatus";
import {ServiceRequestDto} from "../model/request/ServiceRequestDto";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  services: ServiceResponseDto[] = [];

  constructor(
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.serviceService.getServices()
      .subscribe(service => this.services = service)
      .add(() => this.sort())
  }

  add(name: string, masterId: number, price: number, statuse: string): void {
    let status : ServiceStatus = statuse as ServiceStatus;
    this.serviceService.addService({name, masterId, price, status} as ServiceRequestDto)
      .subscribe(service => this.services.push(service));
  }

  setPaidStatus(id: bigint) {
    this.updateStatus(id, ServiceStatus.PAID);
  }

  setNonPaidStatus(id: bigint) {
    this.updateStatus(id, ServiceStatus.NON_PAID);
  }

  updateStatus(id: bigint, status: ServiceStatus) {
    this.serviceService.updateServiceStatus(id, status)
      .subscribe(() => this.ngOnInit());
  }

  sort(): void {
    this.services.sort((a, b) => (
      a.id < b.id ? -1 : 1)
    );
  }
}
