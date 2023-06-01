import { Injectable } from '@angular/core';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api'
import {Product} from "./interfaces/Product";
import {User} from "./interfaces/User";
import { CATEGORY } from './static-data'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  private verificationCode?: number;

  constructor() { }
  createDb(){
    const products: Product[] = [
      {
        id: 1,
        name: 'Виски',
        category: CATEGORY[1],
        price: 10,
        img: 'https://pngimg.com/uploads/whisky/small/whisky_PNG132.png',
        size: '100 cl / 1L',
      },
      {
        id: 2,
        name: 'Коньяк',
        category: CATEGORY[1],
        price: 5,
        img: 'https://pngimg.com/uploads/whisky/small/whisky_PNG122.png',
        size: '50 cl / 500ml',
      },
      {
        id: 3,
        name: 'Крылышки',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 4,
        name: 'Пицца',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 5,
        name: 'Суши',
        category: CATEGORY[0],
        price: 20,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 6,
        name: 'Аливария',
        category: CATEGORY[1],
        price: 10,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 7,
        name: 'Жигуль',
        category: CATEGORY[1],
        price: 5,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 8,
        name: 'Крылышки',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 9,
        name: 'Пицца',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 10,
        name: 'Суши',
        category: CATEGORY[0],
        price: 20,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
    ]
    // ... your existing code for products

    const users: User[] = [
      { nickname: 'Smith', phoneNumber: '+375447692433' },
      { nickname: 'Jones', phoneNumber: '+375441234567' },
      { nickname: 'Brown', phoneNumber: '+375442345678' }
    ];

    return { products, users};
  }

  // Override the post method to handle custom requests
  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'sendCode') {
      return this.sendCode(reqInfo);
    }
    if (reqInfo.collectionName === 'verifyCode') {
      return this.verifyCode(reqInfo);
    }
    return undefined; // Let the default POST handle all other collections
  }

  // Method to send a verification code to the phone number
  private sendCode(reqInfo: RequestInfo) {
    // Get the phone number from the request body
    const phoneNumber = reqInfo.utils.getJsonBody(reqInfo.req).phoneNumber;

    const user = this.createDb().users.find(u => u.phoneNumber === phoneNumber);
    // Generate a random code
    if(user) {
      const code = Math.floor(Math.random() * 10000);
      // Save the code in the verificationCode property
      this.verificationCode = code;
      // Return a response with the code and a message
      return reqInfo.utils.createResponse$(() => {
        const options: any = {
          status: 200,
          body: {code, message: 'Verification code sent'},
          headers: reqInfo.headers,
          url: reqInfo.url,
        };
        return options;
      });
    } else {
      // Return a response with an error message
      return reqInfo.utils.createResponse$(() => {
        const options: any = {
          status: 400,
          body: { message: 'User not exist' },
          headers: reqInfo.headers,
          url: reqInfo.url,
        };
        return options;
      });
    }
  }

  // Method to verify the code and get a JWT token
  private verifyCode(reqInfo: RequestInfo) {
    // Get the phone number and the code from the request body
    const code = Number(reqInfo.utils.getJsonBody(reqInfo.req).code);
    const phoneNumber = reqInfo.utils.getJsonBody(reqInfo.req).phoneNumber;
    // Check if the code matches the verificationCode property
    if (code === this.verificationCode) {
      // Find the user with the matching phone number in the users array
      const user = this.createDb().users.find(u => u.phoneNumber === phoneNumber);
      // Check if the user exists


      // Create a JWT token with the phone number and expiration time
      const token = 'token'
      // Return a response with the token, user and a message
      return reqInfo.utils.createResponse$(() => {
        const options: any = {
          status: 200,
          body: { token, user, message: 'Verification successful' },
          headers: reqInfo.headers,
          url: reqInfo.url,
        };
        return options;
      });

    } else {
      // Return a response with an error message
      return reqInfo.utils.createResponse$(() => {
        const options: any = {
          status: 400,
          body: { message: 'Verification failed' },
          headers: reqInfo.headers,
          url: reqInfo.url,
        };
        return options;
      });
    }
  }

}
