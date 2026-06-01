import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    name: string;
    price: bigint;
}
export interface Barber {
    name: string;
    experience: bigint;
    specialty: string;
}
export type Time = bigint;
export interface Appointment {
    id: bigint;
    service: string;
    customerName: string;
    requester: Principal;
    preferredBarber: string;
    appointmentTime: Time;
    phone: string;
}
export interface Testimonial {
    customerName: string;
    review: string;
    rating: bigint;
}
export interface backendInterface {
    bookAppointment(customerName: string, phone: string, service: string, preferredBarber: string, appointmentTime: Time): Promise<bigint>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAppointment(id: bigint): Promise<Appointment>;
    getAppointmentsByBarber(barberName: string): Promise<Array<Appointment>>;
    getBarbers(): Promise<Array<Barber>>;
    getServices(): Promise<Array<Service>>;
    getTestimonials(): Promise<Array<Testimonial>>;
}
