
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userRegister: FormGroup;
  loading: boolean= false;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router, private firebaseError: FirebaseErrorService,){
    this.userRegister= this.fb.group({
    username: ['', [Validators. required]],
    email: ['', [Validators. required, Validators.email]],
    password: ['', [Validators. required, Validators.minLength(8)]],
    confirmPassword: ['', Validators. required]

    })
  }

  ngOnInit(): void {
  }
  
  register(){
    const username= this.userRegister.value.username
    const email= this.userRegister.value.email
    const password= this.userRegister.value.password
    const confirmPassword= this.userRegister.value.confirmPassword

    if(password !== confirmPassword){
      this.toastr.error('The passwords are not the same', 'Error')
    }else{
      this.loading= true;
      this.afAuth.createUserWithEmailAndPassword(email, password).then((user)=> {
        console.log(user)
        this.updateProfile(username);
        this.verfyEmail();
      }).catch((error)=>{
        this.loading= false;
        console.log(this.firebaseError.CodeError(error.code))
        this.toastr.error(this.firebaseError.CodeError(error.code), 'Error')
      })
    }
  }

  verfyEmail(){
    this.afAuth.currentUser.then(user=> user?.sendEmailVerification())
                    .then(()=>{
                      this.router.navigate(['/login'])
                      this.toastr.success('We have sent you an email to verify your email', 'Successful registration ');
                    });
  }

  updateProfile(username: string){
    this.afAuth.currentUser.then(user=> user?.updateProfile({
      displayName: username
    })).then(()=>{
      console.log('Profile updated successfully');
    });
  }
}