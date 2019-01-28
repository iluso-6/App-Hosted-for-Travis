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

  constructor(
    public loadingController: LoadingController,
    private platform: Platform,
    private httpRequestService: HttpRequestService,
    chartsServiceService: ChartsServiceService
  ) {
    this.chartsService = chartsServiceService;
    platform.ready().then(() => {
      console.log('platform.ready()');

      if ( this.platform.isLandscape ) {
        this.chartWidth = Math.round(this.platform.width() / 1.5);
        this.chartHeigth = Math.round(this.platform.height() / 3);
        console.log('platform.isLandscape');
      } else if (this.platform.isPortrait ) {
        this.chartWidth = Math.round(this.platform.width() / 1.5);
        this.chartHeigth = Math.round(this.platform.height() / 3);
        console.log('platform.isPortrait');
      }
      this.screenWidth = this.platform.width();
      this.screenHeigth = this.platform.height();
    });
  }

  commonSeriesSettings = {
      argumentField: 'AppointmentDate',
      point: {
          visible: false
      },
      type: 'area'

  };
  ors_data: any;
  dataSource: JSON;
  chartsService: ChartsServiceService;
  @ViewChild(DxChartComponent) DxChartComponent: DxChartComponent;

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
      title: 'Indicators Survey',
      width: this.all_chart_options.width,
      height: this.all_chart_options.height,
      animation: {
        duration: 350,
        easing: 'out',
        startup: true
      }
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

  chart_opened = true;
  caseModel: Case;
  types: string[] = ['area', 'stackedarea', 'fullstackedarea'];

  adaptiveLayout: {
    height: 300;
    width: 400;
  };

  ngOnInit() {}

  // updateAutoHeight(speed?: number | undefined) => Promise<void>

  chartClicked() {
    //   console.log(this.ionContent);
    this.chart_opened = !this.chart_opened;
    this.sendChartClickedMessage();
    this.closePanel(this.chart_opened);
  }

  sendChartClickedMessage() {
    this.messageEvent.emit(this.chart_opened);
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
          this.cutOff = result[0].ClinicalCutOff.Value;
          const NEstOrsPost = result[0].Estimates.NEstOrsPost;
          const EstOrsPost = result[0].Estimates.EstOrsPost;
          const AppointmentDateVal = result[result.length - 1].AppointmentDate;
      //    result[result.size].push ({NTrajectory : NEstOrsPost});
      //    result[result.size].push ({Trajectory : EstOrsPost});
      const temp = result;
      temp.push({
        Trajectory : EstOrsPost,
        NTrajectory : NEstOrsPost,
        AppointmentDate : AppointmentDateVal
      });
          this.dataSource = temp;
          console.log(this.dataSource);
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

  closePanel(state) {
    this.chart_opened = state;
    this.ORS_SRS = Object.create(this.ORS_SRS);
    this.ProtectionSurvey = Object.create(this.ProtectionSurvey);
    this.IndicatorsSurvey = Object.create(this.IndicatorsSurvey);
    this.DrugUseSurvey = Object.create(this.DrugUseSurvey);

    if (this.chart_opened) {
      this.all_chart_options.width = this.chartWidth;
      this.all_chart_options.height = this.chartHeigth;
      console.log('width');
    } else {
      this.all_chart_options.width =
        this.platform.width() - this.chartWidth_Margin;
      this.all_chart_options.height =
        this.platform.height() - this.chartHeigth_Margin;
    }
    this.DxChartComponent.size = this.all_chart_options;
    this.DxChartComponent.instance.refresh();

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
