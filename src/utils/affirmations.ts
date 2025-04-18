
// Collection of mindful affirmations
const affirmations = [
  "Let go of what no longer serves you.",
  "Accept what is, let go of what was.",
  "Be present in this moment.",
  "Find peace in surrender.",
  "Release attachment to outcomes.",
  "You are exactly where you need to be.",
  "Every release creates space for something new.",
  "Breathe in peace, release tension.",
  "Freedom comes from letting go.",
  "This moment is a gift. That's why it's called the present.",
  "Be still and know.",
  "Trust the unfolding of your life.",
  "Find joy in the journey, not just the destination.",
  "Let your light shine through the open spaces.",
  "All is well in this moment.",
];

export const getRandomAffirmation = (): string => {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  return affirmations[randomIndex];
};

// Check if user has released today
export const hasReleasedToday = (): boolean => {
  const lastRelease = localStorage.getItem('lastRelease');
  
  if (!lastRelease) return false;
  
  const lastReleaseDate = new Date(lastRelease);
  const today = new Date();
  
  return (
    lastReleaseDate.getDate() === today.getDate() &&
    lastReleaseDate.getMonth() === today.getMonth() &&
    lastReleaseDate.getFullYear() === today.getFullYear()
  );
};

// Store release timestamp
export const markReleasedToday = (): void => {
  localStorage.setItem('lastRelease', new Date().toISOString());
};
