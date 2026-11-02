"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import NextLink from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Label,
  Separator,
} from "@heroui/react";
import {
  MdClose,
  MdMenu,
  MdOutlineAddCircleOutline,
  MdOutlineCalendarMonth,
  MdOutlineCamera,
  MdOutlineDarkMode,
  MdOutlineKeyboardArrowDown,
  MdOutlineLightMode,
  MdOutlineListAlt,
  MdOutlineLogout,
  MdOutlineNotifications,
  MdPerson,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { authClient, signOut, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/explore-studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about-us" },
];

const accountLinks = [
  { label: "Dashboard", href: "/dashboard", Icon: MdOutlineSpaceDashboard },
  { label: "Add New Studio", href: "/add-new-studio", Icon: MdOutlineAddCircleOutline },
  { label: "My Studio Listings", href: "/my-studio-listings", Icon: MdOutlineListAlt },
  { label: "My Bookings", href: "/my-bookings", Icon: MdOutlineCalendarMonth },
];

const roundBtn =
  "rounded-full border border-separator bg-default text-muted hover:text-foreground dark:border-transparent";


const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(subscribe, () => true, () => false);


  


 



      const Navbar = ()=> {
    
        const { data: session, isPending, refetch } = useSession();
        console.log(session?.user, "user status from navbar");

       

  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = mounted && resolvedTheme === "dark";

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);




const handleLogout = async () => {
  const { error } = await authClient.signOut();

  if (error) {
    toast.error("Logout failed.");
    return;
  }

  toast.success("Logged out successfully.");
  refetch()
  router.refresh()
};

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-separator bg-background/85 backdrop-blur-xl dark:border-transparent dark:shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <header className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6">
    
        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            variant="ghost"
            className="lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onPress={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <MdClose className="size-6" /> : <MdMenu className="size-6" />}
          </Button>

          <NextLink href="/" className="group flex items-center gap-2">
            <span className="relative flex size-10 items-center justify-center rounded-full border border-separator bg-default dark:border-transparent dark:shadow-[0_0_20px_rgba(200,243,34,0.3)]">
              <MdOutlineCamera className="relative size-[22px] text-success transition-transform duration-300 group-hover:rotate-45" />
              <span className="pointer-events-none absolute inset-0 rounded-full bg-accent/20 blur-md" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight text-foreground">
                Studio<span className="text-success">Space</span>
              </span>
              <span className="mt-1 font-label text-[11px] font-semibold uppercase tracking-widest text-muted">
                Creative Atelier
              </span>
            </span>
          </NextLink>
        </div>

      
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <NextLink
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 font-label text-sm transition-colors ${
                    active
                      ? "font-bold text-accent after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-accent dark:after:shadow-[0_0_8px_var(--accent)]"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </NextLink>
              </li>
            );
          })}
        </ul>


    <div className="flex items-center gap-2 sm:gap-3">
 
  <Button
    isIconOnly
    variant="secondary"
    className={roundBtn}
    aria-label="Toggle theme"
    onPress={() => setTheme(isDark ? "light" : "dark")}
  >
    {isDark ? (
      <MdOutlineLightMode className="size-5" />
    ) : (
      <MdOutlineDarkMode className="size-5" />
    )}
  </Button>

  
  {isPending ? (
    <div className="h-10 w-44 animate-pulse rounded-full bg-default" />
  ) : session?.user ? (
    <>
   
      

      <Dropdown>
        <Button
          variant="secondary"
          aria-label="Account menu"
          className={`${roundBtn} h-10 w-auto gap-2 pl-1 pr-3`}
        >
          <Avatar size="sm" className="size-8">
            <Avatar.Fallback className="bg-[#24452e] text-white dark:bg-white dark:text-[#293500]">
              <MdPerson className="size-[18px]" />
            </Avatar.Fallback>
          </Avatar>

          <span className="hidden font-label text-sm font-medium sm:inline">
            {session.user.name}
          </span>

          <MdOutlineKeyboardArrowDown className="size-[18px] text-muted" />
        </Button>

        <Dropdown.Popover className="min-w-64">
          <div className="px-3 pb-1 pt-3">
            <p className="text-sm font-bold leading-5">{session.user.name}</p>
            <p className="text-xs text-muted">
              Filmmaker &amp; Producer
            </p>
          </div>

          <Dropdown.Menu
          
           onAction={(key) => {
    if (key === "logout") {
      handleLogout();
      return;
    }

    router.push(String(key));
  }}
          
          >
            {accountLinks.map(({ label, href, Icon }) => (
              <Dropdown.Item key={href} id={href} textValue={label}>
                <Icon className="size-[18px] text-muted" />
                <Label>{label}</Label>
              </Dropdown.Item>
            ))}

            <Separator />

            <Dropdown.Item id="logout" textValue="Logout" variant="danger">
              <MdOutlineLogout className="size-[18px] text-danger" />
              
              <Label>
            
            logout
</Label>
            </Dropdown.Item>
          </Dropdown.Menu>


        </Dropdown.Popover>
      </Dropdown>
    </>
  ) : (
    <>
      
      <Button
        variant="secondary"
        className="hidden h-10 rounded-full border border-separator bg-surface px-6 font-label font-semibold text-foreground sm:inline-flex"
        onPress={() => router.push("/login")}
      >
        Login
      </Button>

      <Button
        className="h-10 rounded-full bg-accent px-6 font-label font-semibold text-accent-foreground"
        onPress={() => router.push("/register")}
      >
        Register
      </Button>
    </>
  )}
</div>


            






      </header>

  
      {menuOpen && (
        <div className="border-t border-separator bg-background lg:hidden">
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <NextLink
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2 text-base ${
                      active
                        ? "bg-default font-semibold text-accent"
                        : "text-foreground hover:bg-default"
                    }`}
                  >
                    {label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;