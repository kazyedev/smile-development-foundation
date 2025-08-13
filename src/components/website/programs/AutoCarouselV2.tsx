"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselItem = {
  image: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  buttonTextEn: string;
  buttonTextAr: string;
  buttonHrefEn: string;
  buttonHrefAr: string;
};

export default function AutoCarouselV2({
  items,
  locale = "en",
  interval = 4500,
}: {
  items: CarouselItem[];
  locale?: "en" | "ar";
  interval?: number;
}) {
  const isEn = locale === "en";
  const [current, setCurrent] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const count = items.length;
  const hasTri = count >= 3;

  const prevIndex = (current - 1 + count) % count;
  const nextIndex = (current + 1) % count;

  // Autoplay
  useEffect(() => {
    if (!hasTri || isHover) return;
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % count),
      interval
    );
    return () => clearInterval(id);
  }, [hasTri, isHover, count, interval]);

  // Responsive detection
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!hasTri) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {items.map((it, idx) => (
            <CardView key={idx} item={it} locale={locale} emphasis="center" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden px-6"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Arrows */}
      {!isMobile && (
        <>
          <button
            type="button"
            onClick={() => setCurrent((c) => (c - 1 + count) % count)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full border bg-background shadow hover:bg-accent"
            aria-label={isEn ? "Previous" : "السابق"}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrent((c) => (c + 1) % count)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full border bg-background shadow hover:bg-accent"
            aria-label={isEn ? "Next" : "التالي"}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Mobile single-card */}
      {isMobile ? (
        <MobileCard
          key={current}
          item={items[current]}
          onPrev={() => setCurrent(prevIndex)}
          onNext={() => setCurrent(nextIndex)}
          locale={locale}
        />
      ) : (
        <div className="flex items-stretch justify-center gap-4">
          {/* Prev */}
          <motion.div
            key={`prev-${prevIndex}`}
            className="flex-[0_0_20%] overflow-hidden rounded-xl"
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{ opacity: 0.7, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <SideCard
              item={items[prevIndex]}
              locale={locale}
              direction="left"
            />
          </motion.div>

          {/* Current */}
          <motion.div
            key={`curr-${current}`}
            className="flex-[0_0_60%] overflow-hidden rounded-xl"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CenterCard item={items[current]} locale={locale} />
          </motion.div>

          {/* Next */}
          <motion.div
            key={`next-${nextIndex}`}
            className="flex-[0_0_20%] overflow-hidden rounded-xl"
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{ opacity: 0.7, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <SideCard
              item={items[nextIndex]}
              locale={locale}
              direction="right"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

function CardView({
  item,
  locale,
  emphasis = "center" as "left" | "center" | "right",
}: {
  item: CarouselItem;
  locale: "en" | "ar";
  emphasis?: "left" | "center" | "right";
}) {
  const isEn = locale === "en";
  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        emphasis !== "center" ? "opacity-80" : ""
      }`}
    >
      <div className="relative w-full h-40 md:h-48 bg-black">
        <Image
          src={item.image}
          alt={isEn ? item.titleEn : item.titleAr}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <p className="font-semibold line-clamp-2">
          {isEn ? item.titleEn : item.titleAr}
        </p>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {isEn ? item.descriptionEn : item.descriptionAr}
        </p>
        <div className="mt-3">
          <Link
            href={isEn ? item.buttonHrefEn : item.buttonHrefAr}
            className="inline-block px-3 py-2 rounded-md border hover:bg-accent"
          >
            {isEn ? item.buttonTextEn : item.buttonTextAr}
          </Link>
        </div>
      </div>
    </div>
  );
}

function SideCard({
  item,
  locale,
  direction,
}: {
  item: CarouselItem;
  locale: "en" | "ar";
  direction: "left" | "right";
}) {
  const isEn = locale === "en";
  return (
    <div className="relative h-full">
      <div className="relative w-full h-40 md:h-56">
        <Image
          src={item.image}
          alt={isEn ? item.titleEn : item.titleAr}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold line-clamp-1">
          {isEn ? item.titleEn : item.titleAr}
        </p>
      </div>
    </div>
  );
}

function CenterCard({ item, locale }: { item: CarouselItem; locale: "en" | "ar" }) {
  const isEn = locale === "en";
  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="relative w-full h-56 md:h-72">
        <Image
          src={item.image}
          alt={isEn ? item.titleEn : item.titleAr}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <p className="text-lg md:text-xl font-bold">
          {isEn ? item.titleEn : item.titleAr}
        </p>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          {isEn ? item.descriptionEn : item.descriptionAr}
        </p>
        <div className="mt-4">
          <Link
            href={isEn ? item.buttonHrefEn : item.buttonHrefAr}
            className="inline-block px-4 py-2 rounded-md border hover:bg-accent"
          >
            {isEn ? item.buttonTextEn : item.buttonTextAr}
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileCard({
  item,
  onPrev,
  onNext,
  locale,
}: {
  item: CarouselItem;
  onPrev: () => void;
  onNext: () => void;
  locale: "en" | "ar";
}) {
  const isEn = locale === "en";
  return (
    <div className="relative">
      <div className="rounded-xl border overflow-hidden">
        <div className="relative w-full h-64">
          <Image
            src={item.image}
            alt={isEn ? item.titleEn : item.titleAr}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <p className="text-lg font-bold">
            {isEn ? item.titleEn : item.titleAr}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {isEn ? item.descriptionEn : item.descriptionAr}
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              href={isEn ? item.buttonHrefEn : item.buttonHrefAr}
              className="inline-block px-4 py-2 rounded-md border hover:bg-accent"
            >
              {isEn ? item.buttonTextEn : item.buttonTextAr}
            </Link>
          </div>
        </div>
      </div>
      <div className={`absolute bottom-2 ${isEn ? "right-2" : "left-2"} flex gap-2`}>
        <button
          aria-label={isEn ? "Next" : "التالي"}
          onClick={onNext}
          className="w-9 h-9 rounded-md border bg-background shadow flex items-center justify-center hover:bg-accent"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          aria-label={isEn ? "Previous" : "السابق"}
          onClick={onPrev}
          className="w-9 h-9 rounded-md border bg-background shadow flex items-center justify-center hover:bg-accent hover:scale-105 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
