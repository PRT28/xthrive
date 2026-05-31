"use client";

import Lottie from "lottie-react";
import animationData from "@/public/personal training.json";

export function PersonalTrainingLottie({ className }: { className?: string }) {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      className={className}
      aria-hidden="true"
    />
  );
}
