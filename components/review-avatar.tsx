"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "@/components/site.module.css";

export function ReviewAvatar({
  name,
  initial,
  color,
  profilePhotoUrl,
}: {
  name: string;
  initial: string;
  color: string;
  profilePhotoUrl?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!profilePhotoUrl || imageFailed) {
    return (
      <div className={styles.avatar} style={{ background: color }} aria-label={`${name} avatar`}>
        {initial}
      </div>
    );
  }

  return (
    <Image
      src={profilePhotoUrl}
      alt={`${name} Google profile photo`}
      className={styles.avatarImage}
      width={40}
      height={40}
      unoptimized
      onError={() => setImageFailed(true)}
    />
  );
}
