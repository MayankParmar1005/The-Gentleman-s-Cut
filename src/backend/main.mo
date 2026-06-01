import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Time "mo:core/Time";

actor {
  // Data Types and Comparison Functions
  type Appointment = {
    id : Nat;
    customerName : Text;
    phone : Text;
    service : Text;
    preferredBarber : Text;
    appointmentTime : Time.Time;
    requester : Principal;
  };

  module Appointment {
    public func compare(a : Appointment, b : Appointment) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type Testimonial = {
    customerName : Text;
    rating : Nat;
    review : Text;
  };

  module Testimonial {
    public func compare(a : Testimonial, b : Testimonial) : Order.Order {
      Text.compare(a.customerName, b.customerName);
    };
  };

  type Service = {
    name : Text;
    price : Nat; // Price in dollars
  };

  module Service {
    public func compare(a : Service, b : Service) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  type Barber = {
    name : Text;
    experience : Nat; // Years of experience
    specialty : Text;
  };

  module Barber {
    public func compare(a : Barber, b : Barber) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  // Persistent Storage
  let appointments = Map.empty<Nat, Appointment>();

  // Static Data
  let services = [
    { name = "Haircut"; price = 25 },
    { name = "Beard Trim"; price = 15 },
    { name = "Haircut + Beard"; price = 35 },
    { name = "Kids Haircut"; price = 18 },
    { name = "Hair Styling"; price = 20 },
    { name = "Hair Wash"; price = 12 },
  ];

  let barbers = [
    {
      name = "John Smith";
      experience = 10;
      specialty = "Classic Cuts";
    },
    {
      name = "Maria Lopez";
      experience = 8;
      specialty = "Beard Grooming";
    },
    {
      name = "Alex Kim";
      experience = 12;
      specialty = "Modern Styles";
    },
    {
      name = "James Brown";
      experience = 15;
      specialty = "Children's Cuts";
    },
    {
      name = "Laura Garcia";
      experience = 9;
      specialty = "Coloring & Styling";
    },
  ];

  let testimonials = [
    {
      customerName = "Mike Johnson";
      rating = 5;
      review = "Best haircut I've ever had!";
    },
    {
      customerName = "Sarah Lee";
      rating = 4;
      review = "Great service and friendly staff.";
    },
    {
      customerName = "Tom Wilson";
      rating = 5;
      review = "Highly recommend the beard trim!";
    },
    {
      customerName = "Lisa Martinez";
      rating = 4;
      review = "My kids love the new haircuts.";
    },
    {
      customerName = "David Kim";
      rating = 5;
      review = "Excellent styling and wash.";
    },
  ];

  var nextAppointmentId = 1;

  // Core Functions

  // Book Appointment
  public shared ({ caller }) func bookAppointment(
    customerName : Text,
    phone : Text,
    service : Text,
    preferredBarber : Text,
    appointmentTime : Time.Time,
  ) : async Nat {
    if (customerName.size() == 0 or phone.size() == 0 or service.size() == 0) {
      Runtime.trap("Missing required fields");
    };

    let appointment : Appointment = {
      id = nextAppointmentId;
      customerName;
      phone;
      service;
      preferredBarber;
      appointmentTime;
      requester = caller;
    };

    appointments.add(nextAppointmentId, appointment);
    nextAppointmentId += 1;
    appointment.id;
  };

  // Get Appointment by ID
  public query func getAppointment(id : Nat) : async Appointment {
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) { appointment };
    };
  };

  // Get All Appointments
  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointments.values().toArray().sort();
  };

  // Get Static Data
  public query ({ caller }) func getServices() : async [Service] {
    services;
  };

  public query ({ caller }) func getBarbers() : async [Barber] {
    barbers;
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.sort();
  };

  // Filter Appointments by Barber
  public query ({ caller }) func getAppointmentsByBarber(barberName : Text) : async [Appointment] {
    appointments.values().filter(
      func(appointment) {
        appointment.preferredBarber == barberName;
      }
    ).toArray();
  };
};
