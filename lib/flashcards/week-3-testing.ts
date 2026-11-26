import { Lecture } from "../../types/flashcard";

export const testing: Lecture = {
  slug: "testing",
  title: "Re-introduction to Testing",
  week: 3,
  lecturer: "George Ramzi",
  cards: [
    {
      front: "Give some reasons we write tests beyond “finding bugs”.",
      back: "Tests document how code should work, catch regressions, run automatically on every change, and help teams trust each other's (and AI's) changes.",
    },
    {
      front: "What are the four levels of the testing pyramid, bottom to top?",
      back: "Unit, integration, system, then acceptance. Tests get broader and slower towards the top.",
    },
    {
      front: "What are acceptance tests?",
      back: "Tests that check the software meets the business requirements, usually a user story's acceptance criteria.",
    },
    {
      front: "What is the Given/When/Then format used for?",
      back: "Writing acceptance test scenarios in plain English.",
    },
    {
      front: "What are system tests?",
      back: "End-to-end tests of the whole system, usually run in a staging or QA environment.",
    },
    {
      front: "Acceptance tests vs system tests?",
      back: "Acceptance tests check the product meets the owner's goals. System tests check the whole product works correctly.",
    },
    {
      front: "What are integration tests?",
      back: "Tests that check components work together, like an app and its database or API.",
    },
    {
      front: "Why do we need integration tests if every unit is tested?",
      back: "Units that work alone can still break when combined.",
    },
    {
      front: "What should integration tests use instead of production systems?",
      back: "Throwaway test databases and test doubles for expensive external services.",
    },
    {
      front: "What makes a good unit test?",
      back: "It tests one behaviour and is fast, independent and deterministic.",
    },
    {
      front: "How do unit tests make changes safer?",
      back: "If the tests still pass after a change, the behaviour hasn't broken.",
    },
    {
      front: "In what order do tests run as code moves to production?",
      back: "Unit, integration, system, then acceptance, before deploying.",
    },
    {
      front: "What do `@Test`, `@BeforeEach` and `@DisplayName` do in JUnit?",
      back: "`@Test` marks a test, `@BeforeEach` runs setup before every test, and `@DisplayName` gives it a readable name.",
    },
    {
      front: "In `assertEquals`, which argument comes first?",
      back: "The expected value: `assertEquals(expected, actual)`.",
    },
    {
      front: "What do `assertThrows`, `assertDoesNotThrow` and `assertAll` check?",
      back: "That an exception is thrown, that none is thrown, and that a group of assertions all pass (reporting every failure).",
    },
    {
      front: "`@BeforeAll` / `@AfterAll` vs `@BeforeEach` / `@AfterEach`?",
      back: "The All versions run once for the whole class and must be static. The Each versions run around every test.",
    },
    {
      front: "What does `@ParameterizedTest` with `@CsvSource` do?",
      back: "Runs the same test once per row of input values.",
    },
  ],
};

export const tdd: Lecture = {
  slug: "test-doubles-coverage-tdd",
  title: "Test Doubles, Coverage & TDD",
  week: 3,
  lecturer: "George Ramzi",
  cards: [
    {
      front: "What is a test double?",
      back: "A stand-in for a real dependency, so the test controls how it behaves.",
    },
    {
      front: "What is a **stub**? When do you use one?",
      back: "A double that returns fixed answers. Use it when you need a dependency (like an API or the clock) to give a specific result.",
    },
    {
      front: "What is a **fake**? When do you use one?",
      back: "A simple working version of the real thing, like an in-memory map instead of a database.",
    },
    {
      front: "What is a **mock**? When do you use one?",
      back: "A double that records calls so you can verify them. Use it when the thing you're testing is a call, like sending an email.",
    },
    {
      front: "What is a **spy**? When do you use one?",
      back: "A wrapper around a real object that keeps its behaviour but records every call.",
    },
    {
      front: "Mock vs spy?",
      back: "A mock does nothing but record calls. A spy also runs the real code.",
    },
    {
      front: "What is Mockito?",
      back: "A Java library for creating mocks and spies, with `mock()`, `spy()` and `verify()`.",
    },
    {
      front: "When should you replace a real dependency with a test double?",
      back: "Only when the real one is slow, costs money, or isn't under your control.",
    },
    {
      front: "What is code coverage?",
      back: "The share of your code that runs during the tests.",
    },
    {
      front: "Why doesn't 100% line coverage mean code is well tested?",
      back: "Coverage only shows what ran, not whether anything was checked.",
    },
    {
      front: "Line coverage vs branch coverage?",
      back: "Line coverage asks if each line ran. Branch coverage asks if every decision went both ways.",
    },
    {
      front: "How do you decide which values to test?",
      back: "Split the inputs into equivalence classes and test the boundaries of each.",
    },
    {
      front: "What are the three steps of TDD?",
      back: "Red: write a failing test. Green: write the minimum code to pass it. Refactor: tidy up while keeping the tests green.",
    },
    {
      front: "In TDD, why is `return true;` an acceptable first implementation of `isLeap`?",
      back: "It's the minimum code that passes the only test so far.",
    },
    {
      front: "What is **triangulation** in TDD?",
      back: "Adding another test that forces the code to become a real general rule.",
    },
    {
      front: "What's the final refactored leap year rule from the TDD example?",
      back: "Centuries are leap years only if divisible by 400. Every other year is a leap year if divisible by 4.",
    },
    {
      front: "Myth: “TDD means no more experimenting with code.” What's the reality?",
      back: "Use TDD for core code, but stay flexible when experimenting.",
    },
    {
      front: "Myth: “Complex tasks need too many tests with TDD.” What's the reality?",
      back: "If a task is too big for TDD, it's too big, so break it down.",
    },
    {
      front: "Myth: “TDD means every function needs a unit test.” What's the reality?",
      back: "Some code, like networking, is better tested with integration tests.",
    },
    {
      front: "How can IntelliJ help with testing?",
      back: "It can generate tests, jump between code and tests, update tests when you rename, and re-run tests automatically.",
    },
  ],
};
