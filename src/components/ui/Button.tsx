import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & {
  variant?: "primary" | "ghost" | "cyan";
};

const variants = {
  primary: "bg-magenta text-on-accent border-ink shadow-[4px_4px_0_var(--ink)]",
  cyan: "bg-cyan text-on-accent border-ink shadow-[4px_4px_0_var(--ink)]",
  ghost: "bg-transparent text-ink border-ink shadow-[4px_4px_0_var(--magenta)]",
} as const;

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 px-6 py-2 text-base font-bold transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none";

/** Sticker-style link button. Use `ButtonEl` below for real <button>s. */
export function Button({ variant = "primary", className = "", ...rest }: Props) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}

export function ButtonEl({
  variant = "primary",
  className = "",
  ...rest
}: ComponentProps<"button"> & { variant?: Props["variant"] }) {
  return (
    <button
      type="button"
      className={`${base} ${variants[variant ?? "primary"]} ${className}`}
      {...rest}
    />
  );
}
