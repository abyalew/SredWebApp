export interface Project
{
    id: number | undefined | null;
    name: string;
    createdOn: Date;
    createdBy: string;
    isIncluded: boolean;
    integrationOf: string;
    description: string;
    totalHours: string;
    timeRecords: string;
}
