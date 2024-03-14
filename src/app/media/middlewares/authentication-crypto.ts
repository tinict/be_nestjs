import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as _ from 'lodash';

@Injectable()
export default class AuthenticationCrypto {
  /**
   * encrypt values
   * @param data any
   * @param k key of object
   */
  public static encryptValues(data: any, k?: string) {
    if (data instanceof Error) {
      return;
    }
    if (_.isNil(data)) {
      // Check if data null or undefined
      return data;
    }
    if (typeof data === 'string' || typeof data === 'number') {
      // Check data has equal type string or data euqal type number
      return this.encrypt(data);
    }

    if (typeof data === 'object' && !Array.isArray(data)) {
      // Check data has equal type object and not type Array
      const keys = Object.keys(data);
      keys.forEach((key) => {
        const sdata = data[key];
        if (typeof sdata === 'string' || typeof sdata === 'number') {
          // Check sdata has equal type string or sdata has equal type number
          data[key] = this.encrypt(sdata);
          // }
        } else {
          // data[key] has encrypt values
          data[key] = this.encryptValues(sdata, key);
        }
      });
      return data;
    }
    if (Array.isArray(data)) {
      // Check data has type Array
      data = data.map((obj) => {
        return this.encryptValues(obj, k);
      });
      return data;
    }
  }

  /**
   * decrypt values
   * @param data any
   * @param k key of object
   */
  public static decryptValues(data: any, k?: string) {
    if (data instanceof Error) {
      return;
    }
    if (_.isNil(data)) {
      // Check if data null or undefined
      return data;
    }
    if (typeof data === 'string' || typeof data === 'number') {
      // Check data has equal type string or data euqal type number
      return this.decrypt(data);
      // }
    }

    if (typeof data === 'object' && !Array.isArray(data)) {
      // Check data has equal type object and not type Array
      const keys = Object.keys(data);
      keys.forEach((key) => {
        const sdata = data[key];
        if (typeof sdata === 'string' || typeof sdata === 'number') {
          data[key] = this.decrypt(sdata);
          // }
        } else {
          // data[key] has decrypt values
          data[key] = this.decryptValues(sdata, key);
        }
      });
      return data;
    }
    if (Array.isArray(data)) {
      // Check data has type Array
      data = data.map((obj) => {
        return this.decryptValues(obj, k);
      });
      return data;
    }
  }

  /**
   * encrypt use
   * @param val
   */
  public static encrypt(val) {
    const ENC_KEY = 'bf3c199c2470cb477d907b1e0917c17b';
    const IV = '5183666c72eec9e4';
    const LOGGER_IV_MODE = 'aes-256-cbc';
    // Creates and returns a Cipher object, with the given algorithm, key and initialization vector (iv).
    const cipher: crypto.Cipher = crypto.createCipheriv(
      LOGGER_IV_MODE,
      ENC_KEY,
      IV,
    );
    // The cipher.update() method can be called multiple times with new data until cipher.final() is called
    let encrypted: string = cipher.update(val.toString(), 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  /**
   * decrypt use
   * @param encrypted
   */
  public static decrypt(encrypted) {
    const ENC_KEY = 'bf3c199c2470cb477d907b1e0917c17b';
    const IV = '5183666c72eec9e4';
    const LOGGER_IV_MODE = 'aes-256-cbc';
    // Creates and returns a Decipher object that uses the given algorithm and password (ENC_KEY).
    const decipher = crypto.createDecipheriv(LOGGER_IV_MODE, ENC_KEY, IV);
    // The cipher.update() method can be called multiple times with new data until cipher.final() is called
    const decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
  }
}
