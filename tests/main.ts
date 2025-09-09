import * as path from "path";
import { Person } from "./person";
import { PersonRepository } from "./person-repository";

// Define the file paths
const inputPath = path.join(__dirname, "data", "people.json");
const outputPath = path.join(__dirname, "data", "people.output.json");
const tmpPath = path.join(__dirname, "data", "peopleAfter.output.json");

//Main test function
const repository = new PersonRepository(inputPath, outputPath);

//Load the people from JSON
const people = repository.loadPeople();
if (people.length === 0) {
  console.log("No people loaded. Please check your input file.");
} else {
  console.log(`Loaded ${people.length} people from ${inputPath}`);
}

console.log("");

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
const mymy = updatedPeople.find((p) => p.getName() === "MyMy");
if (mymy) {
  console.log(
    `New person ${mymy.getName()} was added to output file successfully.`
  );
} else {
  console.log(`New person MyMy was NOT found in the output file.`);
}
console.log("");

//Check hasSameCity method
const john = people.find((p) => p.getName() === "John Doe");
const jane = people.find((p) => p.getName() === "Jane Smith");
if (john && jane) {
  if (john.hasSameCity(jane)) {
    console.log("John Doe and Jane Smith live in the same city.");
  } else {
    console.log("John Doe and Jane Smith live in different cities.");
  }
} else {
  console.log("John Doe or Jane Smith not found in the list.");
}
console.log("");

//Update city for Jane Smith and check again
if (john && mymy) {
  mymy.updateCity(john.getCity());
  console.log(`MyMy has moved to ${mymy.getCity()}.`);
  if (mymy.hasSameCity(john)) {
    console.log("Now MyMy and John Doe live in the same city.");
  } else {
    console.log("MyMy and John Doe live in different cities.");
  }
} else {
  console.log("John Doe or MyMy not found in the list.");
}
console.log("");
