
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum OrganizationEvent {
    OrganizationCreated = "OrganizationCreated",
    OrganizationDeleted = "OrganizationDeleted",
    OrganizationMemberUpdated = "OrganizationMemberUpdated"
}

export enum ProjectEvent {
    ProjectCreated = "ProjectCreated",
    ProjectDeleted = "ProjectDeleted",
    ProjectMemberUpdated = "ProjectMemberUpdated"
}

export enum VendorEntities {
    VendorVenue = "VendorVenue",
    VendorEquipment = "VendorEquipment",
    VendorFood = "VendorFood"
}

export class LoginInput {
    email: string;
    password: string;
}

export class UpdateUserOrganizationInput {
    organizationId: string;
    userId: string;
}

export class CreateOrganizationInput {
    name: string;
}

export class UpdateOrganizationInput {
    name: string;
    id: string;
}

export class CreateProjectInput {
    organizationId: string;
    name: string;
    description?: Nullable<string>;
}

export class UpdateProjectInput {
    name: string;
    projectId: string;
    description?: Nullable<string>;
}

export class ProjectByIdInput {
    id?: Nullable<string>;
}

export class UpdateUserProjectInput {
    projectId: string;
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

export class CreateVenueInput {
    name: string;
    address: string;
    phone: string;
    isActive: boolean;
    venueAddress: string;
    venuePhone: string;
    venueCoordinator: string;
}

export class CreateEquipmentInput {
    name: string;
    address: string;
    phone: string;
    isActive: boolean;
    equipments?: Nullable<string[]>;
}

export class CreateFoodInput {
    name: string;
    address: string;
    phone: string;
    isActive: boolean;
    menu?: Nullable<string[]>;
}

export abstract class IMutation {
    abstract login(loginInput: LoginInput): Token | Promise<Token>;

    abstract createOrganization(createOrganizationInput: CreateOrganizationInput): Organization | Promise<Organization>;

    abstract updateOrganization(updateOrganizationInput: UpdateOrganizationInput): Organization | Promise<Organization>;

    abstract createProject(createProjectInput: CreateProjectInput): Project | Promise<Project>;

    abstract updateProject(updateProjectInput: UpdateProjectInput): Project | Promise<Project>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): Message | Promise<Message>;

    abstract createVenue(createVenueInput: CreateVenueInput): VendorVenue | Promise<VendorVenue>;

    abstract createFood(createFoodInput: CreateFoodInput): VendorFood | Promise<VendorFood>;

    abstract createEquipment(createEquipmentInput: CreateEquipmentInput): VendorEquipment | Promise<VendorEquipment>;
}

export class Token {
    access_token: string;
}

export abstract class IQuery {
    abstract organization(): Organization[] | Promise<Organization[]>;

    abstract myOrganization(): Organization[] | Promise<Organization[]>;

    abstract myProject(): Project[] | Promise<Project[]>;

    abstract projectById(id: string): Project | Promise<Project>;

    abstract projects(organizationId: string): Project[] | Promise<Project[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract getProfileUser(): User | Promise<User>;

    abstract venues(): VendorVenue[] | Promise<VendorVenue[]>;

    abstract foods(): VendorFood[] | Promise<VendorFood[]>;

    abstract equipments(): VendorEquipment[] | Promise<VendorEquipment[]>;

    abstract vendors(): Vendor[] | Promise<Vendor[]>;
}

export class Organization {
    id?: Nullable<string>;
    name: string;
    users?: Nullable<Nullable<OrganizationMember>[]>;
    projects?: Nullable<string[]>;
    createdAt: Date;
    updatedAt: Date;
}

export class OrganizationMember {
    id?: Nullable<string>;
    invitedAt?: Nullable<string>;
    role?: Nullable<string>;
}

export class Project {
    id?: Nullable<string>;
    organizationId: string;
    name: string;
    description?: Nullable<string>;
    users?: Nullable<Nullable<ProjectMember>[]>;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ProjectMember {
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
    projects?: Nullable<string[]>;
}

export class Message {
    message: string;
}

export class VendorVenue {
    id?: Nullable<string>;
    name: string;
    address?: Nullable<string>;
    phone: string;
    isActive: boolean;
    venueAddress: string;
    venuePhone: string;
    venueCoordinator: string;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class VendorEquipment {
    id?: Nullable<string>;
    name: string;
    address?: Nullable<string>;
    phone: string;
    isActive: boolean;
    equipments?: Nullable<string[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class VendorFood {
    id?: Nullable<string>;
    name: string;
    address?: Nullable<string>;
    phone: string;
    isActive: boolean;
    menu?: Nullable<string[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export type Vendor = VendorEquipment | VendorFood | VendorVenue;
type Nullable<T> = T | null;
