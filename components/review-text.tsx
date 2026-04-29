"use client";

import { useState } from "react";
import styles from "@/components/site.module.css";

const COLLAPSED_LIMIT = 220;

export function ReviewText({ body }: { body: string }) {
  const [expanded, setExpanded] = useState(false);
  const shouldClamp = body.length > COLLAPSED_LIMIT;

  return (
    <div>
      <p className={`${styles.reviewText} ${shouldClamp && !expanded ? styles.reviewTextClamped : ""}`}>
        &quot;{body}&quot;
      </p>
      {shouldClamp ? (
        <button type="button" className={styles.reviewReadMore} onClick={() => setExpanded((current) => !current)}>
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}
