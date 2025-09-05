import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/lib/icons";
import { CreditCard } from "./nfc-card";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-primary">Aimm.</h1>
          <div className="hidden md:flex items-center gap-6">
            <button className="text-foreground hover:text-primary transition-colors">
              Design system
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Illustration
            </button>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-border hover:bg-card bg-transparent"
        >
          Sign up
        </Button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Work faster with <span className="text-primary">Aimm.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                The new UI design system powering the world's best user
                experiences
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Get the app
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-foreground hover:bg-card"
              >
                <Icon name="chevron-right" className="mr-2" />
                Video intro
              </Button>
            </div>
          </div>

          {/* Right Content - 3D Character Placeholder */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              {/* Main character illustration placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-card to-muted rounded-full flex items-center justify-center">
                <CreditCard
                  className="bg-protap-blue"
                  cardNumber="4532 1234 5678 9012"
                  cardHolder="XPRIORI"
                  expiryDate="12/28"
                  cvv="123"
                  variant="visa"
                />
              </div>

              {/* Floating UI elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-lg backdrop-blur-sm border border-primary/30"></div>
              <div className="absolute top-1/4 -left-8 w-12 h-12 bg-secondary/20 rounded-full backdrop-blur-sm border border-secondary/30"></div>
              <div className="absolute bottom-1/4 -right-8 w-20 h-12 bg-card rounded-lg backdrop-blur-sm border border-border shadow-lg"></div>
              <div className="absolute -bottom-4 left-1/4 w-14 h-14 bg-accent/20 rounded-lg backdrop-blur-sm border border-accent/30"></div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-primary rounded-sm"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Prebuilt templates
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Drag-n-drop the prebuilt templates into your design and finish
                  it in minutes
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-secondary rounded-full"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Exclusive resources
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  There are hundreds of design resources we made exclusively for
                  you. Subscribe now!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
