import { Injectable } from '@angular/core';
import { LoadingController} from '@ionic/angular';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { environment } from 'src/environments/environment';


class Complaints {
  complaint: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartsServiceService {

  complaint: string;
  count: number;
  cumulativePercent: number;
    ors_data: any;
  public dataSource: JSON;
  cutOff: any;
  constructor(
    public loadingController: LoadingController,
    private httpRequestService: HttpRequestService,

  ) { }


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
          return Promise.resolve(temp);
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }


}



@Injectable()
export class Service {
  /*
  getComplaintsData(): ChartsServiceService[] {
      // tslint:disable-next-line:prefer-const
      let data = complaintsData.sort(function (a, b) {
              return b.count - a.count;
          }),
        // tslint:disable-next-line:prefer-const
        totalCount = data.reduce(function (prevValue, item) {
              return prevValue + item.count;
          }, 0),
          cumulativeCount = 0;
      return data.map(function (item, index) {
          cumulativeCount += item.count;
          return {
              complaint: item.complaint,
              count: item.count,
              cumulativePercent: Math.round(cumulativeCount * 100 / totalCount)
          };
      });
  }*/
}
