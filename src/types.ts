export type FiscalPeriod = {
  id: string
  name: string
  startMonth: number
  startYear: number
  endMonth: number
  endYear: number
}

export type LocalizedName = {
  en: string
  th: string
}

export type CollectionPeriod = {
  id: string
  fiscalPeriodId: string
  name: LocalizedName
  startMonth: number
  startYear: number
  isOnline: boolean
  isLocked: boolean
  additionalInfo: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type FiscalGroup = {
  fiscalPeriod: FiscalPeriod
  collectionPeriods: CollectionPeriod[]
}

export type Row = {
  name: string
  term: string
  isOnline: boolean
  isLocked: boolean
  fiscalPeriodName: string
}

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}