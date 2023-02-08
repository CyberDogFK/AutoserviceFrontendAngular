import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {OwnerService} from "../service/owner.service";
import {OwnerResponseDto} from "../model/response/OwnerResponseDto";
import {OwnerRequestDto} from "../model/request/OwnerRequestDto";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  owners: OwnerResponseDto[] = [];
  constructor(
    private location: Location,
    private ownerService: OwnerService
  ) {}

  ngOnInit(): void {
    this.getOwners();
  }

  getOwners(): void {
    this.ownerService.getOwners()
      .subscribe(owners => this.owners = owners)
      .add(() => this.sort())
  }

  add(carIds: number[], orderIds: number[]): void {
    this.ownerService.addOwner({carIds, orderIds} as OwnerRequestDto)
      .subscribe(owner => this.owners.push(owner));
  }

  sort(): void {
    this.owners.sort((a, b) => (
      a.id < b.id ? -1 : 1)
    );
  }

  goBack(): void {
    this.location.back();
  }
}
