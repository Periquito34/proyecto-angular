import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';


@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})

export class  VerificarCorreoComponent implements OnInit{

  emailVerify: FormGroup;
  loading: boolean= false;
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router, private firebaseError: FirebaseErrorService) {
    this.emailVerify= this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    
  }

  ngOnInit(): void {
  }

    verify(){
    const email= this.emailVerify.value.email
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