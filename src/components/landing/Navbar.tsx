"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Badge,
  ButtonGroup,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/hooks/useTranslation";
import type { Locale } from "@/context/LocaleContext";

const MENU_KEYS = [
  { key: "nav.benefits", hash: "#beneficios" },
  { key: "nav.offer", hash: "#oferta" },
  { key: "nav.testimonials", hash: "#depoimentos" },
  { key: "nav.guarantee", hash: "#garantia" },
] as const;

function smoothScrollTo(hash: string) {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalCount, openCart } = useCart();
  const { t, locale, setLocale } = useTranslation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getHref = (hash: string) => (isHome ? hash : `/${hash}`);
  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    if (isHome) {
      e.preventDefault();
      smoothScrollTo(hash);
      setIsMenuOpen(false);
    }
  };

  return (
    <HeroNavbar
      maxWidth="xl"
      className={`sticky top-0 z-40 overflow-visible border-b transition-all duration-300 ${
        scrolled
          ? "border-sky-100/80 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white/80 backdrop-blur-sm"
      }`}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="min-w-0">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
          className="md:hidden"
        />
        <NavbarBrand as={Link} href="/" className="min-w-0 gap-2">
          <span className="truncate text-lg font-bold text-sky-600 sm:text-xl">Grupo Six</span>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden min-w-0 gap-4 md:flex lg:gap-6" justify="center">
        {MENU_KEYS.map((item) => (
          <NavbarItem key={item.hash} className="shrink-0">
            <Link
              href={getHref(item.hash)}
              className="whitespace-nowrap text-sm font-medium text-foreground/80 transition-colors hover:text-sky-600"
              onClick={(e) => handleNavClick(e, item.hash)}
            >
              {t(item.key)}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="min-w-0 shrink-0 gap-1 overflow-visible sm:gap-2">
        <NavbarItem className="hidden shrink-0 sm:flex">
          <ButtonGroup size="sm" variant="flat">
            <Button
              size="sm"
              variant={locale === "pt" ? "solid" : "flat"}
              color={locale === "pt" ? "primary" : "default"}
              onPress={() => setLocale("pt" as Locale)}
              className="min-w-9"
            >
              PT
            </Button>
            <Button
              size="sm"
              variant={locale === "en" ? "solid" : "flat"}
              color={locale === "en" ? "primary" : "default"}
              onPress={() => setLocale("en" as Locale)}
              className="min-w-9"
            >
              EN
            </Button>
          </ButtonGroup>
        </NavbarItem>
        <NavbarItem className="overflow-visible">
          <Button
            isIconOnly
            variant="light"
            aria-label={t("nav.cartWithCount", { count: totalCount })}
            className="relative min-w-9 shrink-0 overflow-visible sm:min-w-10"
            onPress={openCart}
          >
            <Badge
              content={totalCount}
              isInvisible={totalCount === 0}
              color="primary"
              size="sm"
            >
              <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </Badge>
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            href={getHref("#oferta")}
            color="primary"
            size="sm"
            className="min-w-0 shrink-0 whitespace-nowrap font-medium"
            onPress={() => {
              if (isHome) smoothScrollTo("#oferta");
              setIsMenuOpen(false);
            }}
          >
            {t("nav.buy")}
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="gap-2">
        <NavbarMenuItem className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-sm font-medium text-default-500">{t("nav.language")}</span>
          <ButtonGroup size="sm" variant="flat">
            <Button
              size="sm"
              variant={locale === "pt" ? "solid" : "flat"}
              color={locale === "pt" ? "primary" : "default"}
              onPress={() => setLocale("pt" as Locale)}
            >
              PT
            </Button>
            <Button
              size="sm"
              variant={locale === "en" ? "solid" : "flat"}
              color={locale === "en" ? "primary" : "default"}
              onPress={() => setLocale("en" as Locale)}
            >
              EN
            </Button>
          </ButtonGroup>
        </NavbarMenuItem>
        {MENU_KEYS.map((item) => (
          <NavbarMenuItem key={item.hash}>
            <Link
              href={getHref(item.hash)}
              className="w-full py-3 text-foreground"
              onClick={(e) => handleNavClick(e, item.hash)}
            >
              {t(item.key)}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <button
            type="button"
            className="flex w-full items-center gap-2 py-3 text-left"
            onClick={() => {
              setIsMenuOpen(false);
              openCart();
            }}
          >
            <ShoppingCartIcon className="h-5 w-5" />
            {t("nav.cart")} {totalCount > 0 ? `(${totalCount})` : ""}
          </button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            as={Link}
            href={getHref("#oferta")}
            color="primary"
            className="w-full font-medium"
            onPress={() => {
              if (isHome) smoothScrollTo("#oferta");
              setIsMenuOpen(false);
            }}
          >
            {t("nav.buy")}
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
}
