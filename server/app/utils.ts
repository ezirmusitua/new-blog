import crypto from 'crypto';

export class Utils {
  public static generateHash(sentence: string): string {
    const secretKey = 'guess me';
    return crypto.createHmac('sha256', sentence).update(secretKey).digest('hex');
  }
  public static generateRandomBytes(length: number = 24): string {
    return crypto.randomBytes(length).toString('hex');
  }
}