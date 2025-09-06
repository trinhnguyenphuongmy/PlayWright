import { PersonRepository } from "./person-repository";
import { Person } from "./person";
import * as path from "path";
import { test, expect } from "@playwright/test";

// Define the file paths
const inputPath = path.join(__dirname, "data", "people.json");
const outputPath = path.join(__dirname, "data", "people.output.json");
const tmpPath = path.join(__dirname, "data", "peopleAfter.output.json");

test("should load, add, and save people", () => {
  const repository = new PersonRepository(inputPath, outputPath);

  //Load the people from JSON
  const people = repository.loadPeople();
  expect(people.length).toBeGreaterThan(0);

  //Add a new person
  people.push(new Person("MyMy", 16, "HCM City"));

  //Call celebrateBirthday() on each person
  people.forEach((person) => person.celebrateBirthday());

  //Print each person's info:
  people.forEach((person) => {
    console.log(person.greet());
    console.log(`I'm ${person.getAge()} years old.`);
    if (person.isAdult()) {
      console.log("I'm an adult.");
    } else {
      console.log("I'm not an adult.");
    }
    console.log("");
  });

  //Save the updated list to people.output.json
  repository.savePeople(people);

  //Reload and check if the new person was saved
  const updatedRepository = new PersonRepository(outputPath, tmpPath);
  const updatedPeople = updatedRepository.loadPeople();
  expect(updatedPeople.some((p) => p.getName() === "MyMy")).toBeTruthy();

  //Check hasSameCity method
  const john = people.find((p) => p.getName() === "John Doe");
  const jane = people.find((p) => p.getName() === "Jane Smith");
  if (john && jane) {
    console.log(
      "Do John Doe and Jane Smith live in the same city?",
      john.hasSameCity(jane)
    );
  } else {
    console.log("John Doe or Jane Smith not found in the list.");
  }
});
