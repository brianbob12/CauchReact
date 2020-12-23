//object that holds a real task.
//A real task is a task that is saved to cache.
export default class RealTask {
    //every RealTask must have:
    //Int id
    //String name
    //String description
    //optional variables
    //dueDate
    //setDate
    constructor(name, description, id) {
        this.name = name;
        this.description = description;
        this.id = id;
    }
}