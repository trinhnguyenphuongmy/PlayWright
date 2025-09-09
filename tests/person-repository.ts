import * as fs from "fs";
import * as path from "path";
import { Person } from "./person";

export class PersonRepository {
  private filePath: string;
  private outputFilePath: string;

  constructor(filePath: string, outputFilePath: string) {
    this.filePath = filePath;
    this.outputFilePath = outputFilePath;
  }

  loadPeople(): Person[] {
    //Load people from data/people.json
    try {
      if (!fs.existsSync(this.filePath)) {
        console.error(`File not found at path: ${this.filePath}`);
        return [];
      }

      const fileContent = fs.readFileSync(this.filePath, "utf-8");
      const data: any[] = JSON.parse(fileContent);

      // Validate that the loaded data is an array
      if (!Array.isArray(data)) {
        console.error("JSON data is not an array.");
        return [];
      }

      //Map them to Person instances using Person.fromJSON
      return data.map((item) => Person.fromJSON(item));
    } catch (error: any) {
      console.error("Error loading people:", error.message);
      return []; // Return an empty array on error
    }
  }

  //Save people to data/people.output.json
  savePeople(people: Person[]): void {
    try {
      const dataToSave = people.map((person) => person.toJSON());
      const jsonString = JSON.stringify(dataToSave, null, 2);
      fs.writeFileSync(this.outputFilePath, jsonString, "utf-8");
      console.log(
        `Successfully saved ${people.length} people to ${this.outputFilePath}`
      );
      console.log("");
    } catch (error: any) {
      console.error("Error saving people:", error.message);
    }
  }
}
