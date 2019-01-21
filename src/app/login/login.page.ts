import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../service/http-request.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  // User object for testing purposes
  User = {
    username: 'shaydebarra@gmail.com',
    password: 'Cuan8852'
  };

  constructor(
    private httpRequestService: HttpRequestService,
    public navCtrl: NavController,
    private storage: Storage,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.User.username = 'shaydebarra@gmail.com';
    this.User.password = 'Cuan8852';
  }

  ngOnInit(): void {}

  async login() {
    const user = this.User.username.trim();
    const pass = this.User.password.trim();

    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.httpRequestService.getAccessToken(user, pass).subscribe(
      result => {
        console.log(result);
        this.storeAccessToken(result);
        loading.dismiss();
        this.goToLoggedInPage();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  storeAccessToken(token) {
    this.storage.set('access_token', token);
  }


  public goToLoggedInPage() {
    this.navCtrl.navigateForward(['/home']);
  }

  ionViewWillEnter() {
    console.log('HomePage');
  }
}
