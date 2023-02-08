import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {MasterResponseDto} from "../model/response/MasterResponseDto";
import {CarResponseDto} from "../model/response/CarResponseDto";
import {MasterRequestDto} from "../model/request/MasterRequestDto";
import {OrderResponseDto} from "../model/response/OrderResponseDto";

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private masterUrl = 'http://localhost:8080/master';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient
  ) { }

  getMaster(id: bigint): Observable<MasterResponseDto> {
    const url = `${this.masterUrl}/${id}`;

    return this.http.get<MasterResponseDto>(url)
      .pipe(
        catchError(this.handleError<MasterResponseDto>())
      )
  }

  getMasters(): Observable<MasterResponseDto[]> {
    return this.http.get<MasterResponseDto[]>(this.masterUrl)
      .pipe(
        catchError(this.handleError<MasterResponseDto[]>())
      )
  }

  addMaster(master: MasterRequestDto): Observable<MasterResponseDto> {
    return this.http.post<MasterResponseDto>(this.masterUrl, master, this.httpOptions)
      .pipe(
        catchError(this.handleError<MasterResponseDto>())
      )
  }

  updateMaster(master: MasterResponseDto): Observable<MasterResponseDto> {
    const url = `${this.masterUrl}/${master.id}`;

    return this.http.put<MasterResponseDto>(url, master, this.httpOptions)
      .pipe(
        catchError(this.handleError<MasterResponseDto>())
      )
  }

  getOrdersForMaster(id: bigint): Observable<OrderResponseDto[]> {
    const url = `${this.masterUrl}/${id}/orders`;

    return this.http.get<OrderResponseDto[]>(url)
      .pipe(
        catchError(this.handleError<OrderResponseDto[]>())
      );
  }

  getSalaryForMaster(id: bigint): Observable<number> {
    const url = `${this.masterUrl}/${id}/salary`;

    return this.http.get<number>(url)
      .pipe(
        catchError(this.handleError<number>())
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
