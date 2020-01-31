export default class GradebookClass {
    public currentStudent: ExtensionStudent = {
        AuthenticationData: undefined,
        ClassSummaryData: undefined
    };


    public setupStudent(studentinfo: Authentication) {
        this.currentStudent.AuthenticationData = studentinfo;
    }

    public setupClasses(classData: ClassSummary[]) {
        classData[0].ClassSummary.filter(studentclass => studentclass.Term === "Dropped Gradebooks" || studentclass.Term !== "Current Terms").forEach(classPeriod => {
            classData[0].ClassSummary.splice(classData[0].ClassSummary.indexOf(classPeriod), 1);
        });
        this.currentStudent.ClassSummaryData = classData[0];
    };

    public setupGradebook(gradebookData: Class) {
        this.currentStudent.ClassSummaryData!.ClassSummary.forEach(classData => {
            if (classData.GradeBookNumber === gradebookData.GradebookNumber) {
                classData.Class = gradebookData;
            }
        })
    }

    public getClass(period: number): Class | undefined {
        if (this.currentStudent === undefined
            || this.currentStudent.ClassSummaryData!.ClassSummary === undefined) {
            return undefined;
        }

        return this.currentStudent.ClassSummaryData!.ClassSummary.filter(element => element.Period === period)[0].Class;

    }
}

type ExtensionStudent = {
    AuthenticationData?: Authentication
    ClassSummaryData?: ClassSummary
}

interface Authentication {
    UserType: string
    DefaultStudentID: number
    SignalKit: boolean
    Titan: boolean
    Students: Student[]
    PasswordRule: {
        RequirePasswordChange: boolean
        PasswordExpireInDays: number
        RequirePasswordChangeMessage: string
    },
    AccessToken: string
    RefreshToken: string
}

interface Student {
    Demographic: Demographic
    Views: View[]
}

interface Demographic {
    SchoolCode: number
    SchoolName: string
    StudentID: number
    FirstName: string
    MiddleName: string
    LastName: string
    Grade: string
    Gender: string
    Birthdate: string
    Age: number
    MobilePhone: string
    EmailAddress: string
    MailingAddress: {
        Address: string
        City: string
        State: string
        ZipCode: string
        ZipExt: string
        TypeCode: any
        TypeDescription: any
    }
    ResidenceAddress: {
        Address: string
        City: string
        State: string
        ZipCode: string
        ZipExt: string
        TypeCode: any
        TypeDescription: any
    }
    CorrespondenceLanguageCode: string
    CorrespondenceLanguageDescription: string
    LanguageFluencyCode: string
    LanguageFluencyDescription: string
    EthnicityCode: string
    EthnicityDescription: string
    RaceCode: string
    RaceDescription: string
    PrimaryPhoneNumber: string
    ParentGuardianName: string
    Contact1PhoneNumber: string
    Contact1Title: string
    Contact2PhoneNumber: string
    Contact2Title: string
    DisplayText: string
    DoNotRelease: string
    CounselorNumber: number
    CounselorName: string
    CounselorEmailAddress: string
    ParentGuardianEmailAddress: string
    LockerNumber: string
    LockerCombination: string
    LockerLocation: string
    LockerPosition: string

}

interface View {
    ViewCode: string
    CanViewDetails: boolean
    ViewDescription: string
}

interface Class {
    GradebookNumber: number
    GradebookName: string
    TermCode: string
    TermDescription: string
    Status: string
    Period: number
    StartDate: string
    EndDate: string
    ShowWhatIf: boolean
    Categories: Category[]
    Assignments: Assignment[]

}

interface Category {
    Name: string
    NumberOfAssignment: number
    Mark: string
    PointsEarned: number
    PointsPossible: number
    Percent: number
}

interface Assignment {
    AssignmentNumber: number
    Description: string
    Type: string
    Category: string
    IsGraded: boolean
    IsExtraCredit: boolean
    IsScoreVisibleToParents: boolean
    IsScoreValueACheckMark: boolean
    NumberCorrect: number
    NumberPossible: number
    Mark: string
    Score: number
    MaxScore: number
    Percent: number
    DateAssigned: string
    DateDue: string
    DateCompleted: string
    RubricAssignment: boolean
    Comment: string
    AssignmentDescription: string
}

interface ClassSummary {
    SchoolCode: number
    SchoolName: string
    StudentID: number
    ShowPeriod: boolean
    HideScores: boolean
    ClassSummary: Period[]
}

interface Period {
    Period: number
    StartTime: string
    EndTime: string
    SectionNumber: number,
    GradeBookNumber: number,
    GradeBookName: string,
    DoingRubric: boolean,
    CourseNumber: string,
    CourseTitle: string,
    TeacherNumber: number,
    TeacherName: string,
    RoomNumber: string,
    CurrentMark: string,
    Percent: number,
    Average: string,
    MissingAssignment: number,
    Term: string
    TermCode: string
    LastUpdated: string
    Class?: Class
}


// type Student = {
//     studentid: number
//     name: string
//     classes: Class[]
// }

// type Class = {
//     period: number
//     gradebooknumber: number
//     termcode: string
//     classname: string
//     teachername: string
//     roomnumber: string
//     grade: string
//     gradepercent: number
//     missingassignments: number
//     gradebook: Category[]
// };

// type Category = {
//     name: string
//     numberofassignments: number
//     grade: string
//     pointsearned: number
//     pointspossible: number
//     assignments: Assignment[]
// }
//
// type Assignment = {
//     assignmentnumber: number
//     description: string
//     isgraded: boolean
//     score: number
//     maxscore: number
//     percentage: number
//     dropedit?: boolean
// }
