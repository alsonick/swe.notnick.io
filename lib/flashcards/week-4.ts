import { Lecture } from "../../types/flashcard";

export const advancedGit: Lecture = {
  slug: "advanced-git",
  title: "Advanced Git",
  week: 4,
  lecturer: "George Ramzi",
  cards: [
    {
      front: "What are a commit, a branch and HEAD in Git?",
      back: "A commit is a snapshot pointing to its parent. Branches and HEAD are just labels pointing at commits.",
    },
    {
      front: "Myth: “Git history is set in stone.” What's the reality?",
      back: "Commits can't change, but you can make new ones and move the branch label to them.",
    },
    {
      front: "Why would you rewrite a branch's history before merging?",
      back: "To turn messy commits into one clean commit per change, which is easier to review and revert.",
    },
    {
      front: "What does `git rebase -i main` do?",
      back: "Opens a list of your commits so you can reword, combine, reorder or drop them before Git replays them.",
    },
    {
      front: "In an interactive rebase, what do `pick`, `reword`, `fixup`, `squash` and `drop` do?",
      back: "They keep a commit, change its message, merge it into the previous one (dropping or keeping its message), or delete it.",
    },
    {
      front: "You amend a commit you'd already pushed. What does `git status` say, and why shouldn't you `git pull`?",
      back: "It says your branch has diverged. Pulling would merge the old commit back in.",
    },
    {
      front: "What is the golden rule of rewriting history?",
      back: "Never rewrite history someone else has built on.",
    },
    {
      front: "`--force` vs `--force-with-lease`?",
      back: "`--force` overwrites the remote regardless. `--force-with-lease` refuses if someone else has pushed since you last fetched.",
    },
    {
      front: "When can you rewrite history?",
      back: "Freely if it's only local, with `--force-with-lease` if only you use the pushed branch, and never on shared branches (use `git revert`).",
    },
    {
      front: "What is `git reflog`?",
      back: "A log of everywhere HEAD has been, so you can undo mistakes like a bad reset.",
    },
    {
      front: "What can't `git reflog` recover?",
      back: "Uncommitted work.",
    },
    {
      front: "How do you use `git stash` for an urgent hotfix?",
      back: "`git stash -u` to shelve your work, switch to main and fix it, then switch back and `git stash pop`.",
    },
    {
      front: "What are the downsides of `git stash`?",
      back: "You can only have one branch checked out at a time, switching rebuilds files, and stashes can clash or be forgotten.",
    },
    {
      front: "What is a git worktree?",
      back: "An extra folder with a different branch checked out, sharing the same repository.",
    },
    {
      front: "Give four uses for worktrees.",
      back: "Hotfixes without stashing, reviewing a colleague's branch, running long tests while coding, and running parallel AI agents.",
    },
    {
      front: "What is the one rule of worktrees?",
      back: "A branch can only be checked out in one worktree at a time.",
    },
    {
      front: "What does `git bisect` do?",
      back: "Binary-searches between a good and a bad commit to find which commit introduced a bug.",
    },
    {
      front: "How does `git bisect run` use a script's exit code?",
      back: "0 means good, 125 means skip, and any other code from 1 to 127 means bad.",
    },
    {
      front: "Why should you sign your commits?",
      back: "Git trusts any name you give it, so signing proves the commit is really yours.",
    },
    {
      front: "How do you sign commits with your SSH key?",
      back: "Set `gpg.format ssh`, your `user.signingkey` and `commit.gpgsign true`, then add the key to GitHub as a signing key.",
    },
    {
      front: "Why stage **hunks** rather than whole files?",
      back: "So only the changes you mean to commit go in, not stray debug lines.",
    },
    {
      front: "What are lazygit and GitKraken?",
      back: "Git apps (terminal and graphical) that make staging hunks, rebasing and undoing easier.",
    },
  ],
};

export const idesDebugging: Lecture = {
  slug: "ides-debugging",
  title: "IDEs & Debugging",
  week: 4,
  lecturer: "George Ramzi",
  cards: [
    {
      front: "How did the time to find a typo change from punched cards to IDEs?",
      back: "It went from hours or days with punched cards to instantly as you type in modern IDEs.",
    },
    {
      front: "What does an IDE give you that a plain text editor doesn't?",
      back: "It understands your whole project and code, so it can warn you about problems, refactor, run, debug and use git.",
    },
    {
      front: "What is the Language Server Protocol (LSP)?",
      back: "A protocol that lets any editor get IDE features from a shared language server.",
    },
    {
      front: "Is “text editor vs IDE” a strict divide?",
      back: "No, it's a spectrum, since editors can gain IDE features through extensions and LSP.",
    },
    {
      front: "What is static analysis?",
      back: "Analysing code without running it to find types, structure and likely bugs.",
    },
    {
      front: "What bug would an IDE flag in `if (answer == \"yes\")` in Java?",
      back: "`==` compares references, not text, so use `.equals()`.",
    },
    {
      front: "What is debugging?",
      back: "Finding out what your program actually does and why it isn't what you meant.",
    },
    {
      front: "What are the drawbacks of print debugging?",
      back: "You have to guess what to print, recompile for every new question, and remove the prints afterwards.",
    },
    {
      front: "What is a debugger, and how does IntelliJ talk to the JVM?",
      back: "A tool that pauses a running program so you can inspect and step through it. IntelliJ uses JDWP (Java Debug Wire Protocol).",
    },
    {
      front: "Does a breakpoint pause before or after its line runs?",
      back: "Before.",
    },
    {
      front: "Step Over vs Step Into vs Step Out?",
      back: "Over runs the current line, Into enters the method being called, and Out finishes the current method.",
    },
    {
      front: "What do Resume, Run to Cursor and Stop do (IntelliJ keys)?",
      back: "Resume (F9) runs to the next breakpoint, Run to Cursor (Alt+F9) runs to your cursor, and Stop (Ctrl+F2) ends the program.",
    },
    {
      front: "What are the VS Code debugger keys?",
      back: "F5 continue, F10 step over, F11 step into, and Shift+F11 step out.",
    },
    {
      front: "What is a conditional breakpoint?",
      back: "A breakpoint that only pauses when a condition is true.",
    },
    {
      front: "Name the extra breakpoint options in IntelliJ.",
      back: "Conditions, logging without pausing, remove once hit, instance filters, pass counts, and exception breakpoints.",
    },
    {
      front: "What does an exception breakpoint do?",
      back: "Pauses wherever a given exception is thrown.",
    },
    {
      front: "What can you do while the debugger is paused?",
      back: "Evaluate expressions, change variable values, add watches, and rewind to the start of the method.",
    },
    {
      front: "What is remote debugging?",
      back: "Attaching the debugger to a program running somewhere else, like a container or server.",
    },
    {
      front: "How do you start a JVM ready for remote debugging?",
      back: "Start it with the `-agentlib:jdwp` debug agent listening on a port (e.g. 5005), then attach IntelliJ's Remote JVM Debug to it.",
    },
    {
      front: "What's the security risk with remote debugging?",
      back: "Anyone who can reach the debug port can run any code in your app.",
    },
    {
      front: "How do you remote-debug a Python app?",
      back: "Run it with `python -m debugpy --listen 0.0.0.0:5678 app.py` and attach from VS Code.",
    },
  ],
};

export const architecturalPatterns: Lecture = {
  slug: "architectural-patterns",
  title: "Architectural Patterns",
  week: 4,
  lecturer: "Sergey Ovchinnik",
  cards: [
    {
      front: "How do architectural patterns differ from design patterns?",
      back: "Architectural patterns describe the high-level structure: the major components and how they communicate and scale.",
    },
    {
      front: "What is a monolith architecture?",
      back: "The whole application is one self-contained program and codebase.",
    },
    {
      front: "What is a layered architecture? Give examples.",
      back: "Components grouped into layers that only talk to neighbouring layers, like the TCP/IP stack or presentation, business and persistence.",
    },
    {
      front: "Pros and cons of a layered architecture?",
      back: "Layers can be replaced and built independently, but the system can be inefficient and hard to change.",
    },
    {
      front: "What is a three-tier architecture?",
      back: "A client, a server and a database talking over a network, the classic web app setup.",
    },
    {
      front: "What are the parts of MVC?",
      back: "The Model holds data and logic, the View shows it, and the Controller handles input and connects them.",
    },
    {
      front: "What is a service-oriented architecture (SOA)?",
      back: "An app built from separate services that call each other, each doing a different job.",
    },
    {
      front: "Pros and cons of SOA? Give example services.",
      back: "It separates logic and teams but can get heavy and complex. Examples are order, warehouse and shipping services.",
    },
    {
      front: "How do microservices differ from classic SOA?",
      back: "They're smaller and simpler, communicate over REST, can each use different languages, and auto-scale in the cloud.",
    },
    {
      front: "What is the publish–subscribe pattern?",
      back: "Publishers send events without knowing who receives them, and subscribers listen for the types they care about.",
    },
    {
      front: "How might you choose an architecture for: a simple website with DB access, a large distributed system, and a complex multi-abstraction system?",
      back: "MVC for the website, microservices for the distributed system, and a custom layered architecture for the complex one.",
    },
    {
      front: "What is Conway's Law?",
      back: "A system's structure ends up mirroring the communication structure of the organisation that built it.",
    },
    {
      front: "What is a pipeline architecture?",
      back: "Data processed through a sequence of steps, common in data science.",
    },
    {
      front: "Benefits and open questions of a pipeline architecture?",
      back: "Steps are small and composable, but you need to agree on the data format passed between them.",
    },
    {
      front: "What is a blackboard architecture?",
      back: "Many independent workers share global data, coordinated by a central process.",
    },
    {
      front: "What is event sourcing?",
      back: "Storing every action as an event instead of the final state, used where data can't be lost, like banking.",
    },
    {
      front: "What do you need to implement event sourcing?",
      back: "An event format, an event store, and a function that applies an event to a state.",
    },
  ],
};
