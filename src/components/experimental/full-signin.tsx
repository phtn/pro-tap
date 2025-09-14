"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon, type IconName } from "@/lib/icons";
import { NeumorphButton } from "../ui/neumorph";
import { useAuthCtx } from "@/ctx/auth";
import Prism from "../react-bits/prism";
import { MatrixText } from "../kokonutui/matrix-text";
import { Typewriter } from "../fancy/text/typewriter";
import { TextTrain } from "../ui/text-train";

interface SocialLogin {
  id: string;
  name: string;
  icon: IconName;
  fn: () => Promise<void>;
}

export function FullSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const { signInWithGoogle, signInWithGithub } = useAuthCtx();

  const handleGoogle = async () => {
    try {
      setLoading("google");
      await signInWithGoogle();
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const handleGithub = async () => {
    try {
      setLoading("github");
      await signInWithGithub();
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const social_logins = useMemo(
    () =>
      [
        {
          id: "google",
          name: "Google",
          icon: "google",
          fn: handleGoogle,
        },
        {
          id: "github",
          name: "GitHub",
          icon: "github",
          fn: handleGithub,
        },
        {
          id: "apple",
          name: "Apple",
          icon: "apple",
          fn: handleGoogle,
        },
      ] as Array<SocialLogin>,
    [],
  );

  return (
    <div className="w-full flex items-center justify-center font-figtree">
      <div className="bg-white dark:bg-zinc-500  w-full rounded-4xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[70lvh]">
          {/* Left Panel - Gradient Background */}

          <div className="relative lg:w-1/2 overflow-hidden bg-gradient-to-br from-orange-200/0 via-amber-50/0 to-cyan-100/0 flex flex-col justify-between">
            <div className="absolute size-full">
              <Prism
                animationType="rotate"
                timeScale={0.2}
                height={4.8}
                baseWidth={5.0}
                scale={3.6}
                hueShift={0.1}
                colorFrequency={1}
                noise={0.1}
                glow={1}
              />
            </div>
            <div className="p-12 relative z-50">
              {/* Brand Logo */}
              <div className="flex items-center gap-2 text-white">
                <Icon name="zap" className="w-6 h-6 text-black" />
                <span className="text-xl font-semibold text-black">Protap</span>
              </div>

              {/* Main Content */}
              <div className="flex flex-col space-y-4">
                <p className="text-lg opacity-90">You can easily</p>
                <div className="pt-20 space-y-3 flex flex-col justify-center">
                  <div className="block w-full">
                    <TextTrain
                      words={[
                        "Level up",
                        "Grow your",
                        "Break thru your",
                        "Start building",
                        "Make the world",
                        "Become famous",
                        "It's your turn",
                      ]}
                      className="text-sky-950 font-extrabold text-6xl whitespace-nowrap"
                    />
                  </div>
                  <div>
                    <TextTrain
                      delay={50}
                      words={[
                        "your Web Presence.",
                        "Professional Network.",
                        "current Revenue limits.",
                        "your Brand the right way.",
                        "listen to your Masterpiece.",
                        "Become an Inspiration.",
                        "for Status Upgrade.",
                      ]}
                      className="text-sky-950 text-4xl font-medium max-w-[20ch] tracking-tighter"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative gradient overlay */}
              {/*<div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />*/}
            </div>
          </div>
          {/* Right Panel - Signup Form */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full space-y-10">
              {/* Header */}
              <div className="flex flex-col items-start justify-center w-full space-y-4">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-gray-900 font-figtree tracking-tighter">
                    Create an account
                  </h2>
                  <p className="text-zinc-500 dark:text-white mt-2 font-figtree leading-5 max-w-[30ch] tracking-tight text-lg">
                    <strong>Personalize</strong> your web presence online to
                    match your unique style and preferences.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Typewriter
                      text={["Your email address"]}
                      speed={70}
                      className=" opacity-100 font-doto font-bold text-transparent bg-clip-text bg-gradient-to-r dark:from-cyan-100 dark:to-sky-300 from-cyan-800 to-sky-900 tracking-wide text-pretty"
                      waitTime={1500}
                      deleteSpeed={40}
                      cursorChar={"_"}
                    />
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="h-12 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    <MatrixText
                      initialDelay={600}
                      text="Your strong password"
                      className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r dark:from-cyan-100 dark:to-sky-500 from-cyan-800 to-sky-900"
                    />
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      className="h-12 px-4 pr-12"
                    />
                    <Button
                      size="icon"
                      type="button"
                      variant="ghost"
                      onClick={togglePasswordVisibility}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-transparent"
                    >
                      <Icon
                        name={showPassword ? "eye" : "eye-off"}
                        className="w-5 h-5"
                      />
                    </Button>
                  </div>
                </div>

                <NeumorphButton
                  size="xl"
                  intent="default"
                  className="rounded-full w-full h-12 bg-gray-900 hover:bg-sky-950 text-white font-medium"
                >
                  <span className="tracking-tight text-lg">Create account</span>
                </NeumorphButton>
              </div>

              {/* Social Login */}
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

                <div className="grid grid-cols-3 gap-3">
                  {social_logins.map(({ id, fn, icon }) => (
                    <Button
                      key={id}
                      onClick={fn}
                      variant="outline"
                      className="h-14 dark:bg-zinc-200 border-gray-200 dark:hover:bg-zinc-100 hover:border-gray-300 dark:text-background/80"
                    >
                      <Icon name={icon} />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="select-none text-center">
                <p className="text-sm text-zinc-600 dark:text-zinc-800 space-x-3">
                  <span>Already have an account?</span>
                  <a
                    href="#"
                    className="text-sky-500 dark:text-sky-100 hover:underline underline-offset-2 hover:text-primary-hover font-semibold tracking-tight"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
