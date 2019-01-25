import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Platform, LoadingController} from '@ionic/angular';
import { CaseDetailsPage } from '../case-details.page';
import { Case } from 'src/app/models/Case';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<boolean>();


  @Input() panelState: boolean;

  chartWidth = Math.round(this.platform.width() / 1.5);
  chartHeigth = Math.round(this.platform.height() / 3);
  chartHeigth_Margin = 200;
  chartWidth_Margin = 90;
  all_chart_options = {
    width: this.chartWidth,
    height: this.chartHeigth
  };


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
      },
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
      },
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
      },
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
      },
    }
  };

  chart_opened = true;
  caseModel: Case;

  constructor(
    public loadingController: LoadingController,
    private httpRequestService: HttpRequestService,
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  public loadChartData(model: Case) {
    console.log('loadChartData()' );
    console.log(model);
    this.getORSAnswers(model);
  }
  async getORSAnswers(model) {
    this.caseModel = model;
    const clientId = this.caseModel.ClientsIds;
    const episodeId = this.caseModel.Id;
    const lang = 'US';
    const loading = await this.loadingController.create({
      message: 'Getting chart data ...'
    });

    await loading.present();
    await this.httpRequestService
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
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }
  sendMessage() {
    this.messageEvent.emit(this.chart_opened);
    console.log('sendMessage ');
  }
  closePanel() {
    this.chart_opened = !this.chart_opened;
    this.ORS_SRS = Object.create(this.ORS_SRS);
    this.ProtectionSurvey = Object.create(this.ProtectionSurvey);
    this.IndicatorsSurvey = Object.create(this.IndicatorsSurvey);
    this.DrugUseSurvey = Object.create(this.DrugUseSurvey);

    if (this.chart_opened) {
      this.all_chart_options.width = this.chartWidth;
      this.all_chart_options.height = this.chartHeigth;
    } else {
      this.all_chart_options.width = this.platform.width() - this.chartWidth_Margin;
      this.all_chart_options.height = this.platform.height() - this.chartHeigth_Margin;
    }
    this.ORS_SRS.options.width = this.all_chart_options.width;
    this.ORS_SRS.options.height = this.all_chart_options.height;
    this.ProtectionSurvey.options.width = this.all_chart_options.width;
    this.ProtectionSurvey.options.height = this.all_chart_options.height;
    this.IndicatorsSurvey.options.width = this.all_chart_options.width;
    this.IndicatorsSurvey.options.height = this.all_chart_options.height;
    this.DrugUseSurvey.options.width = this.all_chart_options.width;
    this.DrugUseSurvey.options.height = this.all_chart_options.height;
    console.log('panel is open: ' + this.chart_opened);
    this.sendMessage();
  }

}
