export type AnimalType = "dog" | "cat" | "other";
export type Status = "lost" | "found" | "adoption";
export type Gender = "male" | "female";

export type ReportItem = {
    id: number;
    name: string;
    photo: string;
    status: Status;
    location: string;
    date: Date;
    animalType: AnimalType;
    gender: Gender;
    age: number;
};

export type CardData = Omit<ReportItem, "id">;