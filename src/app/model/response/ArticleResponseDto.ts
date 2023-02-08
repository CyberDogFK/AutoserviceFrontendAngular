export class ArticleResponseDto {
  id: bigint;
  name: string;
  price: number;

  constructor(id: bigint, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
