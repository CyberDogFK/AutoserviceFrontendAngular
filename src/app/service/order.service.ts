import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ServiceResponseDto} from "../model/response/ServiceResponseDto";
import {catchError, Observable, of} from "rxjs";
import {OrderResponseDto} from "../model/response/OrderResponseDto";
import {OrderRequestDto} from "../model/request/OrderRequestDto";
import {OrderStatus} from "../model/OrderStatus";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:8080/order';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getOrders(): Observable<OrderResponseDto[]> {
    return this.http.get<OrderResponseDto[]>(this.ordersUrl)
      .pipe(
        catchError(this.handleError<OrderResponseDto[]>())
      );
  }

  getOrder(id: bigint): Observable<OrderResponseDto> {
    const url = `${this.ordersUrl}/${id}`;

    return this.http.get<OrderResponseDto>(url)
      .pipe(
        catchError(this.handleError<OrderResponseDto>())
      );
  }

  addOrder(order: OrderRequestDto): Observable<OrderResponseDto> {
    return this.http.post<OrderResponseDto>(this.ordersUrl, order, this.httpOptions)
      .pipe(
        catchError(this.handleError<OrderResponseDto>())
      )
  }

  updateOrder(order: OrderResponseDto): Observable<OrderResponseDto> {
    const url = `${this.ordersUrl}/${order.id}`;

    return this.http.put<OrderResponseDto>(url, order, this.httpOptions)
      .pipe(
        catchError(this.handleError<OrderResponseDto>())
      );
  }

  updateOrderStatus(id: bigint, status: OrderStatus): Observable<OrderResponseDto> {
    const url = `${this.ordersUrl}/${id}/status`;
    let queryParam = new HttpParams().append("orderStatus", status.trim());
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: queryParam
    }
    return this.http.put<OrderResponseDto>(url, {}, httpOptions)
      .pipe(
        catchError(this.handleError<OrderResponseDto>())
      );
  }

  getOrderPrice(id: bigint): Observable<number> {
    const url = `${this.ordersUrl}/${id}/price`;

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
