import { Footer } from "@/components/dashboard/Footer";
import { NavBar } from "@/components/dashboard/NavBar";

/**
 * A layout component for the dashboard.
 *
 * @param {Object} props
 * @prop {React.ReactNode} children - The content of the layout.
 * @returns {React.ReactElement} The layout component.
 */
export default function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <main>
      <NavBar/>
      {children}
      <Footer/>
    </main>
  );
}
