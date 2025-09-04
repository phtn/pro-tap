import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";

interface ContactsScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const ContactsScreen = ({ onNext, onPrev }: ContactsScreenProps) => {
  const contacts = [
    { name: "Alice Johnson", role: "Designer", status: "online" },
    { name: "Bob Smith", role: "Developer", status: "away" },
    { name: "Carol Davis", role: "Manager", status: "offline" },
    { name: "David Wilson", role: "Analyst", status: "online" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={onPrev}
          className="rounded-full bg-white/20 text-white hover:bg-primary/20 hover:text-yellow-50"
        >
          <Icon
            name="chevron-right"
            className="size-6 aspect-square rotate-180"
          />
        </Button>
        <div className="text-white/60 text-sm">Contacts</div>
        <Button
          size="icon"
          variant="ghost"
          onClick={onNext}
          className="rounded-full bg-white/20 text-white/80 hover:bg-primary/20 hover:text-yellow-50"
        >
          <Icon name="chevron-right" className="size-6 aspect-square" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 bg-black text-white p-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold font-space tracking-tight mb-6">
            Contacts
          </h2>

          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-500/40 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-foreground text-xl font-medium font-space">
                      {contact.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-slate-300/80">{contact.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      contact.status === "online"
                        ? "bg-teal-500"
                        : contact.status === "away"
                          ? "bg-orange-300"
                          : "bg-gray-500"
                    }`}
                  />
                  <span className="text-xs text-gray-400 capitalize">
                    {contact.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};
