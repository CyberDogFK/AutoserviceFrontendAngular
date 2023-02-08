import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {MasterResponseDto} from "../model/response/MasterResponseDto";
import {MasterService} from "../service/master.service";
import {MasterRequestDto} from "../model/request/MasterRequestDto";

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  masters: MasterResponseDto[] = [];
  constructor (
    private location: Location,
    private masterService: MasterService
  ) {}

  ngOnInit() {
    this.getMasters();
  }

  getMasters(): void {
    this.masterService.getMasters()
      .subscribe(masters => this.masters = masters)
      .add(() => this.sort())
  }

  add(name: string, solvedOrderIds: number[]) {
    if (!name) {
      return;
    }
    this.masterService.addMaster({name, solvedOrderIds} as MasterRequestDto)
      .subscribe(master => {
        this.masters.push(master);
      })
  }

  sort(): void {
    this.masters.sort((a, b) =>
      (a.id < b.id ? -1 : 1)
    );
  }

  goBack(): void {
    this.location.back();
  }
}
