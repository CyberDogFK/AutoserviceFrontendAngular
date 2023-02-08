export class MasterRequestDto {
  name: string;
  solvedOrderIds: Array<number>;

  constructor(name: string, solvedOrderIds: Array<number>) {
    this.name = name;
    this.solvedOrderIds = solvedOrderIds;
  }
}
