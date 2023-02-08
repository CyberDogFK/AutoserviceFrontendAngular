import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ArticleResponseDto} from "../model/response/ArticleResponseDto";
import {ActivatedRoute, Route} from "@angular/router";
import {ArticleService} from "../service/article.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  @Input() article?: ArticleResponseDto;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = BigInt(Number(this.route.snapshot.paramMap.get('id')));
    this.articleService.getArticle(id)
      .subscribe(article => this.article = article);
  }

  update(): void {
    if (this.article) {
      this.articleService.updateArticle(this.article, this.article.id)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
