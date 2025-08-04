

export interface SearchCriteria<T> {
  pageIndex: number;
  pageSize: number;
  criteria: Partial<T>;
}

export type KeysOf<T> = keyof T;

export type EntityID = number | string;

export interface Issuer {
  id: number;
  loginUID: string;
}

export interface AuditTrail {
  lastModifiedAt: string;
  lastModifiedBy: Issuer;
  createdAt: string;
  createdBy: Issuer;
}

export interface RecordStatus {
  at: string;
  by: Issuer;
  id: number;
  reason: string;
}

export interface BaseRecord {
  auditTrail: AuditTrail;
  deleted: boolean;
  recordStatus: RecordStatus;
  version: number;
}

export type Record<T> = T & BaseRecord;

export interface ApiResponse<T> {
  data: Record<T>[];
  success: boolean;
}

export interface ErrorMessage {
  code: string;
  message: string;
}

export interface ErrorResponse<T = unknown> {
  errors: ErrorMessage[];
  success: boolean;
  visible: boolean;
}

export interface LocalizedValue<T> {
  languageId: number;
  value: T;
}

export interface DeleteParameters {
  id: number;
  version: number;
  recordStatus: {
    reason: string;
  };
}
