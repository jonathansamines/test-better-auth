"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const options = [
  { id: "light" as const, label: "Light", icon: Sun },
  { id: "dark" as const, label: "Dark", icon: Moon },
  { id: "system" as const, label: "System", icon: Monitor },
];

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="fixed right-4 bottom-4 z-50 flex h-9 w-[6.75rem] rounded-lg border border-border/60 bg-card/90 shadow-lg ring-1 ring-foreground/5 backdrop-blur-md"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="fixed right-4 bottom-4 z-50 flex items-center gap-0.5 rounded-lg border border-border/60 bg-card/90 p-0.5 shadow-lg ring-1 ring-foreground/5 backdrop-blur-md dark:bg-card/80"
      role="group"
      aria-label="Theme"
    >
      {options.map(({ id, label, icon: Icon }) => {
        const active = theme === id;
        return (
          <Button
            key={id}
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-md text-muted-foreground",
              active && "bg-muted text-foreground shadow-sm",
            )}
            onClick={() => setTheme(id)}
            aria-label={label}
            aria-pressed={active}
            title={label}
          >
            <Icon className="size-3.5" aria-hidden />
          </Button>
        );
      })}
    </div>
  );
}
