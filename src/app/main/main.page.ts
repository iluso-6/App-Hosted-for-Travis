import {  Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpRequestService } from '../service/http-request.service';
import { environment } from '../../environments/environment';
import { EpisodeModel } from '../models/EpisodeModel';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CaseModel } from '../models/CaseModel';
import { ChartsComponent } from '../case-details/charts/charts.component';
import { MatSort } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';


const ELEMENT_DATA: any[] = [
];


@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MainPage implements OnInit {

  @ViewChild(MatSort) sort: MatSort;



constructor(private route: ActivatedRoute,
  public platform: Platform, private navCtrl: NavController,
   private httpRequestService: HttpRequestService,
   public loadingController: LoadingController) {
    this.httpRequestService.getStoredToken();

}

  @ViewChild(ChartsComponent) chartsComponent: ChartsComponent;
  episodes: EpisodeModel;
  current_user: string;



  links = [ 'Cases', 'Clients'];
  activeLink = this.links[1];

  expandSource = ELEMENT_DATA;

// tslint:disable-next-line:member-ordering
displayedColumnsClients = ['ExternalKey', 'ClientsNames', 'EpisodeStatus', 'Type', 'LastSessionDate', 'CliniciansNames'];

// tslint:disable-next-line:member-ordering
 displayedColumnsCases = ['ExternalKey', 'CliniciansNames', 'EpisodeStatus', 'EpisodeOwner', 'StartDate', 'LastSessionDate'];




 expandedElement;


dataSource;
  files: any[] = null;
   filetemplate = [
    { name: 'Clininicians', icon: 'folder', id: 'CliniciansNames'},
    { name: 'Owner', icon: 'folder', id: 'EpisodeOwner'},
    { name: 'Clients', icon: 'insert_drive_file', id: 'ClientsNames'},
    { name: 'Clients', icon: 'insert_drive_file', id: 'StartDate'},
  ];
  lookupVal;

  folders = [
    { name: 'Owner', icon: 'folder', addDate: 'Jan 9, 2015', id: 'EpisodeOwner', index: 0},
    { name: 'Clininicians', icon: 'folder', addDate: 'Jan 17, 2015', id: 'CliniciansNames', index: 1 },
    { name: 'Clients', icon: 'folder', addDate: 'Jan 28, 2015', id: 'ClientsNames', index: 2},
    { name: 'All Files', icon: 'folder', addDate: 'Jan 28, 2015', id: 'ExternalKey', index: 3},
  ];
  all_chart_options = {
    width:   Math.round(screen.width / 1.0),
    height:  Math.round(screen.height / 3)
  };

  selectedEpisode: CaseModel;

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  onRowClicked(element) {
    const current_element = element;
   this.expandedElement = this.expandedElement === current_element ? null : current_element;
   console.log(element);
 // this.expandedElement = current_element;
}

  ngOnInit() {

  }
  _selectionChange = (item) => {

    const index = item.index;
   this.files = this.dataSource;
  this.lookupVal = this.filetemplate[index];
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
        this.dataSource.sort = this.sort;
        this.selectedEpisode = this.dataSource[0];
        this.chartsComponent.loadChartData(this.dataSource[0]);
        this.chartsComponent.setChartSize(this.all_chart_options);
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

    async getSignedInUser() {

    const loading = await this.loadingController.create({
      message: 'Getting signed in user ...'
    });
    await loading.present();
    await this.httpRequestService.getApiData( environment.USERAPI_GET).subscribe(
      result => {
        console.log(result);
        loading.dismiss();
       this.current_user = result[0].FullName;
        this.getEpisodes();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  getCurrentEpisode(case_num) {
    console.log(case_num);
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
  this.getSignedInUser();

}

ionViewDidEnter() {
  console.log(' ionViewDidEnter');

}

}

