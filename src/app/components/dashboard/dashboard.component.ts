import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loading: boolean=false
  dataUser: any

  constructor( private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router, private firebaseError: FirebaseErrorService){
  
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user=>{
      console.log(user)
      if(user){
        this.dataUser= user; 
      }else{
        this.router.navigate(['/login'])
      }
    })
  }

  logOut(){
    this.afAuth.signOut().then(()=> {
      this.toastr.success('See you soon', 'Successful LogOut');
      this.router.navigate(['/login'])}
      )
  }

  crud(){
      this.router.navigate(['/list'])
    }

}
