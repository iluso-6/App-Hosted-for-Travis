import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Platform, LoadingController, IonContent } from '@ionic/angular';
import { Case } from 'src/app/models/Case';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { environment } from 'src/environments/environment';
import { ChartsServiceService } from './charts-service.service';
import { DxChartComponent } from 'devextreme-angular';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  cutOff = 0;
  chartWidth = Math.round(this.platform.width() / 1.5);
  chartHeigth = Math.round(this.platform.height() / 3);
  slides_options: { onlyExternal: boolean; onInit: (slides: any) => any; };
  slider: any;

  constructor(
    public loadingController: LoadingController,
    private platform: Platform,
    private httpRequestService: HttpRequestService,
    chartsServiceService: ChartsServiceService
  ) {
    this.chartsService = chartsServiceService;
    const self = this;

    platform.ready().then(() => {
      console.log('platform.ready()');
      window.addEventListener('orientationchange', function() { self.setPlatFormDimensions(); });
      // call this to init values
      self.setPlatFormDimensions();
     });
  }

panel_opened = true;


  commonSeriesSettings = {
      argumentField: 'AppointmentDate',
      point: {
          visible: false
      }
  };
  commonAxisSettings = {
    label: {
      visible: true // !this.panel_opened
    }
  };

  ors_data: JSON;
  dataSource: JSON;
  chartsService: ChartsServiceService;
  @ViewChild(DxChartComponent) dxChartComponent: DxChartComponent;

  @Output() messageEvent = new EventEmitter<boolean>();



  chartHeigth_Margin = 200;
  chartWidth_Margin = 90;

  all_chart_options = {
    width: this.chartWidth,
    height: this.chartHeigth
  };




  Chart_Titles = {
    text: 'ORS',
    font: { size: 12, weight: 900 }
  };
// ********************************   preprocess chart data *****************************************

OrsScore = 20; // something ...
OriginPoint = this.OrsScore;
YAxisMax = 40;

  orsData;
  ClinicalCutOff = 0;
  prepareChartData(data) {
    const chartYHeight = 45;
    const OriginPoint = data[0].OrsScore;
    const completedChartData = [];

    Object.keys(data).forEach(key => {
      const firstKey = Object.keys(data)[0];
      if (firstKey === '0') {
        this.ClinicalCutOff = data[0].ClinicalCutOff.Value;
        completedChartData.push({
          ClinicalCutOff: data[0].ClinicalCutOff.Value,
          OrsScore: data[0].OrsScore,
          NTrajectory: OriginPoint,
          Trajectory: (data[0].Trajectory - data[0].NTrajectory),
          PTrajectory: chartYHeight - OriginPoint,
          AppointmentDate: data[0].AppointmentDate
        });
     //   console.log('push' + firstKey);
        //    console.log('first key' + firstKey);
        delete data[firstKey];
      } else {

        const nVal = data[key].NTrajectory;
        const TVal = data[key].Trajectory;
        completedChartData.push({
          ClinicalCutOff: data[key].ClinicalCutOff.Value,
          OrsScore: data[key].OrsScore,
          NTrajectory: nVal,
          Trajectory: (TVal - nVal).toFixed(2),
          PTrajectory: (chartYHeight - TVal).toFixed(2),
          AppointmentDate: data[key].AppointmentDate
        });

      }
    });
    console.log(completedChartData);
    return completedChartData;

  }
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  preprocess chart data ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



  setPlatFormDimensions() {

      console.log('orientationchange ' + screen.orientation.type); // e.g. portrait
      if (screen.orientation.type === 'landscape-primary') {
        this.chartWidth = Math.round(screen.width / 1.1);
        this.chartHeigth = Math.round(screen.height / 2.8);
      } else if (screen.orientation.type === 'portrait-primary') {
        this.chartWidth = Math.round(screen.width / 1.1 );
        this.chartHeigth = Math.round(screen.height / 2);
      }
      console.log('width: ' + screen.width);
      console.log('height: ' + screen.height);

      console.log('this.panel_opened: ' + this.panel_opened);
    if (this.panel_opened) {
      this.all_chart_options.width = this.chartWidth;
      this.all_chart_options.height = this.chartHeigth;
    } else {
      this.all_chart_options.width =
      screen.width - this.chartWidth_Margin;
      this.all_chart_options.height =
      screen.height - this.chartHeigth_Margin;
    }
    this.setChartSize(this.all_chart_options);

  }

  ngOnInit() {
    console.log('ngOnInit');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }


  chartClicked() {
    //   console.log(this.ionContent);
    this.panel_opened = !this.panel_opened;
    this.sendChartClickedMessage();
    this.closePanel(this.panel_opened);
  }

  sendChartClickedMessage() {
    this.messageEvent.emit(this.panel_opened);
    console.log('sendMessage()');
  }

  public async loadChartData(model: Case) {
    console.log('loadChartData()');
    this.get_ORS_SRS_Data(model);


  }

  public async get_ORS_SRS_Data(modelData) {

    const model = modelData;
    const clientId = model.ClientsIds;
    const episodeId = model.Id;
    const lang = 'US';
    const loading = await this.loadingController.create({
      message: 'Getting chart data ...'
    });

    loading.present();
    this.httpRequestService
      .getApiData(
        environment.GET_ORS_ANSWERS +
          '?languageCode=' +
          `${lang}` +
          '&clientId=' +
          `${clientId}` +
          '&episodeId=' +
          `${episodeId}` +
          '&includeCollateralData=false'
      )
      .subscribe(
        result => {
          console.log(result);
          loading.dismiss();
          this.orsData = this.prepareChartData(result);
          this.dataSource = result;
        //  console.log(this.dataSource);
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

  closePanel(state) {

    this.panel_opened = state;

    if (this.panel_opened) {
      this.all_chart_options.width = this.chartWidth;
      this.all_chart_options.height = this.chartHeigth;
    } else {
      this.all_chart_options.width =
      screen.width - this.chartWidth_Margin;
      this.all_chart_options.height =
      screen.height - this.chartHeigth_Margin;
    }
    this.setChartSize(this.all_chart_options);



  }

  setChartSize(size_options) {
    console.log('update chart values');
    const new_chart_options = {
      width: size_options.width,
      height: size_options.height
    };
    this.dxChartComponent.size = new_chart_options;
    if (this.dxChartComponent.instance) {
      console.log('dxChartComponent.instance.refresh();');
    this.dxChartComponent.instance.refresh();
    }
  }
}
