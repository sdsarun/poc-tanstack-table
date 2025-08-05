import type { FiscalGroup, Person } from "./types";

const fiscalGroup: FiscalGroup[] = [
  {
    fiscalPeriod: {
      id: "fsc_2021",
      name: "October (10/2021) - September (09/2022)",
      startMonth: 10,
      startYear: 2021,
      endMonth: 9,
      endYear: 2022
    },
    collectionPeriods: [
      {
        id: "cp_2021_01",
        fiscalPeriodId: "fsc_2021",
        name: { en: "Q1", th: "ไตรมาส 1" },
        startMonth: 1,
        startYear: 2022,
        isOnline: true,
        isLocked: false,
        additionalInfo: "First quarter",
        createdBy: "admin@example.com",
        createdAt: "2023-01-01T08:00:00.000Z",
        updatedAt: "2023-01-01T08:00:00.000Z"
      },
      {
        id: "cp_2021_02",
        fiscalPeriodId: "fsc_2021",
        name: { en: "Q2", th: "ไตรมาส 2" },
        startMonth: 4,
        startYear: 2022,
        isOnline: true,
        isLocked: false,
        additionalInfo: "Second quarter",
        createdBy: "admin@example.com",
        createdAt: "2023-01-01T08:00:00.000Z",
        updatedAt: "2023-01-01T08:00:00.000Z"
      }
    ]
  },
  {
    fiscalPeriod: {
      id: "fsc_2022",
      name: "October (10/2022) - September (09/2023)",
      startMonth: 10,
      startYear: 2022,
      endMonth: 9,
      endYear: 2023
    },
    collectionPeriods: [
      {
        id: "cp_2022_01",
        fiscalPeriodId: "fsc_2022",
        name: { en: "Q1", th: "ไตรมาส 1" },
        startMonth: 1,
        startYear: 2023,
        isOnline: false,
        isLocked: true,
        additionalInfo: "First quarter",
        createdBy: "admin@example.com",
        createdAt: "2024-01-01T08:00:00.000Z",
        updatedAt: "2024-01-01T08:00:00.000Z"
      },
      {
        id: "cp_2022_02",
        fiscalPeriodId: "fsc_2022",
        name: { en: "Q2", th: "ไตรมาส 2" },
        startMonth: 4,
        startYear: 2023,
        isOnline: true,
        isLocked: false,
        additionalInfo: "Second quarter",
        createdBy: "admin@example.com",
        createdAt: "2024-01-01T08:00:00.000Z",
        updatedAt: "2024-01-01T08:00:00.000Z"
      }
    ]
  },
  {
    fiscalPeriod: {
      id: "fsc_2023",
      name: "October (10/2023) - September (09/2024)",
      startMonth: 10,
      startYear: 2023,
      endMonth: 9,
      endYear: 2024
    },
    collectionPeriods: [
      {
        id: "cp_2023_01",
        fiscalPeriodId: "fsc_2023",
        name: { en: "Q1", th: "ไตรมาส 1" },
        startMonth: 1,
        startYear: 2024,
        isOnline: true,
        isLocked: false,
        additionalInfo: "First quarter",
        createdBy: "admin@example.com",
        createdAt: "2025-08-01T08:00:00.000Z",
        updatedAt: "2025-08-01T08:00:00.000Z"
      },
      {
        id: "cp_2023_02",
        fiscalPeriodId: "fsc_2023",
        name: { en: "Q2", th: "ไตรมาส 2" },
        startMonth: 4,
        startYear: 2024,
        isOnline: true,
        isLocked: false,
        additionalInfo: "Second quarter",
        createdBy: "admin@example.com",
        createdAt: "2025-08-01T08:00:00.000Z",
        updatedAt: "2025-08-01T08:00:00.000Z"
      },
      {
        id: "cp_2023_03",
        fiscalPeriodId: "fsc_2023",
        name: { en: "Q3", th: "ไตรมาส 3" },
        startMonth: 7,
        startYear: 2024,
        isOnline: false,
        isLocked: true,
        additionalInfo: "Third quarter",
        createdBy: "admin@example.com",
        createdAt: "2025-08-01T08:00:00.000Z",
        updatedAt: "2025-08-01T08:00:00.000Z"
      }
    ]
  },
  {
    fiscalPeriod: {
      id: "fsc_2024",
      name: "October (10/2024) - September (09/2025)",
      startMonth: 10,
      startYear: 2024,
      endMonth: 9,
      endYear: 2025
    },
    collectionPeriods: [
      {
        id: "cp_2024_01",
        fiscalPeriodId: "fsc_2024",
        name: { en: "Q1", th: "ไตรมาส 1" },
        startMonth: 1,
        startYear: 2025,
        isOnline: true,
        isLocked: false,
        additionalInfo: "First quarter",
        createdBy: "admin@example.com",
        createdAt: "2025-08-01T08:00:00.000Z",
        updatedAt: "2025-08-01T08:00:00.000Z"
      }
    ]
  }
];

const persons: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10
  }
];

export default {
  fiscalGroup,
  persons
};
