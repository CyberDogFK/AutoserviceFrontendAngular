import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ServiceResponseDto} from "../model/response/ServiceResponseDto";
import {catchError, Observable, of} from "rxjs";
import {ServiceRequestDto} from "../model/request/ServiceRequestDto";
import {ServiceStatus} from "../model/ServiceStatus";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private servicesUrl = 'http://localhost:8080/service';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getServices(): Observable<ServiceResponseDto[]> {
    return this.http.get<ServiceResponseDto[]>(this.servicesUrl)
      .pipe(
        catchError(this.handleError<ServiceResponseDto[]>())
      );
  }

  getService(id: bigint): Observable<ServiceResponseDto> {
    const url = `${this.servicesUrl}/${id}`;

    return this.http.get<ServiceResponseDto>(url)
      .pipe(
        catchError(this.handleError<ServiceResponseDto>())
      );
  }

  addService(service: ServiceRequestDto): Observable<ServiceResponseDto> {
    return this.http.post<ServiceResponseDto>(this.servicesUrl, service, this.httpOptions)
      .pipe(
        catchError(this.handleError<ServiceResponseDto>())
      );
  }

  updateService(service: ServiceResponseDto): Observable<ServiceResponseDto> {
    const url = `${this.servicesUrl}/${service.id}`;

    return this.http.put<ServiceResponseDto>(url, service, this.httpOptions)
      .pipe(
        catchError(this.handleError<ServiceResponseDto>())
      );
  }

  updateServiceStatus(id: bigint, status: ServiceStatus): Observable<ServiceResponseDto> {
    const url = `${this.servicesUrl}/${id}/status`;
    let queryParam = new HttpParams().append("status", status.trim());
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: queryParam
    }

    return this.http.put<ServiceResponseDto>(url, {}, httpOptions)
      .pipe(
      catchError(this.handleError<ServiceResponseDto>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
