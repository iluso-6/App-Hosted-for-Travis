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
import { DxRangeSelectorComponent} from 'devextreme-angular';
import { nextContext } from '@angular/core/src/render3';
import { NEXT } from '@angular/core/src/render3/interfaces/view';
import { reduce } from 'rxjs/operators';

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
    this.rangeDataSource = this.rangeDataSource;
    platform.ready().then(() => {

      window.addEventListener('orientationchange', function() {
        console.log(screen.orientation.type); // e.g. portrait
    });
      if ( screen.orientation.type === 'landscape-primary' ) {
        this.chartWidth = Math.round(this.platform.width() / 1.5);
        this.chartHeigth = Math.round(this.platform.height() / 3);
        console.log('platform.isLandscape');
      } else if ( screen.orientation.type === 'portrait-primary' ) {
        this.chartWidth = Math.round(this.platform.width() / 1.5);
        this.chartHeigth = Math.round(this.platform.height() / 3);
        console.log('platform.isPortrait');
      }
      this.slides_options = {
        onlyExternal: true,
        onInit: (slides: any) =>
          this.slider = slides
      };
      this.screenWidth = this.platform.width();
      this.screenHeigth = this.platform.height();
      this.dxRangeSelectorComponent.size = this.all_chart_options;
    });
  }


  startSelectedValue: Date = new Date(2011, 11, 25);
  endSelectedValue: Date = new Date(2012, 0, 1);
  rangeDataSource = [
    { t: new Date(2011, 11, 22), costs: 19, income: 18 },
    { t: new Date(2011, 11, 29), costs: 27, income: 12 },
    { t: new Date(2012, 0, 5), costs: 30, income: 5 },
    { t: new Date(2012, 0, 12), costs: 26, income: 6 },
    { t: new Date(2012, 0, 19), costs: 18, income: 10 },
    { t: new Date(2012, 0, 26), costs: 15, income: 15 },
    { t: new Date(2012, 1, 2), costs: 14, income: 21 },
    { t: new Date(2012, 1, 9), costs: 14, income: 25 }
];


  commonSeriesSettings = {
      argumentField: 'AppointmentDate',
      point: {
          visible: false
      }
  };
  ors_data: JSON;
  dataSource: JSON;
  chartsService: ChartsServiceService;
  @ViewChild(DxChartComponent) dxChartComponent: DxChartComponent;
  @ViewChild(DxRangeSelectorComponent) dxRangeSelectorComponent: DxRangeSelectorComponent;

  @Output() messageEvent = new EventEmitter<boolean>();

  screenWidth: number;
  screenHeigth: number;

  chartHeigth_Margin = 200;
  chartWidth_Margin = 90;

  all_chart_options = {
    width: this.chartWidth,
    height: this.chartHeigth
  };

  slideOpts = {
    effect: 'flip'
    //  width: this.platform.width(),
    //  height: this.platform.height()
  };

  size_option = {
    width: this.chartWidth,
    height: this.chartHeigth
  };

  valueAxis = [
    {
      name: 'frequency',
      position: 'left',
      tickInterval: 300
    },
    {
      name: 'percentage',
      position: 'right',
      showZero: true,
      label: {
        customizeText: 'customizeLabelText'
      },
      constantLines: [
        {
          value: 80,
          color: '#fc3535',
          dashStyle: 'dash',
          width: 2,
          label: { visible: false }
        }
      ],
      tickInterval: 20,
      valueMarginsEnabled: false
    }
  ];

  public ORS_SRS = {
    chartType: 'AreaChart',
    dataTable: [
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ],
    options: {
      title: 'ORS & SRS',
      width: this.all_chart_options.width,
      height: this.all_chart_options.height,
      animation: {
        duration: 350,
        easing: 'out',
        startup: true
      }
    }
  };

  public ProtectionSurvey = {
    chartType: 'LineChart',
    dataTable: [
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ],
    options: {
      title: 'Protection Survey',
      width: this.all_chart_options.width,
      height: this.all_chart_options.height,
      animation: {
        duration: 350,
        easing: 'out',
        startup: true
      }
    }
  };

  public IndicatorsSurvey = {
    chartType: 'LineChart',
    dataTable: [
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ],
    options: {
      isStacked: 'relative',
      title: 'Indicators Survey here',
      width: this.all_chart_options.width,
      height: this.all_chart_options.height,
      animation: {
        duration: 350,
        easing: 'out',
        startup: true
      },
      hAxis: {title: 'Year', titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 40}
    }
  };

  public DrugUseSurvey = {
    chartType: 'LineChart',
    dataTable: [
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ],
    options: {
      title: 'Drug Use Survey',
      width: this.all_chart_options.width,
      height: this.all_chart_options.height,
      animation: {
        duration: 350,
        easing: 'out',
        startup: true
      }
    }
  };

  Chart_Titles = {
    text: 'ORS',
    font: { size: 12, weight: 900 }
  };

  panel_opened = true;
  caseModel: Case;
  types: string[] = ['area', 'stackedarea', 'fullstackedarea'];

  adaptiveLayout: {
    height: 300;
    width: 400;
  };

OrsScore = 20; // something ...
OriginPoint = this.OrsScore;
YAxisMax = 40;


/*
orsData = [{
  session_date: 'Date1',
  PTrajectory: this.OriginPoint, // Origin Point
  Trajectory: 0, // Trajectory - NTrajectory
  NTrajectory: this.OriginPoint
}, {
  session_date: 'Date2',
  PTrajectory: 16, // YAxisMax - ( NTrajectory + Trajectory )
  Trajectory: 5,  // Trajectory - NTrajectory
  NTrajectory: 19
}, {
  session_date: 'Date3',
  PTrajectory: 17,
  Trajectory: 6,
  NTrajectory: 17
}];*/

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


  ngOnInit() {
    console.log('ngOnInit');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }
  // updateAutoHeight(speed?: number | undefined) => Promise<void>

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
    this.ORS_SRS = Object.create(this.ORS_SRS);
    this.ProtectionSurvey = Object.create(this.ProtectionSurvey);
    this.IndicatorsSurvey = Object.create(this.IndicatorsSurvey);
    this.DrugUseSurvey = Object.create(this.DrugUseSurvey);

    if (this.panel_opened) {
      this.all_chart_options.width = this.chartWidth;
      this.all_chart_options.height = this.chartHeigth;
      console.log('width');
    } else {
      this.all_chart_options.width =
        this.platform.width() - this.chartWidth_Margin;
      this.all_chart_options.height =
        this.platform.height() - this.chartHeigth_Margin;
    }
    this.dxChartComponent.size = this.all_chart_options;
   this.dxChartComponent.instance.refresh();

    this.dxRangeSelectorComponent.size = this.all_chart_options;

    this.ORS_SRS.options.width = this.all_chart_options.width;
    this.ORS_SRS.options.height = this.all_chart_options.height;
    this.ProtectionSurvey.options.width = this.all_chart_options.width;
    this.ProtectionSurvey.options.height = this.all_chart_options.height;
    this.IndicatorsSurvey.options.width = this.all_chart_options.width;
    this.IndicatorsSurvey.options.height = this.all_chart_options.height;
    this.DrugUseSurvey.options.width = this.all_chart_options.width;
    this.DrugUseSurvey.options.height = this.all_chart_options.height;
    console.log(
      'width: ' +
        this.all_chart_options.width +
        ' height: ' +
        this.all_chart_options.height
    );
  }
}
