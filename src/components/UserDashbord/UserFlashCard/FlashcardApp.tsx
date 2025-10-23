import React, { useState } from "react";
import { FlashcardDashboard } from "./FlashcardDashboard";
import FlashcardReviewSession from "./FlashcardReviewSession";

// Define a type for a more detailed topic structure (since we need cards)
export interface TopicData {
  title: string;
  cards: { word: string; translation: string }[];
}

type AppView = "dashboard" | "review";

// Enhanced Topic Data (static for this example)
const ALL_TOPICS: TopicData[] = [
  {
    title: "Basic Vocabulary",
    cards: [
      { word: "Ciao", translation: "Hello / Bye" },
      { word: "Grazie", translation: "Thank you" },
      { word: "Per favore", translation: "Please" },
      { word: "Sì", translation: "Yes" },
      { word: "No", translation: "No" },
      { word: "Acqua", translation: "Water" },
      { word: "Vino", translation: "Wine" },
    ],
  },
  {
    title: "Travel Phrases",
    cards: [
      { word: "Dov'è...?", translation: "Where is...?" },
      { word: "Il conto, per favore", translation: "The bill, please" },
      { word: "Aiuto!", translation: "Help!" },
      { word: "Un biglietto per Roma", translation: "A ticket to Rome" },
      { word: "Quanto costa?", translation: "How much does it cost?" },
    ],
  },
  {
    title: "Verbs Conjugation",
    cards: [
      { word: "Io parlo", translation: "I speak" },
      { word: "Tu mangi", translation: "You eat" },
      { word: "Lui/Lei dorme", translation: "He/She sleeps" },
      { word: "Noi andiamo", translation: "We go" },
      { word: "Voi bevete", translation: "You all drink" },
      { word: "Essere", translation: "To be" },
      { word: "Avere", translation: "To have" },
    ],
  },
  {
    title: "Food & Dining",
    cards: [
      { word: "Pane", translation: "Bread" },
      { word: "Formaggio", translation: "Cheese" },
      { word: "Frutta", translation: "Fruit" },
      { word: "Pesce", translation: "Fish" },
      { word: "Carne", translation: "Meat" },
      { word: "Colazione", translation: "Breakfast" },
      { word: "Cena", translation: "Dinner" },
    ],
  },
  {
    title: "Family & Relationships",
    cards: [
      { word: "Madre", translation: "Mother" },
      { word: "Padre", translation: "Father" },
      { word: "Fratello", translation: "Brother" },
      { word: "Sorella", translation: "Sister" },
      { word: "Amico", translation: "Friend (male)" },
      { word: "Amica", translation: "Friend (female)" },
    ],
  },
  {
    title: "Numbers & Time",
    cards: [
      { word: "Uno", translation: "One" },
      { word: "Due", translation: "Two" },
      { word: "Tre", translation: "Three" },
      { word: "Quattro", translation: "Four" },
      { word: "Cinque", translation: "Five" },
      { word: "Oggi", translation: "Today" },
      { word: "Domani", translation: "Tomorrow" },
    ],
  },
  {
    title: "Weather & Nature",
    cards: [
      { word: "Sole", translation: "Sun" },
      { word: "Pioggia", translation: "Rain" },
      { word: "Neve", translation: "Snow" },
      { word: "Vento", translation: "Wind" },
      { word: "Caldo", translation: "Hot" },
      { word: "Freddo", translation: "Cold" },
      { word: "Nuvola", translation: "Cloud" },
    ],
  },
  {
    title: "Daily Routine",
    cards: [
      { word: "Sveglia", translation: "Alarm / Wake-up" },
      { word: "Lavoro", translation: "Work" },
      { word: "Studio", translation: "Study" },
      { word: "Pranzo", translation: "Lunch" },
      { word: "Riposo", translation: "Rest" },
      { word: "Dormire", translation: "To sleep" },
    ],
  },
  {
    title: "Shopping & Money",
    cards: [
      { word: "Negozio", translation: "Shop / Store" },
      { word: "Prezzo", translation: "Price" },
      { word: "Sconto", translation: "Discount" },
      { word: "Contanti", translation: "Cash" },
      { word: "Carta di credito", translation: "Credit card" },
      { word: "Ricevuta", translation: "Receipt" },
      { word: "Comprare", translation: "To buy" },
    ],
  },
  {
    title: "Health & Emergencies",
    cards: [
      { word: "Dottore", translation: "Doctor" },
      { word: "Ospedale", translation: "Hospital" },
      { word: "Malato", translation: "Sick" },
      { word: "Farmacia", translation: "Pharmacy" },
      { word: "Medicinale", translation: "Medicine" },
      { word: "Dolore", translation: "Pain" },
      { word: "Emergenza", translation: "Emergency" },
    ],
  },
];


export const FlashcardApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>("dashboard");
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // 1. Updated handler to select topic and switch to review view
  const handleStartPractice = (topicTitle: string) => {
    const topic = ALL_TOPICS.find((t) => t.title === topicTitle);
    if (topic) {
      setSelectedTopic(topic);
      setCurrentCardIndex(0); // Start from the first card
      setCurrentView("review");
    }
  };

  const handleContinue = () => {
    alert("Exercise complete! Returning to Dashboard.");
    setSelectedTopic(null);
    setCurrentView("dashboard");
  };

  // 2. Navigation handlers for the flashcard review session
  const goToNextCard = () => {
    if (selectedTopic && currentCardIndex < selectedTopic.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (selectedTopic) {
      // Logic for session end/looping can go here
      alert("End of topic cards! Returning to Dashboard.");
      handleContinue();
    }
  };

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  // 3. Pass topic and card data/handlers to the Review Session
  return (
    <div className="min-h-screen  ">
      {currentView === "dashboard" ? (
        <FlashcardDashboard
          onStartPractice={handleStartPractice}
          topics={ALL_TOPICS.map((t) => t.title)} // Pass only titles to Dashboard
        />
      ) : selectedTopic ? (
        <FlashcardReviewSession
          topic={selectedTopic}
          cardIndex={currentCardIndex}
          onContinue={handleContinue}
          goToNextCard={goToNextCard}
          goToPreviousCard={goToPreviousCard}
        />
      ) : (
        <FlashcardDashboard
          onStartPractice={handleStartPractice}
          topics={ALL_TOPICS.map((t) => t.title)}
        />
      )}
    </div>
  );
};

export default FlashcardApp;







 