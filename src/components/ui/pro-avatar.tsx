import { useAuthCtx } from "@/ctx/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Icon } from "@/lib/icons";
import { ClassName } from "@/app/types";
import { cn } from "@/lib/utils";

interface Props {
  photoURL: string | null;
  className?: ClassName;
  tiny?: boolean;
}

export const ProAvatar = ({ photoURL, className, tiny = false }: Props) => {
  return photoURL ? (
    <Avatar
      className={cn(
        "flex items-center justify-center aspect-square size-12 shadow-2xs select-none",
        className,
      )}
    >
      <AvatarFallback className="bg-zinc-700">
        <Icon name="spinners-ring" className="size-6" />
      </AvatarFallback>
      <AvatarImage
        src={photoURL}
        className={cn(
          "aspect-auto border-0 border-white/40 dark:border-zinc-900 rounded-full",
          { "h-10 w-auto": tiny },
        )}
      ></AvatarImage>
    </Avatar>
  ) : (
    <Icon name="user-profile" />
  );
};
