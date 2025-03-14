import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, X } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 max-w-4xl w-[90%] rounded-2xl",
        {
          "py-4 bg-background/30 backdrop-blur-md": !isScrolled,
          "py-3 bg-background/60 backdrop-blur-md border border-white/10 shadow-lg": isScrolled,
        }
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-medium text-foreground tracking-tight z-50 flex items-center"
        >
          <span className="text-primary font-bold mr-1">A</span>gency
          <span className="text-primary">.</span>
        </Link>

        {/* Desktop Menu - Using NavigationMenu for better styling */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10",
                    isActive("/") && "text-primary font-medium"
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className="bg-transparent hover:bg-primary/10"
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 w-[400px] gap-3 p-4 glass-panel">
                  {[
                    { name: "Web Development", description: "Create modern, responsive websites" },
                    { name: "Branding", description: "Build your unique brand identity" },
                    { name: "Marketing", description: "Boost your online presence" },
                    { name: "SEO", description: "Rank higher in search results" }
                  ].map((service) => (
                    <a
                      key={service.name}
                      href="#services"
                      className="block p-3 hover:bg-primary/10 rounded-md transition-colors"
                    >
                      <h3 className="text-sm font-medium text-foreground">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">{service.description}</p>
                    </a>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <a href="#about">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10"
                  )}
                >
                  About
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10",
                    isActive("/contact") && "text-primary font-medium"
                  )}
                >
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Call to Action Button - Always visible */}
        <Link 
          to="/contact" 
          className="hidden md:flex items-center gap-1 bg-primary/90 hover:bg-primary text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-primary/20"
        >
          Get Started <ArrowRight size={16} />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 p-2" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-foreground transition-all" />
          ) : (
            <Menu size={24} className="text-foreground transition-all" />
          )}
        </button>
        
        {/* Mobile Menu Overlay - Enhanced with glassmorphism */}
        <div 
          className={cn(
            "fixed inset-0 bg-background/90 backdrop-blur-lg z-40 flex flex-col justify-center items-center space-y-8 transition-all duration-300",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="glass-panel p-8 rounded-xl flex flex-col items-center space-y-6">
            <Link 
              to="/" 
              className={cn(
                "text-2xl transition-colors",
                isActive("/") ? "text-primary" : "text-foreground hover:text-primary"
              )}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <a 
              href="#services" 
              className="text-2xl text-foreground hover:text-primary transition-colors" 
              onClick={toggleMobileMenu}
            >
              Services
            </a>
            <a 
              href="#about" 
              className="text-2xl text-foreground hover:text-primary transition-colors" 
              onClick={toggleMobileMenu}
            >
              About
            </a>
            <Link 
              to="/contact" 
              className={cn(
                "text-2xl transition-colors",
                isActive("/contact") ? "text-primary" : "text-foreground hover:text-primary"
              )}
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <Link 
              to="/contact" 
              className="btn-primary flex items-center gap-1 mt-4"
              onClick={toggleMobileMenu}
            >
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
