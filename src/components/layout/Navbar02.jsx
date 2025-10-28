import React, { useEffect, useState, useRef } from "react";
import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// import SrvanaLogo from "@/assets/logos/srvana-logo.svg";

// logo
import CustomLogo from "@/components/ui/CustomLogo";

import CircleThemeToggle from "@/components/ui/CircleThemeToggle";

// === Hamburger icon (SVG) ===
const HamburgerIcon = ({ className, ...props }) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// === Default navigation structure ===
const defaultNavigationLinks = [
  { to: "/", label: "الرئيسية" },
  {
    label: "خدمات سريعة",
    submenu: true,
    type: "description",
    items: [
      {
        to: "/components",
        label: "Components",
        description: "Browse all components in the library.",
      },
      {
        to: "/documentation",
        label: "Documentation",
        description: "Learn how to use the library.",
      },
      {
        to: "/templates",
        label: "Templates",
        description: "Pre-built layouts for common use cases.",
      },
    ],
  },
  {
    label: "خدمات مخصصة",
    submenu: true,
    type: "simple",
    items: [
      { to: "/product-a", label: "Product A" },
      { to: "/product-b", label: "Product B" },
      { to: "/product-c", label: "Product C" },
      { to: "/product-d", label: "Product D" },
    ],
  },
  {
    label: "عن الشركة",
    submenu: true,
    type: "icon",
    items: [
      {
        to: "/getting-started",
        label: "Getting Started",
        icon: "BookOpenIcon",
      },
      { to: "/tutorials", label: "Tutorials", icon: "LifeBuoyIcon" },
      { to: "/about-us", label: "About Us", icon: "InfoIcon" },
    ],
  },
  { to: "/contact", label: "اتصل بنا" },
];

// === Navbar main component (JSX) ===
export const Navbar02 = React.forwardRef(
  (
    {
      className,
      logo = null,
      logoHref = "/",
      navigationLinks = defaultNavigationLinks,
      signInText = "سجل دخولك / أنشئ حسابك ",
      signInHref = "/signin",
      ctaText = "انضم كفني",
      ctaHref = "/get-started",
      onSignInClick,
      onCtaClick,
      darkMode,
      setDarkMode,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };
      checkWidth();
      const ro = new ResizeObserver(checkWidth);
      if (containerRef.current) ro.observe(containerRef.current);
      return () => ro.disconnect();
    }, []);

    // combine refs
    const combinedRef = React.useCallback(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-30 w-full bg-white/30 backdrop-blur-lg supports-[backdrop-filter]:bg-white/30 px-4 md:px-6 [&_*]:no-underline",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={4}
                  side="right"
                  className="w-64 p-1 shadow-none border-none"
                >
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-0">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          {link.submenu ? (
                            <>
                              <div className="text-muted-foreground px-2 py-1.5 text-xs !font-bold">
                                {link.label}
                              </div>
                              <ul>
                                {link.items?.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <NavLink
                                      to={item.to || "#"}
                                      className="flex w-full items-center rounded-md px-3 py-2 text-md !font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                                    >
                                      {item.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <NavLink
                              to={link.to || "#"}
                              className="flex w-full items-center rounded-md px-3 py-2 text-md !font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                            >
                              {link.label}
                            </NavLink>
                          )}
                          {/* separator logic */}
                          {index < navigationLinks.length - 1 &&
                            ((!link.submenu &&
                              navigationLinks[index + 1].submenu) ||
                              (link.submenu &&
                                !navigationLinks[index + 1].submenu) ||
                              (link.submenu &&
                                navigationLinks[index + 1].submenu &&
                                link.type !==
                                  navigationLinks[index + 1].type)) && (
                              <div
                                role="separator"
                                aria-orientation="horizontal"
                                className="bg-border -mx-1 my-1 h-px w-full"
                              />
                            )}
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}

            {/* Main nav */}
            <div className="flex items-center gap-6 font-bold">
              <Link
                to={logoHref}
                className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
              >
                {logo ? (
                  <div className="select-none">{logo}</div>
                ) : (
                  <CustomLogo className="w-30 h-auto select-none text-[#0f2a71] dark:text-[#f5f6f8]" />
                )}
              </Link>

              {/* Desktop navigation */}
              {!isMobile && (
                <NavigationMenu className="flex bg-transparent">
                  <NavigationMenuList className="gap-1 bg-transparent">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        {link.submenu ? (
                          <>
                            <NavigationMenuTrigger>
                              {link.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-transparent shadow-none border-none">
                              {link.type === "description" &&
                              link.label === "خدمات سريعة" ? (
                                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                  <div className="row-span-3">
                                    <NavigationMenuLink asChild>
                                      <Link
                                        to="/"
                                        className="flex h-full w-full select-none flex-col justify-center items-center text-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                                      >
                                        <div className="mb-3 text-xl font-bold">
                                          shadcn.io
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                          Beautifully designed components built
                                          with Radix UI and Tailwind CSS.
                                        </p>
                                      </Link>
                                    </NavigationMenuLink>
                                  </div>

                                  {link.items?.map((item, itemIndex) => (
                                    <ListItem
                                      key={itemIndex}
                                      title={item.label}
                                      to={item.to}
                                      type={link.type}
                                    >
                                      {item.description}
                                    </ListItem>
                                  ))}
                                </div>
                              ) : link.type === "simple" ? (
                                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                  {link.items?.map((item, itemIndex) => (
                                    <ListItem
                                      key={itemIndex}
                                      title={item.label}
                                      to={item.to}
                                      type={link.type}
                                    >
                                      {item.description}
                                    </ListItem>
                                  ))}
                                </div>
                              ) : link.type === "icon" ? (
                                <div className="grid w-[400px] gap-3 p-4 ">
                                  {link.items?.map((item, itemIndex) => (
                                    <ListItem
                                      key={itemIndex}
                                      title={item.label}
                                      to={item.to}
                                      icon={item.icon}
                                      type={link.type}
                                    >
                                      {item.description}
                                    </ListItem>
                                  ))}
                                </div>
                              ) : (
                                <div className="grid gap-3 p-4">
                                  {link.items?.map((item, itemIndex) => (
                                    <ListItem
                                      key={itemIndex}
                                      title={item.label}
                                      to={item.to}
                                      type={link.type}
                                    >
                                      {item.description}
                                    </ListItem>
                                  ))}
                                </div>
                              )}
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink asChild>
                            <NavLink
                              to={link.to || "#"}
                              className={cn(
                                navigationMenuTriggerStyle(),
                                " font-bold cursor-pointer"
                              )}
                            >
                              {link.label}
                            </NavLink>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <NavLink to={signInHref}>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-bold hover:bg-accent hover:text-accent-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSignInClick) onSignInClick();
                }}
              >
                {signInText}
              </Button>
            </NavLink>

            <NavLink to={ctaHref} className="no-underline">
              <Button
                size="sm"
                className="text-sm font-bold px-4 h-9 rounded-md shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  if (onCtaClick) onCtaClick();
                }}
              >
                {ctaText}
              </Button>
            </NavLink>

            {/* Dark mode toggle على اليمين من زر تسجيل الدخول */}
            <CircleThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </header>
    );
  }
);

Navbar02.displayName = "Navbar02";

// === ListItem component ===
const ListItem = React.forwardRef(
  ({ className, title, children, icon, type, to = "#", ...props }, ref) => {
    const renderIconComponent = (iconName) => {
      if (!iconName) return null;
      switch (iconName) {
        case "BookOpenIcon":
          return <BookOpenIcon className="h-5 w-5" />;
        case "LifeBuoyIcon":
          return <LifeBuoyIcon className="h-5 w-5" />;
        case "InfoIcon":
          return <InfoIcon className="h-5 w-5" />;
        default:
          return null;
      }
    };

    return (
      <NavigationMenuLink asChild>
        <NavLink
          ref={ref}
          to={to}
          onClick={() => {}}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer ",
            className
          )}
          {...props}
        >
          {type === "icon" && icon ? (
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                {renderIconComponent(icon)}
              </div>
              <div className="space-y-1 text-right">
                <div className="text-base font-medium leading-tight ">
                  {title}
                </div>
                {children && (
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground ">
                    {children}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="text-base font-medium leading-none">{title}</div>
              {children && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
                </p>
              )}
            </>
          )}
        </NavLink>
      </NavigationMenuLink>
    );
  }
);
ListItem.displayName = "ListItem";

export { HamburgerIcon };
