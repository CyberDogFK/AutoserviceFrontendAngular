import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ArticleResponseDto} from "../model/response/ArticleResponseDto";
import {Observable} from "rxjs";
import {ArticleService} from "../service/article.service";
import {ArticleRequestDto} from "../model/request/ArticleRequestDto";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles: ArticleResponseDto[] = [];

  constructor(
    private articleService: ArticleService,
    public location: Location
  ) {}


  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getArticles()
      .subscribe(articles => this.articles = articles)
      .add(() => this.sort())
  }

  add(name: string, price: number): void {
    name = name.trim();
    if (!name || !price) {
      return;
    }
    this.articleService.addArticle({name, price} as ArticleRequestDto)
      .subscribe(hero => {
        this.articles.push(hero);
      });
  }

  goBack(): void {
    this.location.back();
  }

  sort(): void {
    this.articles.sort((a, b) =>
      (a.id < b.id ? -1 : 1)
    );
  }
}
