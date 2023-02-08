import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CarRequestDto} from "../model/request/CarRequestDto";
import {catchError, Observable, of} from "rxjs";
import {CarResponseDto} from "../model/response/CarResponseDto";
import {ArticleResponseDto} from "../model/response/ArticleResponseDto";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carUrl = 'http://localhost:8080/car';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient
  ) { }

  getCar(id: bigint): Observable<CarResponseDto> {
    const url = `${this.carUrl}/${id}`;

    return this.http.get<CarResponseDto>(url)
      .pipe(
        catchError(this.handleError<CarResponseDto>())
      )
  }

  getCars(): Observable<CarResponseDto[]> {
    return this.http.get<CarResponseDto[]>(this.carUrl)
      .pipe(
        catchError(this.handleError<CarResponseDto[]>([]))
      )
  }

  addCar(car: CarRequestDto): Observable<CarResponseDto> {
    return this.http.post<CarResponseDto>(this.carUrl, car, this.httpOptions)
      .pipe(
        catchError(this.handleError<CarResponseDto>())
      );
  }

  updateCar(car: CarResponseDto): Observable<CarResponseDto> {
    const url = `${this.carUrl}/${car.id}`;

    return this.http.put<CarResponseDto>(url, car, this.httpOptions)
      .pipe(
        catchError(this.handleError<CarResponseDto>())
      )
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
