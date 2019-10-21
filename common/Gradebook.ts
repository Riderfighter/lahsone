export default class GradebookClass {
    //@ts-ignore
    public currentStudent: Student;


    public setupStudent(studentinfo: any) {
        this.currentStudent = {
            studentid: studentinfo.Students[0].Demographics.StudentID,
            name: studentinfo.Students[0].Demographics.firstName,
            classes: []
        };
    }

    public setupClasses(classData: any) {
        classData[0].ClassSummary.forEach(classPeriod => {
            let newClass: Class = {
                period: classPeriod.Period,
                gradebooknumber: classPeriod.GradeBookNumber,
                termcode: classPeriod.TermCode,
                classname: classPeriod.CourseTitle,
                teachername: classPeriod.TeacherName,
                roomnumber: classPeriod.RoomNumber,
                grade: classPeriod.CurrentMark,
                gradepercent: classPeriod.Percent,
                missingassignments: classPeriod.MissingAssignment,
                gradebook: []
            };
            //@ts-ignore
            this.currentStudent.classes.push(newClass);
        });
    };

    public setupGradebook(gradebookData: any) {
        //@ts-ignore
        this.currentStudent.classes.forEach(classData => {
            //@ts-ignore
            if (classData.gradebooknumber === gradebookData.GradebookNumber) {
                gradebookData.Categories.forEach(category => {
                    let newCategory: Category = {
                        name: category.Name,
                        numberofassignments: category.NumberOfAssignment,
                        grade: category.Mark,
                        pointsearned: category.PointsEarned,
                        pointspossible: category.PointsPossible,
                        assignments: []
                    };
                    //@ts-ignore
                    classData.gradebook.push(newCategory)
                });
                gradebookData.Assignments.forEach(assignment => {
                    //@ts-ignore
                    classData.gradebook.forEach(category => {
                        if (category.name === assignment.Category) {
                            let newAssignment: Assignment = {
                                assignmentnumber: assignment.AssignmentNumber,
                                description: assignment.Description,
                                isgraded: assignment.isGraded,
                                score: assignment.Score,
                                maxscore: assignment.MaxScore,
                                percentage: assignment.Percent,
                            };
                            //@ts-ignore
                            category.assignments.push(newAssignment);
                        }
                    })
                })
            }
        })
    }

    public getClass(period: number): Class | undefined {
        if (this.currentStudent === undefined
            ||  this.currentStudent.classes === undefined)
        {
            return undefined;
        }

        return this.currentStudent.classes.find(element => element.period === period);

    }
}

type Student = {
    studentid: number
    name: string
    classes: Class[]
}

type Class = {
    period: number
    gradebooknumber: number
    termcode: string
    classname: string
    teachername: string
    roomnumber: string
    grade: string
    gradepercent: number
    missingassignments: number
    gradebook: Category[]
};

type Category = {
    name: string
    numberofassignments: number
    grade: string
    pointsearned: number
    pointspossible: number
    assignments: Assignment[]
}

type Assignment = {
    assignmentnumber: number
    description: string
    isgraded: boolean
    score: number
    maxscore: number
    percentage: number
}
