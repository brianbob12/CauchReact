//object that holds a real task.
//A real task is a task that is saved to cache.
export default class RealTask extends Task{
    //every RealTask must have:
    //Int id
    constructor(name,description,id){
       super(name,description)
       this.id=id; 
    }
}