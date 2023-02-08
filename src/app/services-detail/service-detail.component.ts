import {Component, Input, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import {ServiceResponseDto} from "../model/response/ServiceResponseDto";
import {ServiceService} from "../service/service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  @Input() service?: ServiceResponseDto;

  constructor(
    private location: Location,
    private serviceService: ServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getService();
  }

  getService(): void {
    this.serviceService.getService(BigInt(Number(this.route.snapshot.paramMap.get('id'))))
      .subscribe(service => this.service = service);
  }

  update(): void {
    if (this.service) {
      this.serviceService.updateService(this.service)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
