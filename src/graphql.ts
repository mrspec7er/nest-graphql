
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginInput {
    email: string;
    password: string;
}

export class UpdateUserOrganizationInput {
    id: string;
    userId: string;
}

export class CreateOrganizationInput {
    name: string;
}

export class UpdateOrganizationInput {
    name: string;
    id: string;
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

export abstract class IMutation {
    abstract login(loginInput: LoginInput): Token | Promise<Token>;

    abstract createOrganization(createOrganizationInput: CreateOrganizationInput): Organization | Promise<Organization>;

    abstract updateOrganization(updateOrganizationInput: UpdateOrganizationInput): Organization | Promise<Organization>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): Message | Promise<Message>;
}

export class Token {
    access_token: string;
}

export abstract class IQuery {
    abstract organization(): Organization[] | Promise<Organization[]>;

    abstract myOrganization(): Organization[] | Promise<Organization[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract getProfileUser(): User | Promise<User>;
}

export class Organization {
    id?: Nullable<string>;
    name: string;
    users?: Nullable<Nullable<OrganizationMember>[]>;
    created: string;
    updated: string;
}

export class OrganizationMember {
    id?: Nullable<string>;
    invitedAt?: Nullable<string>;
    role?: Nullable<string>;
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
