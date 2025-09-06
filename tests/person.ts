export class Person {
  private name: string;
  private age: number;
  private city: string;

  constructor(name: string, age: number, city: string) {
    if (!name || name.trim() === "") {
      throw new Error("Name cannot be empty.");
    }
    if (age <= 0) {
      throw new Error("Age must be a positive number.");
    }

    this.name = name;
    this.age = age;
    this.city = city;
  }

  // Getters for private properties
  public getName(): string {
    return this.name;
  }

  public getAge(): number {
    return this.age;
  }

  public getCity(): string {
    return this.city;
  }

  greet(): string {
    return `Hi, I'm ${this.name} from ${this.city}.`;
  }

  celebrateBirthday(): void {
    this.age = this.age + 1;
  }

  updateCity(newCity: string): void {
    this.city = newCity;
  }

  isAdult(): boolean {
    return (this.age >= 18);
  }

  hasSameCity(other: Person): boolean {
    return this.city == other.city;
  }
  
  public toJSON(): object {
    return {
      name: this.name,
      age: this.age,
      city: this.city,
    };
  }

  static fromJSON(data: any): Person {
        if (!data || typeof data.name !== 'string' || typeof data.age !== 'number' || typeof data.city !== 'string') {
      throw new Error('Invalid data format for creating a Person instance.');
    }
    return new Person(data.name, data.age, data.city);
  }
}