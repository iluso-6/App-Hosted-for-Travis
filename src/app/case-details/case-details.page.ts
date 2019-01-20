import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseHelper } from './case_model/CaseHelper';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../service/http-request.service';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl,
  NgForm, Validators, FormGroupName, FormControlName } from '@angular/forms';
import { CaseModel } from '../models/CaseModel';


@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.page.html',
  styleUrls: ['./case-details.page.scss'],
})


export class CaseDetailsPage implements OnInit {


  // panel tracker if needed
  panel_opened: boolean;
  edit_mode = false;



  constructor(
    public loadingController: LoadingController,
    private httpRequestService: HttpRequestService,
    private casehelper: CaseHelper,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.casemodel_helper = this.casehelper;
    this.model = new CaseModel();

  }

  //  values for inputs and dropdown menus held in /case_model/CaseHelper.ts
  casemodel_helper: CaseHelper;

  // models/CaseModel.ts
  model: CaseModel;
  // form Group declaritor
  caseForm: FormGroup;
formControl = new FormControl();
  // field name delaration
  case_number: FormControlName;
  type_selected: FormControlName;
  case_status: FormControlName;
  start_date: FormControlName;
  case_referral: FormControlName;
  case_payer: FormControlName;
  treatement_settings: FormControlName;
  level_of_care: FormControlName;
  case_description: FormControlName;
  case_tags: FormControlName;
  existing_client: FormControlName;

  disabled = true;
// Episode.Id for api referencing
  caseNumber: string;



  ngOnInit() {
    this.caseNumber = this.route.snapshot.paramMap.get('case_num');
    this.getEpisodeById(this.caseNumber);
    this.initForm();
  }

  initForm() {
    this.caseForm = this.formBuilder.group({
      case_number: [''],
      type_selected: [''],
      start_date: [''],
      case_status: [''],
      case_referral: [''],
      case_payer: [''],
      treatement_settings: [''],
      level_of_care: [''],
      case_description: [''],
      case_tags:  [''],
      existing_client:  [''],
    });
  }

  populateForm() {
    console.log('populateForm');
    const model = this.model;
    this.caseForm = this.formBuilder.group({
      case_number: model.ExternalKey,
      type_selected: model.EpisodeType.Name,
      start_date: model.StartDate,
      case_status: model.EpisodeStatus.Name,
      case_referral: 'Ask about this',
      case_payer: 'Ask about this',
      treatement_settings: 'Ask about this',
      level_of_care: 'Ask about this',
      case_description: model.Description,
      case_tags: 'Ask about this',
      existing_client: 'Ask about this',
    });
  }

  async getEpisodeById(case_num) {
    const id_param = case_num;
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.httpRequestService.getApiData( environment.GET_EPISODE_ID + id_param).subscribe(
      result => {
        console.log(result);
        loading.dismiss();
        this.model = result;
        this.populateForm();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }


  ionViewWillEnter() {
  }

  editForm () {
    this.edit_mode =  !this.edit_mode;
 //   this.caseForm.get('case_number').
 //   this.edit_mode ? this.caseForm.enable() : this.caseForm.addControl();

  }

  async onSubmit() {
    console.warn(this.caseForm.value);
  }

  panelOpened(open) {
  this.panel_opened = open;
  }


}
