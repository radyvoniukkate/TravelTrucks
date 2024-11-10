import React from "react";
import css from "./Reviews.module.css";

const Reviews = ({ camperData }) => {

    const FilledStar = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={css.starIcon}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_12164_420)">
          <path
            d="M7.55778 0.838169C7.74538 0.482595 8.25462 0.482596 8.44222 0.838169L10.3305 4.41705C10.4028 4.55417 10.5347 4.64997 10.6874 4.67641L14.6747 5.36629C15.0708 5.43484 15.2282 5.91915 14.948 6.20745L12.1277 9.10921C12.0197 9.22039 11.9693 9.3754 11.9914 9.52886L12.5674 13.5341C12.6246 13.932 12.2126 14.2314 11.8519 14.054L8.22062 12.2685C8.0815 12.2001 7.9185 12.2001 7.77938 12.2685L4.14815 14.054C3.78737 14.2314 3.37539 13.932 3.43262 13.5341L4.00861 9.52886C4.03068 9.3754 3.98031 9.22039 3.87226 9.10921L1.05204 6.20745C0.771841 5.91915 0.929206 5.43484 1.32535 5.36629L5.31256 4.67641C5.46533 4.64997 5.59719 4.55417 5.66954 4.41705L7.55778 0.838169Z"
            fill="#FFC531"
          />
        </g>
        <defs>
          <clipPath id="clip0_12164_420">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );

    const UnfilledStar = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="#F2F4F7"
        xmlns="http://www.w3.org/2000/svg"
        className={css.starIcon}
      >
        <path d="M7.55778 0.838169C7.74538 0.482595 8.25462 0.482596 8.44222 0.838169L10.3305 4.41705C10.4028 4.55417 10.5347 4.64997 10.6874 4.67641L14.6747 5.36629C15.0708 5.43484 15.2282 5.91915 14.948 6.20745L12.1277 9.10921C12.0197 9.22039 11.9693 9.3754 11.9914 9.52886L12.5674 13.5341C12.6246 13.932 12.2126 14.2314 11.8519 14.054L8.22062 12.2685C8.0815 12.2001 7.9185 12.2001 7.77938 12.2685L4.14815 14.054C3.78737 14.2314 3.37539 13.932 3.43262 13.5341L4.00861 9.52886C4.03068 9.3754 3.98031 9.22039 3.87226 9.10921L1.05204 6.20745C0.771841 5.91915 0.929206 5.43484 1.32535 5.36629L5.31256 4.67641C5.46533 4.64997 5.59719 4.55417 5.66954 4.41705L7.55778 0.838169Z" />
      </svg>
    );
  return (
    <div className={css.reviews}>
      {camperData.map((review, index) => (
        <div key={index} className={css.reviewItem}>
          <div className={css.reviewBlock}>
            <div className={css.avatar}>
              <span className={css.avatarInitial}>
                {review.reviewer_name.charAt(0)}
              </span>
            </div>
            <div className={css.reviewContent}>
              <div className={css.header}>
                <span className={css.name}>{review.reviewer_name}</span>
                <span className={css.rating}>
                  {Array.from({ length: 5 }, (_, i) =>
                    i < review.reviewer_rating ? (
                      <FilledStar key={i} />
                    ) : (
                      <UnfilledStar key={i} />
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
          <p className={css.text}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
