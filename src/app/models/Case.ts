export class Case {
  Id: number;
  EpisodeStatusId: number;
  EpisodeTypeId: number;
  ExternalKey: string;
  EpisodeOwner: string;
  EpisodeStatus: {
    Id: number;
    Name: string;
    CreateDate: Date;
    LastEditDate: Date;
    CreateUser: number;
  };
  EpisodeType: {
    Name: string;
    Id: number;
    CreateDate: Date;
    LastEditDate: Date;
    CreateUser: number;
  };
  CliniciansNames: string;
  ClientsNames: string;
  Status: number;
  StartDate: Date;
  LastSessionDate: Date;
  Type;
  Alert;
  Description: string;
  ClientsIds: [];

  CloseDate: Date;
  ClosedReason;
  CollateralRatersIds: [];
  CreateDate: Date;
  // CreateUser: 5321
  DiagnosisCode;
  EpisodeCustomFields: [];
  EpisodeIndicator: { StatusType: number; Message: string };

  Inactive: boolean;
  LastEditDate: Date;
  LastEditUser: number;
  OwnerId: number;
  SummaryStatus: { Message: string; StatusType: number };
  TagsIds: [];
  UsersIds: [];

  constructor(data) {
    Object.assign(this, data);
  }
}
