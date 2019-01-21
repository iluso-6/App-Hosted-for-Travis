
export class CaseHelper {

    types = [
        'Individual',
        'Couple',
        'Family',
        'Group'
    ];
    statuses = [
        'Open',
        'Closed Planned',
        'Closed Unplanned'
    ];
    referrals = [
        'Clinician',
        'SocialWorker',
        'IntegrationAdvisor',
        'School',
        'Fritidshjem',
        'Kindergarted',
        'Nursery',
        'Doctor',
        'OtherInstitutionPleaseSpecify'
    ];
    payers = [
        'HSOClackamasCo',
        'HSOMultnomah',
        'HSOWashingtonCo',
        'HSOFeeForService',
        'Medicare',
        'CommercialInsurance',
        'SelfPay',
        'ClachamasGeneralFund',
        'MultnomahTreatmentFund',
        'WashingtonGeneralFund',
        'Other'
    ];
    treatement_settings = [
        'Outpatient',
        'IntensiveOutpatient',
        'ACT',
        'PDTS',
        'SubAcute',
        'PRTS'
    ];
    level_of_care = [
        'AdultA1',
        'AdultA2',
        'AdultB1',
        'AdultB2',
        'AdultC1',
        'AdultC2',
        'AdultD',
        'ChildA',
        'ChildB',
        'ChildC',
        'ChildD'
    ];
    tags: string[] = [
        'CategoryA',
        'CategoryB',
        'CategoryC',
        'CategoryD',
        'CategoryE',
        'CategoryF',
        'Addiction-Cat',
        'Family-Cat',
        'BCBSVT',
    ];
}
