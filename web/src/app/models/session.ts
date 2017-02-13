export class Session {
  private userId: string;
  private token: string;
  private clientCategory: string;
  private updateAt: number;

  constructor(body: any) {
    this.userId = body.userId;
    this.token = body.token;
    this.clientCategory = body.clientCategory;
    this.updateAt = body.updateAt;
  }

  public constructAuthBody(): Object {
    return { userId: this.userId, token: this.token };
  }
  public toStorageString(): string {
    return this.token + ';' + this.userId;
  }

  public toAuthString(): string {
    return 'token="' + this.token + '"&user="' + this.userId + '"';
  }

  public static constructFromLcStr(authStr: string): Session {
    const [token, userId] = authStr.match(/(\w+);(\w+)/).slice(1, 3);
    return new Session({ userId, token });
  }

  public static constructFromHeader(authStr: string): Session {
    const [token, userId] = authStr.match(/token="(\w+)"&user="(\w+)"/).slice(1, 3);
    return new Session({ userId, token });
  }
}
