import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ArticleResponseDto} from "../model/response/ArticleResponseDto";
import {catchError, Observable, of} from "rxjs";
import {ArticleRequestDto} from "../model/request/ArticleRequestDto";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesUrl = 'http://localhost:8080/article'
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
  ) { }

  getArticles(): Observable<ArticleResponseDto[]> {
    return this.http.get<ArticleResponseDto[]>(this.articlesUrl)
      .pipe(
        catchError(this.handleError<ArticleResponseDto[]>([]))
      );
  }

  addArticle(article: ArticleRequestDto): Observable<ArticleResponseDto> {
    return this.http.post<ArticleResponseDto>(this.articlesUrl, article,
      this.httpOptions)
      .pipe(
        catchError(this.handleError<ArticleResponseDto>())
      );
  }

  updateArticle(article: ArticleRequestDto, id: bigint): Observable<ArticleResponseDto> {
    const url = `${this.articlesUrl}/${id}`;

    return this.http.put<ArticleResponseDto>(url, article, this.httpOptions)
      .pipe(
        catchError(this.handleError<ArticleResponseDto>())
      );
  }

  getArticle(id: bigint): Observable<ArticleResponseDto> {
    const url = `${this.articlesUrl}/${id}`;

    return this.http.get<ArticleResponseDto>(url)
      .pipe(
        catchError(this.handleError<ArticleResponseDto>())
      );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
