import { Lecture } from "../../types/flashcard";

export const introduction: Lecture = {
  slug: "introduction-methodologies-requirements",
  title: "Introduction, Methodologies & Requirements",
  week: 1,
  lecturer: "George Ramzi",
  cards: [
    {
      front: "Why is being a “good programmer” not enough when building modern software?",
      back: "Software now has to be reliable, scalable and resilient at huge scale. You also need good engineering practices to manage large codebases.",
    },
    {
      front: "What are the four values of the Agile Manifesto (2001)?",
      back: "Individuals and interactions over processes and tools, working software over documentation, customer collaboration over contract negotiation, and responding to change over following a plan.",
    },
    {
      front: "How does the Agile Manifesto treat the items on the right (processes, documentation, contracts, plans)?",
      back: "They still have value, but the items on the left are valued more.",
    },
    {
      front: "What does the Product Owner do in Scrum?",
      back: "Represents the customer, writes the stories and prioritises the backlog.",
    },
    {
      front: "What does the Scrum Master do?",
      back: "Facilitates the process, mentors the team and removes obstacles.",
    },
    {
      front: "What is the Development Team in Scrum?",
      back: "A cross-functional team that codes, tests, debugs and plans.",
    },
    {
      front: "What is a Scrum of Scrums?",
      back: "A way to scale Scrum: several small teams each send a representative to a higher-level team that coordinates them.",
    },
    {
      front: "At Spotify, what is a **Squad**?",
      back: "A team of 6–12 people working on one feature area, free to use any methodology.",
    },
    {
      front: "At Spotify, what is a **Tribe**?",
      back: "A group of 40–150 people working on the same area of the product, coordinated by a Tribe Lead.",
    },
    {
      front: "At Spotify, what is the difference between a **Chapter** and a **Guild**?",
      back: "A Chapter is people with the same expertise. A Guild is anyone who wants to share knowledge about a topic.",
    },
    {
      front: "At Spotify, what is a **Trio** and an **Alliance**?",
      back: "A Trio is a Tribe Lead, Product Lead and Design Lead together. An Alliance is a group of tribes.",
    },
    {
      front: "What is the template for a user story?",
      back: "As a [role], I want [feature], so that I [can do something].",
    },
    {
      front: "What does INVEST stand for?",
      back: "Independent, Negotiable, Valuable, Estimable, Small, Testable.",
    },
    {
      front: "INVEST: what makes a backlog item **Independent**?",
      back: "It can be done in any order, so interconnected items should be combined.",
    },
    {
      front: "INVEST: what makes a backlog item **Negotiable**?",
      back: "It's open to discussion and can change as the product evolves.",
    },
    {
      front: "INVEST: what makes a backlog item **Valuable**?",
      back: "It adds value to the product, now or by building towards something.",
    },
    {
      front: "INVEST: what makes a backlog item **Estimable**?",
      back: "You can roughly tell how big it is and that it's achievable.",
    },
    {
      front: "INVEST: what makes a backlog item **Small**, and what happens to large ones?",
      back: "It fits in a sprint. Large items start as epics and get broken down.",
    },
    {
      front: "INVEST: what makes a backlog item **Testable**?",
      back: "You can test it to know when it's done, through unit or acceptance tests.",
    },
    {
      front: "What are acceptance criteria?",
      back: "The conditions a user story must meet to count as done.",
    },
  ],
};

export const containers: Lecture = {
  slug: "introduction-to-containers",
  title: "Introduction to Containers",
  week: 1,
  lecturer: "George Ramzi",
  cards: [
    {
      front: "What problem do containers solve?",
      back: "“Works on my machine”: code breaking elsewhere because of different OS or library versions.",
    },
    {
      front: "What is a container?",
      back: "Software packaged with everything it needs to run, so it runs the same on any machine with a container runtime.",
    },
    {
      front: "What are the key properties of a container (shipping-container analogy)?",
      back: "It's standardised so any platform can run it, isolated, and lightweight.",
    },
    {
      front: "How do containers differ from virtual machines?",
      back: "A VM emulates a whole operating system, while containers share the host's kernel. That makes containers much lighter and faster.",
    },
    {
      front: "What Linux kernel features does Docker use to isolate containers?",
      back: "Namespaces isolate networks, filesystems and processes, and cgroups limit resources like CPU.",
    },
    {
      front: "What is a Docker image layer?",
      back: "Each Dockerfile instruction creates an immutable layer on top of the last, and layers can be cached and reused.",
    },
    {
      front: "Why do you copy `requirements.txt` and install dependencies *before* copying the source code?",
      back: "A changed layer rebuilds every layer above it. Putting source code last means a code change doesn't reinstall dependencies.",
    },
    {
      front: "What happens if a lower layer of an image changes?",
      back: "Every layer above it has to be rebuilt.",
    },
    {
      front: "Walk through this Dockerfile:\n```\nFROM python:3.14-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD [\"python\", \"app.py\"]\n```",
      back: "It starts from a Python image, sets the working directory, and installs the dependencies. Then it copies in the code and runs the app.",
    },
    {
      front: "What isolation guarantees do containers give each other?",
      back: "Each can use its own library versions, and one crashing or changing doesn't affect the others.",
    },
    {
      front: "What is a container registry? Give public and private examples.",
      back: "A place to store and download images: public ones like Docker Hub, or private ones like GitLab, AWS or Azure.",
    },
    {
      front: "What are two ways to use an image from a registry?",
      back: "Run it directly (e.g. MySQL) or build on top of it (e.g. a Python base image).",
    },
    {
      front: "Give four uses of containers and container registries.",
      back: "CI/CD deployments, microservices, reproducible research, and shared development environments.",
    },
  ],
};

export const docker: Lecture = {
  slug: "docker",
  title: "Docker",
  week: 1,
  lecturer: "George Ramzi",
  cards: [
    {
      front: "What's the difference between a Docker **image** and a **container**?",
      back: "An image is a read-only blueprint, and a container is a running instance of it. You can run many containers from one image.",
    },
    {
      front: "What are the four principles of a good Spring Boot Dockerfile?",
      back: "Start from an existing image, install dependencies before copying source, build inside the image, and say how to run it.",
    },
    {
      front: "In the Spring Boot Dockerfile, why is `COPY mvnw pom.xml ./` and `RUN ./mvnw dependency:go-offline` placed before `COPY src src`?",
      back: "So the dependency layer stays cached until `pom.xml` changes, and only the code is rebuilt.",
    },
    {
      front: "Are any ports exposed from a container by default?",
      back: "No, you have to publish ports explicitly.",
    },
    {
      front: "What does `-p 9000:8080` do in `docker run`?",
      back: "Maps port 9000 on your machine to port 8080 in the container.",
    },
    {
      front: "What does `-e` do in `docker run`, and why is it useful?",
      back: "Sets an environment variable, so one image can be configured for different environments.",
    },
    {
      front: "What do these do?\n`docker ps`, `docker logs -f shop`, `docker exec -it shop sh`, `docker stop shop`, `docker rm shop`",
      back: "They list running containers, follow a container's logs, open a shell inside it, stop it, and delete it.",
    },
    {
      front: "What does it mean that containers are **ephemeral**?",
      back: "Deleting a container deletes its data. Anything you want to keep must live outside it.",
    },
    {
      front: "What does `--rm` do in `docker run`?",
      back: "Deletes the container automatically when it stops.",
    },
    {
      front: "Named volume vs bind mount?",
      back: "A named volume is managed by Docker and suits databases. A bind mount maps a folder from your machine and suits config or code.",
    },
    {
      front: "What is Docker Compose?",
      back: "A tool that starts a multi-container app from one `compose.yml` file, with one service per container.",
    },
    {
      front: "What do these do?\n`docker compose up --build`, `docker compose logs -f api`, `docker compose ps`, `docker compose down`",
      back: "They build and start everything, follow one service's logs, show what's running, and stop and remove the containers.",
    },
    {
      front: "Why is `docker compose down -v` dangerous?",
      back: "It also deletes volumes, including your database.",
    },
    {
      front: "How do services find each other in Compose?",
      back: "By service name: Compose puts them on a private network where the name is the hostname, e.g. `db:5432`.",
    },
    {
      front: "Inside the `api` container, why can't you reach the database at `localhost:5432`?",
      back: "Inside a container, `localhost` is that container itself, so you use `db:5432`.",
    },
    {
      front: "Why isn't `depends_on` alone enough to start services in the right order?",
      back: "It only waits for the container to start, not to be ready. Add a healthcheck with `condition: service_healthy`.",
    },
    {
      front: "What is a Dev Container?",
      back: "A development environment that runs in a container, defined in `devcontainer.json`, so everyone gets the same setup.",
    },
    {
      front: "What can you configure in `devcontainer.json`?",
      back: "The image, forwarded ports, a setup command, editor extensions and extra features.",
    },
    {
      front: "What is a Dev Container **feature**?",
      back: "A reusable tool you add to a dev container with one line, no Dockerfile needed.",
    },
    {
      front: "How do a Dev Container and Compose work together?",
      back: "The dev container is your workspace and Compose runs the app stack. They're kept separate so restarting the stack doesn't touch your editor.",
    },
    {
      front: "Why can't you use Docker on the lab PCs?",
      back: "Docker needs superuser privileges, which is a security risk.",
    },
    {
      front: "Why might an image built on an Apple Silicon Mac fail on the OpenStack node, and how do you fix it?",
      back: "The Mac builds arm64 images but the node is x86_64. Build with `--platform linux/amd64`.",
    },
    {
      front: "What are the costs of using Docker?",
      back: "It uses RAM (a Linux VM on Mac and Windows) and disk space, first pulls are slow, and debugging adds a layer.",
    },
    {
      front: "Summarise the roles of a Dockerfile, `compose.yml` and `devcontainer.json`.",
      back: "A Dockerfile builds an image, `compose.yml` runs a whole stack, and `devcontainer.json` gives everyone the same dev environment.",
    },
  ],
};
