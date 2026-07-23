// table.ts

export interface TableFilters {
  search: string;
  department: string;
  status: string;
  salaryMin: number | null;
  salaryMax: number | null;
}