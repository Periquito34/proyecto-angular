import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit{

  recoverPassword: FormGroup;
  loading: boolean= false;
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router, private firebaseError: FirebaseErrorService) {
    this.recoverPassword= this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    
  }

  ngOnInit(): void {
  }

  recover(){
    const email= this.recoverPassword.value.email
    this.loading= true;
    this.afAuth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/login'])
      this.toastr.info('An email to change the password has been sent to the email entered', 'Email sent');
      
    }).catch((error)=>{
      this.loading= false;
      this.toastr.error(this.firebaseError.CodeError(error.code), 'Error')
    })

  }
}
