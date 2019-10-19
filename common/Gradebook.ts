import GradebookData from "./fetched/grades.json";

export default class Gradebook
{
    public getClass(period: number) : Class | undefined
    {
        return GradebookData.classes.find(element => parseInt(element.period) === period);
    }
}

export type Class = {
    course: string,
    period: string,
    teacher: string,
    room: string,
    mark: string,
    grade: string
};