import type { PropertyId } from './property.js';
import type { ISODate } from './rates.js';

/**
 * Deductible expense categories aligned with Spanish rental income tax (IRPF / Renta).
 */
export type ExpenseCategory =
  | 'utilities'
  | 'ibi'
  | 'community'
  | 'insurance'
  | 'cleaning'
  | 'maintenance'
  | 'furnishing'
  | 'software'
  | 'commission'
  | 'contractor'
  | 'mortgage_interest'
  | 'other';

export interface ExpenseRecord {
  id: string;
  propertyId: PropertyId;
  date: ISODate;
  category: ExpenseCategory;
  vendor: string;
  description: string;
  amountEur: number;
  /** Whether the expense must be prorated by rented days in IRPF (e.g. IBI, community, insurance). */
  prorateByRentedDays: boolean;
  invoiceRef?: string;
}

export interface VendorContract {
  id: string;
  propertyId: PropertyId;
  vendorName: string;
  serviceType: 'cleaning' | 'maintenance' | 'management' | 'utilities' | 'software' | 'other';
  monthlyCostEur?: number;
  perStayCostEur?: number;
  startDate: ISODate;
  endDate?: ISODate;
  notes?: string;
}

export interface AnnualTaxSummary {
  propertyId: PropertyId;
  taxYear: number;
  rentedNights: number;
  grossIncomeEur: number;
  platformCommissionsEur: number;
  directExpensesEur: number;
  proratedExpensesEur: number;
  totalDeductibleExpensesEur: number;
  netTaxableIncomeEur: number;
}
