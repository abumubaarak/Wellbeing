export type BaseResponse<T> = {
  success: boolean;
  data: T[];
};
export type Illness = {
  name: string;
  confidence_rate: number;
};
export type Medication = {
  drug_name: string;
  purpose: string;
  dosage_timing: string;
};

export type AnalyseResponse = {
  diagnosis: string;
  illness: Illness[];
  medication: Medication[];
};

export interface ApiConfig {
  url: string;
  timeout: number;
}
