"use client";

import { motion } from "motion/react";
import { useAppNavigation } from "../hooks/useNavigation";
import { ProfileScreen } from "./app-screens/ProfileScreen";
import { ProfileDetailScreen } from "./app-screens/ProfileDetailScreen";
import { ChatScreen } from "./app-screens/ChatScreen";
import { ContactsScreen } from "./app-screens/ContactsScreen";
import { SettingsScreen } from "./app-screens/SettingsScreen";
import { AboutScreen } from "./app-screens/AboutScreen";

export const AppView = () => {
  const { currentScreen, nextScreen, prevScreen, goToProfileDetail, goBackToProfile, goToChat, goBackToProfileDetail } = useAppNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      case "profile":
        return <ProfileScreen onNext={nextScreen} onPrev={prevScreen} onViewProfile={goToProfileDetail} />;
      case "profile-detail":
        return <ProfileDetailScreen onNext={nextScreen} onPrev={prevScreen} onBack={goBackToProfile} onSendMessage={goToChat} />;
      case "chat":
        return <ChatScreen onNext={nextScreen} onPrev={prevScreen} onBack={goBackToProfileDetail} />;
      case "contacts":
        return <ContactsScreen onNext={nextScreen} onPrev={prevScreen} />;
      case "settings":
        return <SettingsScreen onNext={nextScreen} onPrev={prevScreen} />;
      case "about":
        return <AboutScreen onNext={nextScreen} onPrev={prevScreen} />;
      default:
        return <ProfileScreen onNext={nextScreen} onPrev={prevScreen} onViewProfile={goToProfileDetail} />;
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh)] lg:h-[600px] max-w-md shrink-0 aspect-auto lg:aspect-[9/16] lg:rounded-3xl bg-black shadow-xl overflow-hidden flex flex-col">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col h-full"
      >
        {renderScreen()}
      </motion.div>
    </div>
  );
};
