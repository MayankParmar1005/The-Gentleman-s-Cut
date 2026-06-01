import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import AboutPage from "./pages/AboutPage";
import BarbersPage from "./pages/BarbersPage";
import BookPage from "./pages/BookPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";

// Page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Root layout
function RootLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </div>
      <Footer />
      <FloatingWhatsApp />
      <Toaster />
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <PageWrapper>
      <HomePage />
    </PageWrapper>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <PageWrapper>
      <AboutPage />
    </PageWrapper>
  ),
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => (
    <PageWrapper>
      <ServicesPage />
    </PageWrapper>
  ),
});

const barbersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/barbers",
  component: () => (
    <PageWrapper>
      <BarbersPage />
    </PageWrapper>
  ),
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: () => (
    <PageWrapper>
      <GalleryPage />
    </PageWrapper>
  ),
});

const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  component: () => (
    <PageWrapper>
      <BookPage />
    </PageWrapper>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <PageWrapper>
      <ContactPage />
    </PageWrapper>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  servicesRoute,
  barbersRoute,
  galleryRoute,
  bookRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
