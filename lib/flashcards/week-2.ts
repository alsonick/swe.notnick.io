import { Lecture } from "../../types/flashcard";

export const buildSystems: Lecture = {
  slug: "build-systems-makefiles",
  title: "Build Systems & Makefiles",
  week: 2,
  lecturer: "Sergey Ovchinnik",
  cards: [
    {
      front: "What are the drawbacks of letting the IDE build and run your project?",
      back: "It only works inside the IDE and assumes the IDE's project structure.",
    },
    {
      front: "How do you compile and run a single Java file manually into a `bin` folder?",
      back: "`javac -d bin Application.java`, then `java -cp bin Application`.",
    },
    {
      front: "What problems come with building a project by typing commands manually?",
      back: "It's repetitive and messy, commands get duplicated, and it's hard to automate.",
    },
    {
      front: "Pros and cons of keeping all your commands in a `commands.txt` and copy-pasting them?",
      back: "It's simple and reusable, but still manual, slow and hard to automate.",
    },
    {
      front: "What is the difference between `make` and a `Makefile`?",
      back: "Make is the command line tool. The Makefile is the file of commands it runs.",
    },
    {
      front: "What is a **target** in a Makefile?",
      back: "A named group of commands, like `build` or `clean`, that you run with `make build`.",
    },
    {
      front: "How do you make one target depend on another?",
      back: "List it after the colon: `test: build` runs `build` before `test`.",
    },
    {
      front: "Why can `run: clean build test` be simplified to `run: clean test`?",
      back: "`test` already depends on `build`, so listing it again is duplication.",
    },
    {
      front: "What is `.PHONY` for in a Makefile?",
      back: "It marks targets that don't produce a file, so make always runs them.",
    },
    {
      front: "How do you define and use variables in a Makefile?",
      back: "Define with `NAME = value` and use with `$(NAME)`, so values are changed in one place.",
    },
    {
      front: "What happens if you run `make` with no target?",
      back: "It runs the first target in the Makefile.",
    },
    {
      front: "What makes a good Makefile?",
      back: "Keep it simple with the main targets (build, run, test, clean) first, and use variables.",
    },
    {
      front: "Which commands generate Javadoc and package a jar?",
      back: "`javadoc -d docs -sourcepath src com` and `jar cfe Application.jar com.Application -C bin com`.",
    },
  ],
};

export const apis: Lecture = {
  slug: "apis",
  title: "APIs",
  week: 2,
  lecturer: "Sergey Ovchinnik",
  cards: [
    {
      front: "What is an API?",
      back: "An Application Programming Interface: a set of rules that lets applications communicate and share data.",
    },
    {
      front: "What is an API endpoint?",
      back: "A specific path the API exposes for one operation, like `/grab`.",
    },
    {
      front: "What are the parts of an HTTP request?",
      back: "A method and path, headers, and an optional body.",
    },
    {
      front: "What is a resource-oriented API?",
      back: "An API organised around resources, each with its own URI like `/users/so362`.",
    },
    {
      front: "What is the difference between a URI and a URL?",
      back: "A URI identifies a resource (`/users/so362`). A URL also says where and how to reach it (`https://kent.ac.uk/users/so362`).",
    },
    {
      front: "What does CRUD stand for, and which HTTP methods map to it?",
      back: "Create (POST), Read (GET), Update (PUT/PATCH) and Delete (DELETE).",
    },
    {
      front: "What do these HTTP status codes mean?\n200, 201, 202, 204",
      back: "OK, Created, Accepted, and No Content.",
    },
    {
      front: "What do these HTTP status codes mean?\n400, 401, 403, 404, 500",
      back: "Bad Request, Unauthorised, Forbidden, Not Found, and Internal Server Error.",
    },
    {
      front: "What does a successful **create** look like (request and response)?",
      back: "A `POST` with the new data returns 201 Created, with the new URI in the `Location` header.",
    },
    {
      front: "What does a successful **read** look like?",
      back: "A `GET` to the resource's URI returns 200 OK with the resource.",
    },
    {
      front: "What does a successful **update** with PUT look like?",
      back: "A `PUT` with the whole resource returns 200 OK.",
    },
    {
      front: "What does a successful **delete** look like?",
      back: "A `DELETE` to the URI returns 204 No Content.",
    },
    {
      front: "PUT vs PATCH?",
      back: "PUT replaces the whole resource, while PATCH changes only some fields.",
    },
    {
      front: "What does it mean for an operation to be **idempotent**?",
      back: "Repeating it has no extra effect after the first time.",
    },
    {
      front: "Which CRUD methods are idempotent?",
      back: "GET, PUT and DELETE are idempotent, POST isn't, and PATCH usually is.",
    },
    {
      front: "Why might PATCH not be idempotent?",
      back: "The server might track changes, so each repeat adds a log entry or bumps a counter.",
    },
    {
      front: "What does REST stand for?",
      back: "REpresentational State Transfer.",
    },
    {
      front: "What are the key characteristics of a REST API?",
      back: "Everything is a resource with a URI and is acted on with HTTP methods. It's stateless, so each request carries all the data it needs.",
    },
  ],
};

export const cicd: Lecture = {
  slug: "ci-cd",
  title: "CI/CD",
  week: 2,
  lecturer: "Sergey Ovchinnik",
  cards: [
    {
      front: "What does a team need in order to deliver software continuously?",
      back: "Ways to deploy, change, update, verify and roll back the software.",
    },
    {
      front: "Why can't you just write the final version, test it thoroughly and deploy once?",
      back: "Requirements and environments change, and testing can never prove there are no bugs.",
    },
    {
      front: "Describe the **manual** approach to deployment.",
      back: "Develop incrementally, test by hand, and deploy by hand whenever a version is stable.",
    },
    {
      front: "Describe the **automated** approach to deployment.",
      back: "Every change is tested automatically before merging. Builds are made and deployed automatically if they pass.",
    },
    {
      front: "What is Continuous Integration?",
      back: "Tools and practices that automate building, testing and deploying.",
    },
    {
      front: "What do you need to automate a build?",
      back: "Build instructions, dependencies, a fresh copy of the code, tests, and a clean environment.",
    },
    {
      front: "What is a clean build environment, and how is one usually provided?",
      back: "An environment with only the tools the build needs, usually a Docker container.",
    },
    {
      front: "Unit vs integration vs functional testing?",
      back: "Unit tests check single functions, integration tests check parts work together, and functional tests check the software completes tasks.",
    },
    {
      front: "What are regression, stress, security and compatibility testing?",
      back: "They check that old features still work, that the system survives heavy load, that there are no vulnerabilities, and that it runs on different platforms.",
    },
    {
      front: "What does automated deployment usually involve?",
      back: "Producing daily builds and deploying working ones to customers, often watched by a separate team.",
    },
    {
      front: "What is a CI/CD pipeline and how is it usually defined?",
      back: "An automated build-test-deploy process, defined in a YAML file in the repository.",
    },
    {
      front: "What does YAML stand for?",
      back: "YAML Ain't Markup Language.",
    },
    {
      front: "What are **triggers**, **jobs** and **scripts** in a pipeline?",
      back: "Triggers start the pipeline, jobs are the tasks it runs (grouped into stages), and scripts are the commands inside each job.",
    },
    {
      front: "What does this `.gitlab-ci.yml` do?\n```\nimage: maven:3.9-eclipse-temurin-21\nstages: [build, test]\nbuild:\n  stage: build\n  script: [mvn -B -DskipTests package]\ntest:\n  stage: test\n  script: [mvn -B test]\n```",
      back: "In a Maven container, it packages the app in a build stage and then runs the tests in a test stage.",
    },
    {
      front: "How does CI/CD support Agile?",
      back: "It lets developers build and deploy quickly, so the team can keep up with changing priorities.",
    },
    {
      front: "What is DevOps?",
      back: "Combining development and IT operations into one workflow, and sometimes one team.",
    },
    {
      front: "Why can a separate operations team be inefficient, and how does DevOps address it?",
      back: "Handing work between teams slows things down. In DevOps, developers run their own pipelines and take turns being on call.",
    },
  ],
};
