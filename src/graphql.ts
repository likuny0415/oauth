
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateDogInput {
    age: number;
    name: string;
    toys: string;
}

export class Toy {
    name?: Nullable<string>;
}

export class Dog {
    id: number;
    age: number;
    name: string;
    toys?: Nullable<Nullable<Toy>[]>;
}

export abstract class IQuery {
    abstract dogs(): Nullable<Dog>[] | Promise<Nullable<Dog>[]>;

    abstract dog(id: number): Nullable<Dog> | Promise<Nullable<Dog>>;
}

export abstract class IMutation {
    abstract createToy(toy?: Nullable<string>): Nullable<Toy> | Promise<Nullable<Toy>>;

    abstract createDog(CreateDogInput?: Nullable<CreateDogInput>): Dog | Promise<Dog>;

    abstract removeDog(id: number): Nullable<Dog> | Promise<Nullable<Dog>>;
}

type Nullable<T> = T | null;
