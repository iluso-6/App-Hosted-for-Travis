import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Case } from '../models/Case';
import { CaseModel } from '../models/CaseModel';
import { CaseHelper } from './case_model/CaseHelper';
import { ChartsComponent } from './charts/charts.component';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { HttpRequestService } from '../service/http-request.service';
import { DxChartComponent } from 'devextreme-angular';


@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.page.html',
  styleUrls: ['./case-details.page.scss']
})
export class CaseDetailsPage implements OnInit {
  screenWidth: number;
  screenHeigth: number;

  constructor(
    public loadingController: LoadingController,
    private httpRequestService: HttpRequestService,
    public navCtrl: NavController,
    private casehelper: CaseHelper,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public matdialog: MatDialog,
    private platform: Platform
  ) {
    this.platform = platform;
    this.casemodel_helper = this.casehelper;
    this.model = new CaseModel();
    this.caseForm = this.createFormGroup();
    console.log('contructor');
    platform.ready().then(() => {

   //   console.log('platform.ready() ' );
      this.screenWidth = this.platform.width();
      this.screenHeigth = this.platform.height();
  });
}

  @ViewChild(ChartsComponent) chartsComponent: ChartsComponent;

  // warning dialog button states
  delete_button_clicked = false;
  cancel_button_clicked = false;

  caseModel: Case;
  contactForm: FormGroup;

  // panel tracker if needed
  panel_opened = true;
  chartWidth = Math.round(this.platform.width() / 1.5);
  chartHeigth = Math.round(this.platform.height() / 3);
  chartHeigth_Margin = 200;
  chartWidth_Margin = 90;

/*  all_chart_options = {
    width: this.chartWidth,
    height: this.chartHeigth
  };*/




  edit_mode = false;

  //  values for inputs and dropdown menus held in /case_model/CaseHelper.ts
  casemodel_helper: CaseHelper;

  // models/CaseModel.ts
  model: CaseModel;
  // form Group declaritor
  caseForm: FormGroup;
  EpisodeStatus: FormGroupName;
  EpisodeType: FormGroupName;
  case_tags = new FormControl();
  disabled = true;
  // Episode.Id for api referencing
  caseNumber: string;

  message: boolean;

  ngOnInit() {
    this.caseNumber = this.route.snapshot.paramMap.get('case_num');
    console.log(this.caseNumber);
    this.getEpisodeById(this.caseNumber);
  }



 receiveChartClickedMessage($event) {
    this.message = $event;
    this.panel_opened = $event;
    console.log('receiveMessage ' + $event );
  }

  chartClicked() {
    console.log('chartClicked ');
  }


  onPanelStateChanged(state: boolean) {
    this.panel_opened = !this.panel_opened;
    this.chartsComponent.closePanel(this.panel_opened);
    console.log('onPanelStateChanged');
  }
  createFormGroup() {
    return new FormGroup({
      EpisodeType: new FormGroup({
        Name: new FormControl(),
        CreateDate: new FormControl(),
        LastEditDate: new FormControl(),
        CreateUser: new FormControl()
      }),
      EpisodeStatus: new FormGroup({
        Name: new FormControl(),
        CreateDate: new FormControl(),
        LastEditDate: new FormControl(),
        CreateUser: new FormControl()
      }),
      ExternalKey: new FormControl(),
      StartDate: new FormControl(),
      case_referral: new FormControl(),
      case_payer: new FormControl(),
      treatement_settings: new FormControl(),
      level_of_care: new FormControl(),
      Description: new FormControl(),
      case_tags: new FormControl(),
      existing_client: new FormControl()
    });
  }

  populateForm() {

    console.log('populateForm');
    const model = this.caseModel;
    console.log(model);
    this.chartsComponent.loadChartData(model);
    this.caseForm = this.formBuilder.group({
      Id: model.Id,
      EpisodeStatusId: model.EpisodeStatusId,
      ExternalKey: model.ExternalKey,
      StartDate: model.StartDate,
      case_referral: 'Ask about this',
      case_payer: 'Ask about this',
      treatement_settings: 'Ask about this',
      level_of_care: 'Ask about this',
      Description: model.Description,
      case_tags: [] = [''],
      existing_client: 'Ask about this',
      EpisodeTypeId: model.EpisodeTypeId,
      EpisodeOwner: model.EpisodeOwner,
      EpisodeStatus: this.formBuilder.group({
        Id: model.EpisodeStatus.Id,
        Name: model.EpisodeStatus.Name,
        CreateDate: model.EpisodeStatus.CreateDate,
        LastEditDate: model.EpisodeStatus.LastEditDate,
        CreateUser: model.EpisodeStatus.CreateUser
      }),
      EpisodeType: this.formBuilder.group({
        Name: model.EpisodeType.Name,
        Id: model.EpisodeType.Id,
        CreateDate: model.EpisodeType.CreateDate,
        LastEditDate: model.EpisodeType.LastEditDate,
        CreateUser: model.EpisodeType.CreateUser
      }),
      CliniciansNames: model.CliniciansNames,
      ClientsNames: model.ClientsNames,
      Status: model.Status,
      LastSessionDate: model.LastSessionDate,
      Type: model.Type,
      Alert: model.Alert,
      ClientsIds: [model.ClientsIds],
      CloseDate: model.CloseDate,
      ClosedReason: model.ClosedReason,
      CollateralRatersIds: [model.CollateralRatersIds],
      CreateDate: model.CreateDate,
      DiagnosisCode: model.DiagnosisCode,
      EpisodeCustomFields: [model.EpisodeCustomFields],
      EpisodeIndicator: model.EpisodeIndicator,
      Inactive: model.Inactive,
      LastEditDate: model.LastEditDate,
      LastEditUser: model.LastEditUser,
      OwnerId: model.OwnerId,
      SummaryStatus: model.SummaryStatus,
      TagsIds: [model.TagsIds],
      UsersIds: [model.UsersIds]
    });
  }



  async getEpisodeById(case_num) {
    const case_ExternalKey = case_num;
    const loading = await this.loadingController.create({
      message: 'Getting case details ...'
    });
    await loading.present();
    await this.httpRequestService
      .getApiData(environment.GET_EPISODE_ExternalKey + case_ExternalKey)
      .subscribe(
        result => {
          console.log(result);
          loading.dismiss();
          this.model = result;
          this.caseModel = result;
          this.populateForm();
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

  ionViewWillEnter() {}

  editForm() {
    this.edit_mode = !this.edit_mode;
  }

  deleteForm() {
    const Id = this.caseNumber;

    const dialogRef = this.matdialog.open(WarningDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.delete_button_clicked = result;
      if (this.delete_button_clicked) {
        //    this.deleteEpisode(Id);
        console.log('delete');
      } else {
        console.log('cancel');
      }
      this.edit_mode = false;
    });
  }

  onSubmit() {
    const form = this.caseForm.value;
    console.log(form);
    this.putApiData(form);
  }

  //    ********************************    CRUD API OPERATIONS    ************************
  async postApiData() {
    const loading = await this.loadingController.create({
      message: 'Creating case'
    });
    await loading.present();
    await this.httpRequestService
      .postApiData(environment.POST_EPISODE)
      .subscribe(
        res => {
          loading.dismiss();
          console.log(res);
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

  async putApiData(body) {
    const loading = await this.loadingController.create({
      message: 'Updating case ...'
    });
    await loading.present();
    await this.httpRequestService
      .putApiData(environment.PUT_EPISODE, body)
      .subscribe(
        res => {
          loading.dismiss();
          console.log(res);
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

  async deleteEpisode(id) {
    const loading = await this.loadingController.create({
      message: 'Deleteing case ...'
    });
    await loading.present();
    await this.httpRequestService.deleteApiData(id).subscribe(
      res => {
        loading.dismiss();
        console.log(res);
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  //    ********************************    END API OPERATIONS    ************************

  goBack() {
    this.navCtrl.navigateBack(['/home']);
  }
}
