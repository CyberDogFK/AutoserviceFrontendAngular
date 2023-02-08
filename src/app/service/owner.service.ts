import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {OwnerResponseDto} from "../model/response/OwnerResponseDto";
import {OwnerRequestDto} from "../model/request/OwnerRequestDto";
import {OrderResponseDto} from "../model/response/OrderResponseDto";
import {CarResponseDto} from "../model/response/CarResponseDto";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private ownerUrl = 'http://localhost:8080/owner';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient
  ) { }

  getOwner(id: bigint): Observable<OwnerResponseDto> {
    const url = `${this.ownerUrl}/${id}`;

    return this.http.get<OwnerResponseDto>(url)
      .pipe(
        catchError(this.handleError<OwnerResponseDto>())
      )
  }

  getOwners(): Observable<OwnerResponseDto[]> {
    return this.http.get<OwnerResponseDto[]>(this.ownerUrl)
      .pipe(
        catchError(this.handleError<OwnerResponseDto[]>())
      )
  }

  getOwnerOrders(id: bigint): Observable<OrderResponseDto[]> {
    const url = `${this.ownerUrl}/${id}/orders`;

    return this.http.get<OrderResponseDto[]>(url)
      .pipe(
        catchError(this.handleError<OrderResponseDto[]>())
      )
  }

  getOwnerCars(id: bigint): Observable<CarResponseDto[]> {
    const url = `${this.ownerUrl}/${id}/cars`;

    return this.http.get<CarResponseDto[]>(url)
      .pipe(
        catchError(this.handleError<CarResponseDto[]>())
      )
  }

  addOwner(owner: OwnerRequestDto): Observable<OwnerResponseDto> {
    return this.http.post<OwnerResponseDto>(this.ownerUrl, owner, this.httpOptions)
      .pipe(
        catchError(this.handleError<OwnerResponseDto>())
      )
  }

  updateOwner(owner: OwnerResponseDto): Observable<OwnerResponseDto> {
    const url = `${this.ownerUrl}/${owner.id}`;

    return this.http.put<OwnerResponseDto>(url, owner, this.httpOptions)
      .pipe(
        catchError(this.handleError<OwnerResponseDto>())
      )
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
