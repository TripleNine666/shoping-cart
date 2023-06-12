import {Injectable} from '@angular/core';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api'
import {Product} from "./interfaces/Product";
import {User} from "./interfaces/User";
import {CATEGORY, OrderStatus} from './static-data'


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  private verificationCode?: number;

  constructor() { }
  // A public static variable to store the last order id
  public static lastOrderId = 2;
  createDb(){
    const products: Product[] = [
      {
        id: 1,
        name: 'Jack Daniels',
        category: CATEGORY[1],
        price: 15,
        img: 'https://pngimg.com/uploads/whisky/small/whisky_PNG132.png',
        size: '100 cl / 1L',
        description: "This is the most titled whiskey from the entire line. The drink has been awarded prestigious prizes at international competitions and exhibitions many times. It is believed that this is one of the most elegant corn whiskey from the entire line of the brand.\n" +
          "\n" +
          "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."
      },
      {
        id: 2,
        name: 'Modelo Negra',
        category: CATEGORY[1],
        price: 12,
        img: '../../assets/img/ModeloNegra.png',
        size: '35.5 cl / 355ml',
        description: "Translated from Spanish, Negra means \"dark\", and Modelo is part of the manufacturer's name — Grupo Modelo. Negra Modelo has a rich light creamy taste due to the higher content of malt and hops than in other varieties, as well as special yeast and caramel-chocolate flavor, which is why it was deservedly dubbed La crema de la cerveza, which means \"Beer of all beers\". The only producer and global exporter of Negra Modelo beer is the Mexican company Grupo Modelo.\n"

      },
      {
        id: 3,
        name: 'Bai Dragon Fruit',
        category: CATEGORY[1],
        price: 4,
        img: '../../assets/img/Cocount.png',
        size: '50 cl / 500ml',
        description: "Pack your amazingly refreshing fruit flavors, we’ll leave tonight. We’re talking dragon fruit and passion fruit flavors here. On the scale of one-to-cloud nine, this one’s an 11. A little tart, a little sweet, and a whole lot of delicious in every sip. This tropical tour-de-force is bursting with flavor, but without any of those annoying artificial sweeteners that probably wouldn’t fit in your suitcase anyway. You couldn’t get any closer to drinking an island vacation if you tried. Which is good, because it turns out putting one of those little umbrellas in every bottle is really hard. Trust us, we tried."
      },
      {
        id: 4,
        name: 'Fanta',
        category: CATEGORY[1],
        price: 2,
        img: 'https://pngimg.com/uploads/fanta/small/fanta_PNG63.png',
        size: '100 cl / 1L',
        description: "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."

      },
      {
        id: 5,
        name: 'Susi',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/sushi/small/sushi_PNG98834.png',
        size: '100 cl / 1L',
        description: "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."

      },
      {
        id: 6,
        name: 'Sprite',
        category: CATEGORY[1],
        price: 3,
        img: 'https://pngimg.com/uploads/sprite/small/sprite_PNG98780.png',
        size: '100 cl / 1L',
        description: "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."

      },
      {
        id: 7,
        name: 'Pepsi',
        category: CATEGORY[1],
        price: 5,
        img: 'https://pngimg.com/uploads/pepsi/small/pepsi_PNG8950.png',
        size: '33 cl / 330ml',
        description: "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."

      },
      {
        id: 8,
        name: 'KFC',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '33 cl / 330ml',
        description: "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."

      },
      {
        id: 9,
        name: 'Pizza',
        category: CATEGORY[0],
        price: 15,
        img: 'http://pngimg.com/uploads/pizza/small/pizza_PNG44082.png',
        size: '100 cl / 1L',
        description: "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."

      },
    ]

    const users: User[] = [
      {
        id: 1,
        nickname: 'Smith',
        phoneNumber: '+375447692433',
        orderHistory: [
          {
            id: 1,
            status: OrderStatus.Completed,
            shipping: 2.99,
            totalPrice: 62.99,
            cartItems: [
              {
                count: 1,
                product: {
                  id: 1,
                  name: 'Jack Daniels',
                  category: CATEGORY[1],
                  price: 15,
                  img: 'https://pngimg.com/uploads/whisky/small/whisky_PNG132.png',
                  size: '100 cl / 1L',
                  description: "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."

                }
              },
              {
                count: 3,
                product: {
                  id: 5,
                  name: 'Susi',
                  category: CATEGORY[0],
                  price: 15,
                  img: 'https://pngimg.com/uploads/sushi/small/sushi_PNG98834.png',
                  size: '100 cl / 1L',
                  description: "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."

                }
              },
            ]
          },
          {
            id: 2,
            status: OrderStatus.Cancelled,
            shipping: 2.99,
            totalPrice: 32.99,
            cartItems: [
              {
                count: 3,
                product: {
                  id: 2,
                  name: 'Modelo Negra',
                  category: CATEGORY[1],
                  price: 12,
                  img: '../../assets/img/ModeloNegra.png',
                  size: '35.5 cl / 355ml',
                  description: "The drink has a bright aroma of burnt caramel, tobacco and dried fruits. The taste has hints of vanilla toffee and wood. Whiskey leaves a \"long-lasting\" aftertaste, characteristic only of corn-based spirits. Even a small sip of the drink gives a pleasant warmth."

                }
              }
            ]
          },
        ]
      },
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
    const code = Math.floor(Math.random() * 10000);
    // Save the code in the verificationCode property
    this.verificationCode = code;
    // Return a response with the code and a message
    return reqInfo.utils.createResponse$(() => {
      const options: any = {
        status: 200,
        body: {code, message: 'Verification code sent', userExists: !!user},
        headers: reqInfo.headers,
        url: reqInfo.url,
      };
      return options;
    });
  }

  // Method to verify the code and get a JWT token
  private verifyCode(reqInfo: RequestInfo) {
    // Get the phone number and the code from the request body
    const code = Number(reqInfo.utils.getJsonBody(reqInfo.req).code);
    const phoneNumber = reqInfo.utils.getJsonBody(reqInfo.req).phoneNumber;
    // Check if the code matches the verificationCode property
    if (code === this.verificationCode) {
      // Find the user with the matching phone number in the users array
      let user = this.createDb().users.find(u => u.phoneNumber === phoneNumber);
      // Check if the user exists
      if (!user) {
        user = {
          id: this.genId(this.createDb().users),
          nickname: 'user',
          phoneNumber,
          orderHistory: []
        };
        this.createDb().users.push(user);
        console.log(this.createDb().users)
      }

      const token = Math.random().toString(36).substring(2);
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


  genId(users: User[]): number{
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1: 1;
  }
}
