import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  CodeError(code: string){

    switch(code){
      case 'auth/email-already-in-use':
        return 'User already exists';

      case 'auth/weak-password':
        return 'Password Weak'

      case 'auth/invalid-email':
        return 'Invalid Email'
      
      case 'auth/user-not-found':
        return 'User doesnt exits'

      case 'auth/wrong-password':
        return 'Wrong Password'

      default:
      return 'Unknown error, please contact support'
    }

  }
}
