import {  Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpRequestService } from '../service/http-request.service';
import { environment } from '../../environments/environment';
import { EpisodeModel } from '../models/EpisodeModel';
import { DataElement } from './DataElement';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


const ELEMENT_DATA: DataElement[] = [
];


@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
})

export class MainPage implements OnInit {
  episodes: EpisodeModel;

constructor(private route: ActivatedRoute,
  public platform: Platform, private navCtrl: NavController,
   private httpRequestService: HttpRequestService,
   public loadingController: LoadingController) {
    this.httpRequestService.getStoredToken();
}


  displayedColumns = ['ExternalKey', 'EpisodeOwner',
  'CliniciansNames', 'ClientsNames', 'EpisodeStatus',
  'StartDate', 'LastSessionDate',
  'Type', 'Alert', 'Description'];

  dataSource = ELEMENT_DATA;

  ngOnInit() {

  }

  async getEpisodes() {

    const loading = await this.loadingController.create({
      message: 'Getting cases ...'
    });
    await loading.present();
    await this.httpRequestService.getApiData( environment.GET_EPISODE).subscribe(
      result => {
        console.log(result);
        loading.dismiss();
        this.dataSource = result;
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }


  getCurrentEpisode(case_num) {
    for (const key in this.dataSource) {
      if (this.dataSource.hasOwnProperty(key)) {
        if (this.dataSource[key].ExternalKey === case_num) {
          const object = this.dataSource[key];
          this.goToCaseDetailById(object.ExternalKey);
          console.log(object.Id);
        }
      }
  }
  }

goToCaseDetailById(case_ExternalKey) {
  console.log('goToCaseDetail ' + case_ExternalKey );
  this.navCtrl.navigateForward('/case-details/' + case_ExternalKey);
}



ionViewWillEnter() {
  console.log(' ionViewWillEnter');
  this.getEpisodes();
}

ionViewDidEnter() {
  console.log(' ionViewDidEnter');

}

}

