export class Task {

    constructor(name, details, plannedDate, completedDate, people, stars, repeats, isCompleted = false) {
        this.name = name;
        this.details = details;
        this.plannedDate = plannedDate;
        this.completedDate = completedDate;
        this.people = people;
        this.stars = stars;
        this.repeats = repeats;
        this.isCompleted = isCompleted;
    }
    // constructor(name) {
    //     this.name = name;
    // }
}