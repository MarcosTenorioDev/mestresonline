import { Link } from "react-router-dom";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <section className="flex flex-col sm:flex-row justify-between items-center">
          <h3 className="">
            &copy; {new Date().getFullYear()} Desenvolvido por
            <Link
              target="_blank"
              to="https://github.com/marcostenoriodev"
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >
              Marcos Tenorio
            </Link>
          </h3>
          <h2 className="text-sm text-muted-foreground">Mestres_Online 1.0.0</h2>
        </section>
      </div>
    </footer>
  );
};