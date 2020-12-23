//an object that holds the information for a virtual task
//a virtual task is a task created as an instance of a repeating task
//a virtual task is not saved to cache

export default class VirtualTask {
    //virtual tasks must have:
    //String name
    //String Description
    //An ID of repeating a repeating task
    constructor(name, description, repeatingID) {
        this.name = name;
        this.description = description;
        this.repeatingID = repeatingID;
    }
}