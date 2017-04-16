import * as crypto from 'crypto';
import { generateCatalog } from './catalog';
import { CatalogItem } from '../models/article';

export class Utils {
  public static generateHash(sentence: string): string {
    const secretKey = 'guess me';
    return crypto.createHmac('sha256', sentence).update(secretKey).digest('hex');
  }

  public static generateRandomBytes(length: number = 24): string {
    return crypto.randomBytes(length).toString('hex');
  }

  public static generateCatalog(markdownContent: string): CatalogItem[] {
    return generateCatalog(markdownContent);
  }
}
