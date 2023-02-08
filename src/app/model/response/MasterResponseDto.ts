export class MasterResponseDto {
  id: bigint;
  name: string;
  solvedOrderIds: Array<bigint>;

  constructor(id: bigint, name: string, solvedOrderIds: Array<bigint>) {
    this.id = id;
    this.name = name;
    this.solvedOrderIds = solvedOrderIds;
  }
}
