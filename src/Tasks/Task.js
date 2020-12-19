//Object to hold infromation and functions for tasks.
//not a component
export default class Task{
    //tasks must have:
    //String name
    //String description
    //optional variables
    //dueDate
    //setDate
    constructor(name,description){
        this.name=name;
        this.description=description;
        //due date does not include time(due at 00:00 of set day)
        this.dueDate=null;//type: Date
        //set date includes date and time
        this.setDate=null;//type: Date
    }
}