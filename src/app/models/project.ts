export interface Project
{
    id: number | undefined | null;
    name: string | undefined | null;
    createdOn: Date | undefined | null;
    createdBy: string | undefined | null;
    isIncluded: boolean | undefined | null;
    integrationOf: string | undefined | null;
    description: string | undefined | null;
    totalHours: string | undefined | null;
    timeRecords: string | undefined | null;
}

