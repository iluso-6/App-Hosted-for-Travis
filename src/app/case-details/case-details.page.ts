import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseHelper } from './case_model/CaseHelper';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../service/http-request.service';
import { LoadingController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormControlName,
  FormGroupName
} from '@angular/forms';
import { CaseModel } from '../models/CaseModel';
import { MatDialog } from '@angular/material';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { Case } from '../models/Case';


@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.page.html',
  styleUrls: ['./case-details.page.scss']
})
export class CaseDetailsPage implements OnInit {
  public events: string[] = [];
  public series: any[] = [{
          name: 'India',
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
      }, {
          name: 'Russian Federation',
          data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
      }, {
          name: 'Germany',
          data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995]
      }, {
          name: 'World',
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
      }];

  public categories: number[] = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];
  delete_button_clicked = false;
  caseModel: Case;
  contactForm: FormGroup;



  constructor(
    public loadingController: LoadingController,
    private httpRequestService: HttpRequestService,
    private casehelper: CaseHelper,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public matdialog: MatDialog
  ) {
    this.casemodel_helper = this.casehelper;
    this.model = new CaseModel();
    this.caseForm = this.createFormGroup();
  }

  // panel tracker if needed
  panel_opened: boolean;
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

  ngOnInit() {
    this.caseNumber = this.route.snapshot.paramMap.get('case_num');
    console.log(this.caseNumber);
    this.getEpisodeById(this.caseNumber);
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
      case_payer:  new FormControl(),
      treatement_settings: new FormControl(),
      level_of_care:  new FormControl(),
      Description:  new FormControl(),
      case_tags:  new FormControl(),
      existing_client: new FormControl(),
    });
  }


  populateForm() {
    console.log('populateForm');
    const model = this.caseModel;
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
        CreateUser: model.EpisodeStatus.CreateUser,
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
      message: 'Loading...'
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
      }
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
      message: 'Loading...'
    });
    await loading.present();
    await this.httpRequestService
      .postApiData(environment.POST_EPISODE)
      .subscribe(
        res => {
          loading.dismiss();
          console.log(res);
          this.httpRequestService.setDataIsAltered(true);
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

  async putApiData(body) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.httpRequestService.putApiData(environment.PUT_EPISODE, body).subscribe(
      res => {
        loading.dismiss();
        console.log(res);
        this.httpRequestService.setDataIsAltered(true);
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async deleteEpisode(id) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.httpRequestService.deleteApiData(id).subscribe(
      res => {
        loading.dismiss();
        console.log(res);
        this.httpRequestService.setDataIsAltered(true);
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

    //    ********************************    END API OPERATIONS    ************************

  panelOpened(open) {
    this.panel_opened = open;
  }
}
