import type { User } from "@/lib/playground/types";

/** Initials avatar — colored disc with the user's initials. */
export function Avatar({
  user,
  size = 36,
  ring,
}: {
  user: Pick<User, "initials" | "color">;
  size?: number;
  ring?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: user.color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: Math.round(size * 0.36),
        lineHeight: 1,
        flex: "0 0 auto",
        boxShadow: ring ? `0 0 0 2px ${ring}` : undefined,
        userSelect: "none",
      }}
    >
      {user.initials}
    </div>
  );
}
