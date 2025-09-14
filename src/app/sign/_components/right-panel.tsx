import { Typewriter } from "@/components/fancy/text/typewriter";
import { MatrixText } from "@/components/kokonutui/matrix-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NeumorphButton } from "@/components/ui/neumorph";
import { Icon } from "@/lib/icons";
import { type IconName } from "@/lib/icons/types";
import { User } from "firebase/auth";
import {
  type ReactNode,
  type HTMLInputTypeAttribute,
  type ChangeEvent,
  useState,
  useCallback,
} from "react";
import { AuthedCard } from "./authed-card";
import { type VoidPromise } from "@/app/types";

interface HeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}
// your web presence online to match your unique style and preferences.

const Header = ({ title, description, children }: HeaderProps) => {
  return (
    <div className="flex flex-col items-start justify-center w-full space-y-4">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-900 font-figtree tracking-tighter">
          {title}
        </h2>
        <p className="text-zinc-500 dark:text-white mt-2 font-figtree font-light leading-5 max-w-[30ch] tracking-normal text-lg space-x-2">
          <span className=" text-xl tracking-tight font-semibold font-sans text-transparent bg-clip-text bg-gradient-to-r from-orange-950 via-cyan-700 to-sky-600 dark:from-teal-500 dark:via-sky-300 dark:to-orange-200">
            {children}
          </span>
          <span>{description}</span>
        </p>
      </div>
    </div>
  );
};

interface FormInputProps {
  id: string;
  type: HTMLInputTypeAttribute;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  children?: ReactNode;
  showPassword?: boolean;
  toggleInputVisibility?: VoidFunction;
}
const FormInput = ({
  id,
  children,
  name,
  type,
  onInputChange,
  value,
  showPassword = true,
  toggleInputVisibility,
}: FormInputProps) => {
  return (
    <div className="space-y-2 relative">
      <Label htmlFor={id}>{children}</Label>
      <Input
        id={id}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        name={name}
        value={value}
        onChange={onInputChange}
        className="h-12 px-4"
      />
      {id === "password" && type === "password" && (
        <Button
          size="icon"
          type="button"
          variant="ghost"
          onClick={toggleInputVisibility}
          className="absolute right-0 bottom-0 text-gray-400 hover:text-gray-600 dark:hover:text-foreground hover:bg-transparent dark:hover:bg-transparent"
        >
          <Icon name={showPassword ? "eye" : "eye-off"} className="size-5" />
        </Button>
      )}
    </div>
  );
};

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  return (
    <div className="space-y-6">
      <FormInput
        type="email"
        id="email"
        name="email"
        value={email}
        onInputChange={handleEmailChange}
      >
        <Typewriter
          text={["Your email address"]}
          speed={70}
          className=" opacity-100 font-doto font-bold text-transparent bg-clip-text bg-gradient-to-r dark:from-cyan-100 dark:to-sky-300 from-cyan-800 to-sky-900 tracking-wide text-pretty"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={"_"}
        />
      </FormInput>

      <FormInput
        type="password"
        showPassword={showPassword}
        toggleInputVisibility={togglePasswordVisibility}
        id="password"
        name="password"
        value={password}
        onInputChange={handlePasswordChange}
      >
        <MatrixText
          initialDelay={600}
          text="Your strong password"
          className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r dark:from-cyan-100 dark:to-sky-500 from-cyan-800 to-sky-900"
        />
      </FormInput>

      <NeumorphButton
        size="xl"
        type="submit"
        intent="default"
        className="rounded-full w-full h-12 bg-gray-900 hover:bg-sky-950 text-white font-medium"
      >
        <span className="tracking-tight text-lg">Create account</span>
      </NeumorphButton>
    </div>
  );
};

export interface SocialLogin {
  id: string;
  name: string;
  icon: IconName;
  fn: () => Promise<void>;
  disabled?: boolean;
}

interface SocialLoginProps {
  data: SocialLogin[];
}

const SocialLogins = ({ data }: SocialLoginProps) => {
  return (
    <div className="space-y-8">
      <div className="select-none relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-[0.33px] border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-zinc-500 text-gray-500 dark:text-zinc-50">
            or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {data.map(({ id, fn, icon, disabled = false }) => (
          <Button
            key={id}
            onClick={fn}
            variant="outline"
            disabled={disabled}
            className="h-14 dark:bg-zinc-200 border-gray-200 dark:hover:bg-zinc-100 hover:border-gray-300 dark:text-background/80"
          >
            <Icon name={icon} />
          </Button>
        ))}
      </div>
    </div>
  );
};

const SignInFooter = () => {
  return (
    <div className="select-none text-center">
      <p className="text-sm text-zinc-600 dark:text-zinc-300 space-x-3">
        <span>Already have an account?</span>
        <a
          href="#"
          className="text-sky-500 dark:text-sky-300 hover:underline underline-offset-2 hover:text-primary-hover font-semibold tracking-tight"
        >
          Sign in
        </a>
      </p>
    </div>
  );
};

interface RightPanelProps {
  socialLogins: SocialLogin[];
  user: User | null;
  signOut: VoidPromise;
}

export const RightPanel = ({
  socialLogins,
  user,
  signOut,
}: RightPanelProps) => {
  return (
    <div className="lg:w-1/2 p-12 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-10">
        <Header
          title={user ? "You're logged in as" : "Create an account"}
          description={
            user
              ? ""
              : "your web presence online to match your unique style and preferences"
          }
        >
          {user ? "" : "Personalize"}
        </Header>

        {user ? null : <SignInForm />}
        {user ? null : <SocialLogins data={socialLogins} />}
        {user ? null : <SignInFooter />}

        {user ? <AuthedCard user={user} signOut={signOut} /> : null}
      </div>
    </div>
  );
};
