export class EpisodeModel {
    ExternalKey;
    EpisodeOwner;
    CliniciansNames;
    ClientsNames;
    Status;
    StartDate;
    LastSessionDate;
    Type;
    Alert;
    Description;

    constructor(data) {
      Object.assign(this, data);
  //  ^^^^^^^^^^^^^^^^^^^^^^^^^^
    }
  }
