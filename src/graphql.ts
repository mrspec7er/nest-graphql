
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UpdateUserOrganizationInput {
    id: string;
    userId: string;
}

export class CreateOrganizationInput {
    name: string;
    userId: string;
}

export class CreateUserInput {
    name: string;
    username?: Nullable<string>;
    email: string;
    password: string;
}

export class GetUserProfile {
    email: string;
}

export class UpdateUserInput {
    id: string;
    name: string;
    username?: Nullable<string>;
    email: string;
    password: string;
}

export class Organization {
    id?: Nullable<string>;
    name: string;
    created: string;
    updated: string;
}

export abstract class IQuery {
    abstract organization(): Organization[] | Promise<Organization[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract getProfileUser(getUserProfile?: Nullable<GetUserProfile>): User | Promise<User>;
}

export abstract class IMutation {
    abstract createOrganization(createOrganizationInput: CreateOrganizationInput): Organization | Promise<Organization>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): Message | Promise<Message>;
}

export class User {
    id?: Nullable<string>;
    name: string;
    username?: Nullable<string>;
    email: string;
    password: string;
    organizations?: Nullable<string[]>;
}

export class Message {
    message: string;
}

type Nullable<T> = T | null;
