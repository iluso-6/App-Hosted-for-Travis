import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { DxChartComponent } from 'devextreme-angular';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @ViewChild('chart_ors') dxChartORS: DxChartComponent;
  @ViewChild('chart_srs') dxChartSRS: DxChartComponent;
  orsData: any[];
  dataSource: any;

  constructor(    public loadingController: LoadingController,
    private httpRequestService: HttpRequestService) { }
  ClinicalCutOff = 0;
  chart_sm = false;
  commonPaneSettings =  {
    backgroundColor: '#ffffff',
    border: {
      bottom: true,
      color: '#d3d3d3',
      dashStyle: 'solid',
      left: true,
      opacity: undefined,
      right: true,
      top: true,
      visible: false,
      width: 1
      },
  };
    commonSeriesSettings = {
        argumentField: 'AppointmentDate',
        point: {
            visible: false
        }
    };
    commonAxisSettings = {
      label: {
        visible: true
      }
    };

  ngOnInit() {
  }

  setChartSize(size_options) {
    console.log('update chart values');
    const new_chart_options = {
      width: size_options.width,
      height: size_options.height
    };
    if (this.dxChartORS && this.dxChartSRS) {
    this.dxChartORS.size = new_chart_options;
    this.dxChartSRS.size = new_chart_options;
    }
    // if (this.dxChartComponent.instance) {
    //   console.log('dxChartComponent.instance.refresh();');
    //   this.dxChartComponent.size = new_chart_options;
    // this.dxChartComponent.instance.refresh();
    // }
  }

  public async loadChartData(model) {
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
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

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

}
