import React from "react";
import { Header } from "../components/ui/Header";
import { HeroSection } from "../components/sections/HeroSection";

export const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <HeroSection />
        </div>
    );
}