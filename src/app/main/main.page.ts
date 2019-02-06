import {  Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from '../service/http-request.service';
import { environment } from '../../environments/environment';
import { EpisodeModel } from '../models/EpisodeModel';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CaseModel } from '../models/CaseModel';
import { ChartsComponent } from '../core/shared-modules/charts/charts.component';
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
  chartWidth: number;
  chartHeigth: number;
  tableHeight: string;
  isLandscape: boolean;
  cardHeight: string;
  all_chart_options: { width: number; height: number; };



constructor(private route: ActivatedRoute,
  public platform: Platform, private navCtrl: NavController,
   private httpRequestService: HttpRequestService,
   public loadingController: LoadingController) {
    this.httpRequestService.getStoredToken();
    platform.ready().then(() => {
      const self = this;
      console.log('platform.ready()');
      window.addEventListener('orientationchange', function() { self.setPlatFormDimensions(); });
      // call this to init values
      self.setPlatFormDimensions();
     });
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

  setPlatFormDimensions() {
    const toolbarHeight = 50;
    const tableMargins = 110;
    const chartBottomMargin = 20;
    console.log('orientationchange ' + screen.orientation.type); // e.g. portrait
    if (screen.orientation.type === 'landscape-primary') {
      this.all_chart_options = {
        width:   screen.width ,
        height:  (screen.availHeight - toolbarHeight - chartBottomMargin)
      };
      this.isLandscape = true;
    } else if (screen.orientation.type === 'portrait-primary') {
      const rawCardHeight = Math.round(screen.availHeight / 2);
      this.cardHeight =  rawCardHeight + 'px';
      this.tableHeight = rawCardHeight - tableMargins + 'px';
      this.all_chart_options = {
        width:   screen.width,
        height:  (screen.availHeight - rawCardHeight) - toolbarHeight - chartBottomMargin
      };
     this.isLandscape = false;

    }
    this.chartsComponent.setChartSize(this.all_chart_options);

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

