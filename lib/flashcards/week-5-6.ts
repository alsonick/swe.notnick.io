import { Lecture } from "../../types/flashcard";

export const frameworks: Lecture = {
  slug: "frameworks",
  title: "Frameworks",
  week: 5,
  lecturer: "George Ramzi",
  cards: [
    {
      front: "What goes wrong writing an endpoint with only the JDK's `HttpServer`?",
      back: "You handle parsing, JSON, methods and errors by hand, so bad input crashes and wrong methods aren't rejected.",
    },
    {
      front: "What does Spring Boot give a `@GetMapping` endpoint for free?",
      back: "Parsing, JSON conversion and status codes like 404, 400 and 405.",
    },
    {
      front: "What is the difference between a library and a framework?",
      back: "You call a library, but a framework calls your code.",
    },
    {
      front: "What is inversion of control? Give examples.",
      back: "The framework controls the flow and calls your code, like Spring calling controllers or JUnit calling `@Test` methods.",
    },
    {
      front: "What is start.spring.io, and what are starters?",
      back: "A site that generates Spring Boot projects. Starters are dependencies Spring sets up for you, like Spring Web or Spring Data JPA.",
    },
    {
      front: "What do `@RestController`, `@GetMapping` and `@PathVariable` do?",
      back: "They mark a class that returns JSON, map a GET route, and pull a value out of the URL path.",
    },
    {
      front: "What do `@RequestParam` and `@PostMapping` + `@RequestBody` do?",
      back: "`@RequestParam` reads query string values. `@PostMapping` with `@RequestBody` turns a POST's JSON body into an object.",
    },
    {
      front: "What do `@Valid`, `@NotBlank` and `@Min` do?",
      back: "Validate input and return 400 automatically if it's invalid.",
    },
    {
      front: "Why use a separate `NewItem` record for request bodies?",
      back: "So clients can only send the allowed fields, never binding straight onto a database entity.",
    },
    {
      front: "What is dependency injection in Spring?",
      back: "Classes ask for their dependencies in the constructor, and Spring creates and passes them in.",
    },
    {
      front: "How does dependency injection help testing?",
      back: "You can pass in a mock instead of the real dependency.",
    },
    {
      front: "What is auto-configuration in Spring Boot?",
      back: "Spring sees which libraries you've added and sets them up automatically.",
    },
    {
      front: "How do you find out what Spring auto-configured, and why?",
      back: "Run the app with `--debug`.",
    },
    {
      front: "What is an ORM?",
      back: "An Object-Relational Mapper, which maps database rows to objects and writes the SQL for you.",
    },
    {
      front: "What SQL does Django run for `Item.objects.filter(price__lt=1500).order_by(\"name\")`?",
      back: "`SELECT … FROM shop_item WHERE price < 1500 ORDER BY name`.",
    },
    {
      front: "What is the N+1 problem?",
      back: "Running one query for a list and then one more for each item's related object.",
    },
    {
      front: "How do you fix N+1 in Django?",
      back: "Use `select_related` to fetch related objects in one query with a JOIN.",
    },
    {
      front: "Why does “your database outlive your code”?",
      back: "Code can be redeployed any time, but data can't be thrown away and recreated.",
    },
    {
      front: "What is a database migration?",
      back: "A numbered file that changes the database schema, committed with the code and run once, in order, on every database.",
    },
    {
      front: "How does a database know which migrations to run?",
      back: "It keeps a table of the migrations it has already applied.",
    },
    {
      front: "What's the one rule about migrations that have already run?",
      back: "Never edit them. Write a new one instead.",
    },
    {
      front: "How do you create a migration in Django vs Spring Boot?",
      back: "Django generates it with `makemigrations`. In Spring Boot you write SQL like `V3__add_stock.sql` and Flyway runs it.",
    },
    {
      front: "Rank these frameworks from “bring your own batteries” to “batteries included”: Django, Express, Spring Boot, FastAPI, Vapor.",
      back: "Express, FastAPI, Vapor, Spring Boot, Django.",
    },
    {
      front: "What's the trade-off between more and fewer batteries?",
      back: "More batteries means a faster start with fewer decisions. Fewer means more freedom but more to maintain.",
    },
    {
      front: "What four things should decide your choice of framework?",
      back: "Your team's skills, the problem, the ecosystem, and long-term maintenance.",
    },
    {
      front: "What does “choose boring technology” mean?",
      back: "Use proven tools your team knows, and save new ideas for the product.",
    },
  ],
};

export const iac: Lecture = {
  slug: "infrastructure-as-code",
  title: "Infrastructure as Code",
  week: 6,
  lecturer: "Sergey Ovchinnik",
  cards: [
    {
      front: "As a codebase grows and becomes hard to manage, what are the first solutions?",
      back: "Git, package managers, and moving towards a service-based architecture.",
    },
    {
      front: "As you add developers and customers and deployment gets hard, what helps?",
      back: "Shared repository hosting, a CI/CD pipeline, and Agile.",
    },
    {
      front: "When build artefacts become inconsistent and deployment gets hard as services grow, what helps?",
      back: "Containerising with Docker and coordinating with Docker Compose.",
    },
    {
      front: "When customers use parts of the system disproportionately, what helps?",
      back: "Microservices orchestrated with Kubernetes, which can scale each part separately.",
    },
    {
      front: "What do you need to decide when deploying to the cloud?",
      back: "Which resources you need, how much and how many, and how to scale them up and down.",
    },
    {
      front: "What is the manual approach to managing infrastructure?",
      back: "A team provisions and scales resources by hand.",
    },
    {
      front: "What do provider-specific infrastructure tools offer, and what's the catch?",
      back: "They handle scaling and load balancing, but lock you into one cloud provider.",
    },
    {
      front: "What is infrastructure drift?",
      back: "Environments slowly becoming different as teams tweak them, so things that work in testing fail in production.",
    },
    {
      front: "Mutable vs immutable infrastructure?",
      back: "Mutable infrastructure is updated in place. Immutable infrastructure is replaced with a new version instead.",
    },
    {
      front: "What would the ideal infrastructure solution keep?",
      back: "Scaling and self-healing, with infrastructure defined next to the code, version controlled and immutable.",
    },
    {
      front: "What is Infrastructure as Code (IaC)?",
      back: "Defining infrastructure in config files instead of setting it up by hand.",
    },
    {
      front: "What is Terraform?",
      back: "The industry-standard IaC tool, which works with AWS, Azure and Kubernetes.",
    },
    {
      front: "What does DSL stand for in IaC?",
      back: "Domain-Specific Language.",
    },
  ],
};

export const webTechnologies: Lecture = {
  slug: "web-technologies",
  title: "Web Technologies",
  week: 6,
  lecturer: "Sergey Ovchinnik",
  cards: [
    {
      front: "What is an HTTP server?",
      back: "A program that receives HTTP requests and sends back responses.",
    },
    {
      front: "What is an HTTP client?",
      back: "A program that sends HTTP requests, like a browser or `curl`.",
    },
    {
      front: "What do web browsers do besides acting as HTTP clients?",
      back: "They render pages, run frontend code, host web apps and store site data.",
    },
    {
      front: "What are the steps a browser takes to render a page?",
      back: "HTML becomes the DOM and CSS becomes the CSSOM, which combine into the render tree. Then it lays out, paints and composites.",
    },
    {
      front: "What is the Render Tree?",
      back: "The DOM and CSSOM combined, deciding what is shown and how.",
    },
    {
      front: "What extra resources might a page request after it loads?",
      back: "Scripts, fonts, images, audio and video.",
    },
    {
      front: "What are the three main ways browsers store data?",
      back: "Cookies, local storage, and session storage (per tab).",
    },
    {
      front: "What information does a cookie usually carry?",
      back: "A value like a session id, plus its lifetime, which site it belongs to, and security settings.",
    },
    {
      front: "How is a cookie set and then sent back?",
      back: "The server sends a `Set-Cookie` header, and the browser sends it back in a `Cookie` header on later requests.",
    },
    {
      front: "What do the `HttpOnly`, `Secure`, `Max-Age`, `SameSite` and `Path` cookie attributes mean?",
      back: "They mean JS can't read the cookie, it's HTTPS only, how long it lasts, whether it's sent cross-site, and which paths get it.",
    },
    {
      front: "What are cookies, really?",
      back: "Browser variables sent with every request to a site, usable for anything the backend handles.",
    },
    {
      front: "How do some websites load almost instantly?",
      back: "They preload assets and render HTML on the server.",
    },
    {
      front: "What is server-side rendering (SSR)?",
      back: "Generating the HTML on the server instead of in the browser with JavaScript.",
    },
    {
      front: "What languages can run in the browser frontend without plugins?",
      back: "JavaScript, plus WebAssembly.",
    },
    {
      front: "Why does WebAssembly exist?",
      back: "To run fast code written in languages like C++ or Rust in the browser.",
    },
    {
      front: "How does WebAssembly work?",
      back: "Code is compiled to a `.wasm` module, which runs in the browser alongside JavaScript.",
    },
  ],
};
