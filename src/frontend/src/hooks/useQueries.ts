import { useMutation, useQuery } from "@tanstack/react-query";
import type { Barber, Service, Testimonial } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useGetServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBarbers() {
  const { actor, isFetching } = useActor();
  return useQuery<Barber[]>({
    queryKey: ["barbers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBarbers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookAppointment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      customerName,
      phone,
      service,
      preferredBarber,
      appointmentTime,
    }: {
      customerName: string;
      phone: string;
      service: string;
      preferredBarber: string;
      appointmentTime: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.bookAppointment(
        customerName,
        phone,
        service,
        preferredBarber,
        appointmentTime,
      );
    },
  });
}
