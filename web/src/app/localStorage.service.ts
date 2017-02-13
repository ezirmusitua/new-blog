import { Injectable } from '@angular/core';

import { Session } from './models/session';
import { LocalStorageKeyEnum } from './shared/constant';

export class LocalStorage {
  constructor() { };

  public setSession(session: Session): void {
    localStorage.setItem(LocalStorageKeyEnum.SESSION, session.toStorageString());
  }

  public getSession(): string {
    return localStorage.getItem(LocalStorageKeyEnum.SESSION);
  }

  public removeSession(): void {
    localStorage.removeItem(LocalStorageKeyEnum.SESSION);
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public get(key: string): string {
    return localStorage.getItem(key)
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

}
