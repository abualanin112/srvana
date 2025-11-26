import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
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
import {
  ReaderIcon,
  InfoCircledIcon,
  QuestionMarkCircledIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import CustomLogo from "@/components/ui/CustomLogo";
import CircleThemeToggle from "@/components/ui/CircleThemeToggle";

// === Default navigation links ===
const defaultNavigationLinks = [
  {
    label: "الخدمات",
    submenu: true,
    type: "icon",
    items: [
      {
        label: "دليل الخدمات",
        to: "/services",
        icon: "ReaderIcon",
      },
      {
        label: "من نحن",
        to: "/about",
        icon: "InfoCircledIcon",
      },
      {
        label: "الدعم",
        to: "/support",
        icon: "QuestionMarkCircledIcon",
      },
    ],
  },
  {
    label: "المدونة",
    to: "/blog",
  },
  {
    label: "تواصل معنا",
    to: "/contact",
  },
];

// === ListItem component ===
const ListItem = React.forwardRef(
  ({ title, children, icon, to = "#", type }, ref) => {
    const renderIcon = (name) => {
      switch (name) {
        case "ReaderIcon":
          return <ReaderIcon className="h-5 w-5" />;
        case "QuestionMarkCircledIcon":
          return <QuestionMarkCircledIcon className="h-5 w-5" />;
        case "InfoCircledIcon":
          return <InfoCircledIcon className="h-5 w-5" />;
        default:
          return null;
      }
    };

    return (
      <NavigationMenuLink asChild>
        <NavLink
          ref={ref}
          to={to}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            "text-right"
          )}
        >
          {type === "icon" && icon ? (
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                {renderIcon(icon)}
              </div>
              <div className="space-y-1">
                <div className="text-base font-medium">{title}</div>
                {children && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {children}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-base font-medium">{title}</div>
              {children && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {children}
                </p>
              )}
            </div>
          )}
        </NavLink>
      </NavigationMenuLink>
    );
  }
);
ListItem.displayName = "ListItem";

// === MobileMenu component ===
const MobileMenu = ({ navigationLinks }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="group h-9 w-9"
          variant="ghost"
          size="icon"
          aria-label="فتح القائمة"
        >
          <HamburgerMenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        side="right"
        className="w-64 p-1"
      >
        <nav aria-label="القائمة">
          <ul className="flex flex-col">
            {navigationLinks.map((link, idx) => (
              <li key={idx} className="w-full">
                {link.submenu ? (
                  <div>
                    <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground">
                      {link.label}
                    </div>
                    <ul>
                      {link.items?.map((item, i) => (
                        <li key={i}>
                          <NavLink
                            to={item.to || "#"}
                            className="block w-full px-3 py-2 rounded-md font-bold hover:bg-accent hover:text-accent-foreground"
                          >
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <NavLink
                    to={link.to || "#"}
                    className="block w-full px-3 py-2 rounded-md font-bold hover:bg-accent hover:text-accent-foreground"
                  >
                    {link.label}
                  </NavLink>
                )}

                {idx < navigationLinks.length - 1 && (
                  <div className="bg-border my-2 h-px w-full -mx-1" />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
};

// === DesktopMenu component ===
const DesktopMenu = ({ navigationLinks }) => {
  return (
    <NavigationMenu className="bg-transparent">
      <NavigationMenuList className="flex items-center gap-1">
        {navigationLinks.map((link, idx) => (
          <NavigationMenuItem key={idx}>
            {link.submenu ? (
              <>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-transparent shadow-none border-none p-0">
                  {link.type === "description" ? (
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/"
                            className="flex h-full w-full select-none flex-col justify-center items-center text-center rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline"
                          >
                            <div className="mb-3 text-xl font-bold">سرفانا</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              منصتك الموثوقة للخدمات المنزلية
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>

                      {link.items?.map((item, i) => (
                        <ListItem
                          key={i}
                          title={item.label}
                          to={item.to}
                          type={link.type}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </div>
                  ) : link.type === "simple" ? (
                    <div className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      {link.items?.map((item, i) => (
                        <ListItem
                          key={i}
                          title={item.label}
                          to={item.to}
                          type={link.type}
                        />
                      ))}
                    </div>
                  ) : link.type === "icon" ? (
                    <div className="grid w-[400px] gap-3 p-4">
                      {link.items?.map((item, i) => (
                        <ListItem
                          key={i}
                          title={item.label}
                          to={item.to}
                          icon={item.icon}
                          type={link.type}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-3 p-4">
                      {link.items?.map((item, i) => (
                        <ListItem
                          key={i}
                          title={item.label}
                          to={item.to}
                          type={link.type}
                        />
                      ))}
                    </div>
                  )}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <NavLink
                  to={link.to || "#"}
                  className={cn(navigationMenuTriggerStyle(), "font-bold")}
                >
                  {link.label}
                </NavLink>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// === Main Navbar component ===
export const Navbar02 = React.forwardRef(
  (
    {
      className,
      logo = null,
      logoHref = "/",
      navigationLinks = defaultNavigationLinks,
      signInText = "سجل دخولك / أنشئ حسابك",
      signInHref = "/login",
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
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const check = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.offsetWidth;
        setIsMobile(width < 768);
      };
      check();
      const ro = new ResizeObserver(check);
      if (containerRef.current) ro.observe(containerRef.current);
      return () => ro.disconnect();
    }, []);

    const combinedRef = useCallback(
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
          "sticky top-0 z-30 w-full bg-white/30 backdrop-blur-lg supports-[backdrop-filter]:bg-white/30 px-4 md:px-6",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {isMobile && <MobileMenu navigationLinks={navigationLinks} />}

            <div className="flex items-center gap-2 font-bold">
              <Link
                to={logoHref}
                className="flex items-center gap-2 text-primary hover:text-primary/90 no-underline"
              >
                {logo ? (
                  <div className="select-none">{logo}</div>
                ) : (
                  <CustomLogo className="w-30 h-auto select-none text-[#0f2a71] dark:text-[#f5f6f8]" />
                )}
              </Link>

              {!isMobile && <DesktopMenu navigationLinks={navigationLinks} />}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NavLink to={signInHref} className="no-underline">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-bold hover:bg-accent hover:text-accent-foreground"
                onClick={(e) => {
                  if (onSignInClick) onSignInClick(e);
                }}
              >
                {signInText}
              </Button>
            </NavLink>

            <NavLink
              to={ctaHref}
              className="no-underline"
              onClick={(e) => e.preventDefault()}
            >
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

            <CircleThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </header>
    );
  }
);

Navbar02.displayName = "Navbar02";

export default Navbar02;
