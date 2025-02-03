export class CoursesResult{
    constructor(
        public courseId: number,
        public courseName: string,
        public credits: number,
        public teacherId: number,
        public teacherName: string,
        public studentsByCourse: number
    ){}
}