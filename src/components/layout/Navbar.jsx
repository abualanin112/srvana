// src/components/layout/navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

// Shadcn UI Components
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// React Icons (Lucide React)
import {
  FaHome,
  FaWrench,
  FaBox,
  FaInfoCircle,
  FaPhone,
  FaMoon,
  FaGlobe,
  FaUser,
  FaBars,
  FaSun,
} from "react-icons/fa";

// البيانات للروابط والأيقونات
const mainNavLinks = [
  { title: "الرئيسية", to: "/", icon: FaHome },
  { title: "المشاريع", to: "/projects", icon: FaBox },
  { title: "عن الشركة", to: "/about", icon: FaInfoCircle },
  { title: "اتصل بنا", to: "/contact", icon: FaPhone },
];

const servicesLinks = [
  {
    title: "صيانة أجهزة التكييف",
    to: "/services/ac-repair",
    description: "صيانة وتركيب جميع أنواع التكييفات.",
    icon: FaWrench,
  },
  {
    title: "صيانة كهرباء",
    to: "/services/electrical",
    description: "إصلاح الأعطال الكهربائية وتمديداتها.",
    icon: FaWrench,
  },
  {
    title: "صيانة سباكة",
    to: "/services/plumbing",
    description: "إصلاح تسربات المياه وتركيب الأدوات الصحية.",
    icon: FaWrench,
  },
  {
    title: "أخرى",
    to: "/services/other",
    description: "خدمات صيانة متنوعة.",
    icon: FaWrench,
  },
];

export function Navbar({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const LoginDialogContent = () => (
    <DialogContent className="sm:max-w-md p-0">
      <DialogHeader className="p-6 pb-4 text-right">
        <div className="flex justify-between items-start">
          <div>
            <DialogTitle className="text-2xl font-bold">
              تسجيل الدخول إلى حسابك
            </DialogTitle>
            <DialogDescription>
              أدخل بريدك الإلكتروني أدناه لتسجيل الدخول
            </DialogDescription>
          </div>
          <Button
            asChild
            variant="link"
            className="p-0 h-auto text-primary flex-shrink-0"
          >
            <Link to="/register">إنشاء حساب</Link>
          </Button>
        </div>
      </DialogHeader>

      {/* المحتوى الرئيسي للـ Dialog */}
      <div className="px-6 py-4">
        <form>
          <div className="grid gap-4">
            {/* حقل البريد الإلكتروني (Label فوق Input) */}
            <div className="grid gap-2 text-right">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            {/* حقل كلمة المرور (Label فوق Input) */}
            <div className="grid gap-2 text-right">
              <div className="flex items-center">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link
                  to="/forgot-password"
                  className="mr-auto inline-block text-sm text-primary hover:underline"
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </div>

      <DialogFooter className="flex-col gap-3 p-6 pt-4">
        {/* زر تسجيل الدخول الأساسي */}
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          تسجيل الدخول
        </Button>

        {/* الخط الفاصل */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">أو</span>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          تسجيل الدخول باستخدام جوجل
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-center">
        {/* الجزء الأيمن: الشعار واسم المشروع */}
        <div className="mr-4 flex items-center space-x-2 space-x-reverse">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <img
              src="/assets/images/logo.svg"
              alt="اسم المشروع"
              width={32}
              height={32}
              className="ml-2"
            />
            <span className="font-bold text-lg">اسم المشروع</span>
          </Link>
        </div>

        {/* الجزء الأوسط: الروابط الرئيسية وقائمة الخدمات (للسطح المكتبي) */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu dir="rtl">
            <NavigationMenuList>
              {mainNavLinks.map((link) => (
                <NavigationMenuItem key={link.to}>
                  {/* استخدام <Link> هنا أيضاً */}
                  <Link to={link.to} className={navigationMenuTriggerStyle()}>
                    <link.icon className="h-4 w-4 ml-2" />
                    {link.title}
                  </Link>
                </NavigationMenuItem>
              ))}

              {/* قائمة الخدمات المنسدلة */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <FaWrench className="h-4 w-4 ml-2" />
                  الخدمات
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {servicesLinks.map((service) => (
                      <ListItem
                        key={service.title}
                        title={service.title}
                        to={service.to}
                        icon={service.icon}
                      >
                        {service.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* الجزء الأيسر: أيقونات و زر (للسطح المكتبي) */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Dark Mode Toggle"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <FaSun className="h-5 w-5" />
            ) : (
              <FaMoon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Language Selector">
            <FaGlobe className="h-5 w-5" />
          </Button>
          {/*   Dialog  (سطح المكتب) */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="User Profile">
                <FaUser className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <LoginDialogContent />
          </Dialog>

          {/* استخدام <Link> لزر "انضم كفني" */}
          <Link to="/join-as-technician">
            <Button className="mr-4">انضم كفني</Button>
          </Link>
        </div>

        {/* قائمة الهامبرغر للشاشات الصغيرة */}
        <div className="md:hidden">
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <FaBars className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={24}
              className="w-[300px] overflow-scroll"
            >
              <DropdownMenuLabel>
                <Link to="/" className="flex items-center">
                  <img
                    src="/assets/images/logo.svg"
                    alt="اسم المشروع"
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                  <span className="font-bold text-lg">اسم المشروع</span>
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mainNavLinks.map((link) => (
                <DropdownMenuItem key={link.to} asChild>
                  {/* استخدام <Link> في قائمة الهامبرغر */}
                  <Link to={link.to} className="flex items-center py-2">
                    <link.icon className="h-4 w-4 ml-2" />
                    {link.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>الخدمات</DropdownMenuLabel>
              {servicesLinks.map((service) => (
                <DropdownMenuItem key={service.to} asChild>
                  {/* استخدام <Link> في قائمة الهامبرغر للخدمات */}
                  <Link to={service.to} className="flex items-center py-2">
                    <service.icon className="h-4 w-4 ml-2" />
                    {service.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/join-as-technician">
                  <Button className="w-full">انضم كفني</Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="flex justify-around p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Dark Mode Toggle"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <FaSun className="h-5 w-5" />
                  ) : (
                    <FaMoon className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Language Selector"
                >
                  <FaGlobe className="h-5 w-5" />
                </Button>
                {/* Dialog (نسخة الموبايل) */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="User Profile"
                    >
                      <FaUser className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <LoginDialogContent />
                </Dialog>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef(
  ({ title, children, icon: Icon, to, ...props }, ref) => {
    return (
      <li>
        <Link
          ref={ref}
          to={to}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {Icon && <Icon className="h-4 w-4 ml-2" />}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
