import React from "react";

/**
 * SmallCaps — renders text in Century Gothic small caps style.
 * Each word: first letter at full size, remaining letters at 75% size uppercase.
 * Works regardless of whether the font has a native small-caps variant.
 */
export function SmallCaps({ children, className = "" }: { children: string | React.ReactNode; className?: string }) {
  // If children is not a plain string (e.g. a variable), render uppercase only
  if (typeof children !== "string") {
    return <span className={className} style={{textTransform:"uppercase", letterSpacing:"0.08em"}}>{children}</span>;
  }
  const words = children.split(" ");
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} style={{whiteSpace:"nowrap"}}>
          {wi > 0 && " "}
          <span style={{ fontSize: "1em" }}>{word[0]}</span>
          <span style={{ fontSize: "0.75em", letterSpacing: "0.06em" }}>
            {word.slice(1).toUpperCase()}
          </span>
        </span>
      ))}
    </span>
  );
}
