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
    this.contactForm = this.createFormGroupWithBuilderAndModel(formBuilder);
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
  formControl = new FormControl();
  case_tags = new FormControl();
  EpisodeStatus: FormGroupName;
  // field name delaration
  ExternalKey: FormControlName;
  FORM_EpisodeType: FormControlName;
  FORM_EpisodeStatus: FormControlName;
  StartDate: FormControlName;
  case_referral: FormControlName;
  case_payer: FormControlName;
  treatement_settings: FormControlName;
  level_of_care: FormControlName;
  Description: FormControlName;
  existing_client: FormControlName;
  Name: FormControlName;
  disabled = true;
  // Episode.Id for api referencing
  caseNumber: string;

  ngOnInit() {
    this.caseNumber = this.route.snapshot.paramMap.get('case_num');
    this.getEpisodeById(this.caseNumber);
    this.initForm();
  }

  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group(new CaseModel());
  }

  initForm() {
    this.caseForm = this.formBuilder.group({
      ExternalKey: [''],
      FORM_EpisodeType: [''],
      StartDate: [''],
      FORM_EpisodeStatus: [''],
      case_referral: [''],
      case_payer: [''],
      treatement_settings: [''],
      level_of_care: [''],
      Description: [''],
      case_tags: [''],
      existing_client: [''],
      EpisodeStatus: this.formBuilder.group({
        Id: null,
        Name: [''],
        CreateDate: Date,
        LastEditDate: Date,
        CreateUser: Date,
      }),
    });
  }


  populateForm() {
    console.log('populateForm');
    const model = this.caseModel;
    this.caseForm = this.formBuilder.group({
      Id: model.Id,
      EpisodeStatusId: 1,
      ExternalKey: model.ExternalKey,
      FORM_EpisodeType: model.EpisodeType.Name,
      StartDate: model.StartDate,
      FORM_EpisodeStatus: model.EpisodeStatus.Name,
      case_referral: 'Ask about this',
      case_payer: 'Ask about this',
      treatement_settings: 'Ask about this',
      level_of_care: 'Ask about this',
      Description: model.Description,
      case_tags: [] = [''],
      existing_client: 'Ask about this',
      EpisodeTypeId: 1,
      EpisodeOwner: '',
      EpisodeStatus: this.formBuilder.group({
        Id: model.EpisodeStatus.Id,
        Name: model.EpisodeStatus.Name,
        CreateDate: model.EpisodeStatus.CreateDate,
        LastEditDate: model.EpisodeStatus.LastEditDate,
        CreateUser: model.EpisodeStatus.CreateUser,
      }),
      EpisodeType: {
        Name: this.FORM_EpisodeType,
        Id: model.EpisodeType.Id,
        CreateDate: model.EpisodeType.CreateDate,
        LastEditDate: model.EpisodeType.LastEditDate,
        CreateUser: model.EpisodeType.CreateUser
      },
      CliniciansNames: model.CliniciansNames,
      ClientsNames: model.ClientsNames,
      Status: model.Status,
      LastSessionDate: model.LastSessionDate,
      Type: model.Type,
      Alert: model.Alert,
      ClientsIds: model.ClientsIds,
      CloseDate: model.CloseDate,
      ClosedReason: model.ClosedReason,
      CollateralRatersIds: model.CollateralRatersIds,
      CreateDate: model.CreateDate,
      DiagnosisCode: model.DiagnosisCode,
      EpisodeCustomFields: model.EpisodeCustomFields,
      EpisodeIndicator: model.EpisodeIndicator,
      Inactive: model.Inactive,
      LastEditDate: model.LastEditDate,
      LastEditUser: model.LastEditUser,
      OwnerId: model.OwnerId,
      SummaryStatus: model.SummaryStatus,
      TagsIds: model.TagsIds,
      UsersIds: model.UsersIds
    });
  }

  async getEpisodeById(case_num) {
    const id_param = case_num;
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.httpRequestService
      .getApiData(environment.GET_EPISODE_ID + id_param)
      .subscribe(
        result => {
          console.log(result);
          loading.dismiss();
          this.model = result;
          this.caseModel = new Case(result);
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
        this.httpRequestService.setDataIsAltered(true);
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
