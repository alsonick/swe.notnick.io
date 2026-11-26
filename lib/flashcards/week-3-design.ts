import { Lecture } from "../../types/flashcard";

export const designPrinciples: Lecture = {
  slug: "design-principles",
  title: "Design Principles",
  week: 3,
  lecturer: "Sergey Ovchinnik",
  cards: [
    {
      front: "What is **database-first** design, and when does it suit?",
      back: "Design the data and database first, then build the app around it. It suits data-heavy apps like a student records system.",
    },
    {
      front: "What is **UI/UX-first** design, and when does it suit?",
      back: "Design the interface first and build the rest around it. It suits apps like a mobile game.",
    },
    {
      front: "What is **API-first** design, and when does it suit?",
      back: "Design and document the API before building it. It suits services others use programmatically, like a scraping tool.",
    },
    {
      front: "What should you design first?",
      back: "Whatever is most central to the application.",
    },
    {
      front: "What are OOP design patterns?",
      back: "Classic, reusable solutions to common object-oriented design problems.",
    },
    {
      front: "What are the three categories of design patterns?",
      back: "Creational (creating objects), structural (connecting objects), and behavioural (specific functionality).",
    },
    {
      front: "How do you implement a **Singleton**?",
      back: "Make the constructor private, keep one static instance, and expose it through a static `getInstance()` method.",
    },
    {
      front: "What problem does the **Builder** pattern solve?",
      back: "Huge, unreadable constructors, by setting each value with a named, chained method.",
    },
    {
      front: "How does a Builder enable method chaining?",
      back: "Each method sets a field and returns `this`.",
    },
    {
      front: "What is the **Connector** pattern?",
      back: "A class that connects two parts of the software, like the frontend and backend.",
    },
    {
      front: "What is the **Strategy** pattern?",
      back: "Passing functions around as objects so behaviour can be swapped.",
    },
    {
      front: "What is DRY?",
      back: "Don't Repeat Yourself: write a solution once and reuse it.",
    },
    {
      front: "What are KISS and YAGNI?",
      back: "KISS (Keep It Simple, Stupid) means avoid unnecessary complexity. YAGNI (You Aren't Gonna Need It) means don't build features you don't need.",
    },
    {
      front: "What is premature optimisation, and why avoid it?",
      back: "Making code as efficient as possible too early. Get it working first and optimise later.",
    },
    {
      front: "What is Occam's Razor as a design principle, and what's tricky about it?",
      back: "Keep everything as minimal as possible, though it can be hard to know what's truly unnecessary.",
    },
    {
      front: "What does S.O.L.I.D. stand for?",
      back: "Single-responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion.",
    },
    {
      front: "What is the **Single-responsibility principle**?",
      back: "A class should have only one job.",
    },
    {
      front: "What is the **Open-closed principle**?",
      back: "Code should be open for extension but closed for modification.",
    },
    {
      front: "What is the **Liskov substitution principle**?",
      back: "Anywhere a class is used, its subclasses should work too.",
    },
    {
      front: "What is the **Interface segregation principle**?",
      back: "Classes shouldn't be forced to depend on methods they don't use.",
    },
    {
      front: "What is the **Dependency inversion principle**?",
      back: "Depend on abstractions like interfaces, not concrete classes.",
    },
    {
      front: "What's the downside of OOP design patterns?",
      back: "They can bloat the codebase.",
    },
  ],
};
