import { Heading, Text } from "../components/ui/Typography";
import { Layout } from "../components/layout/Layout";
import { PRIMARY_BUTTON } from "../lib/styles";

// Next.js
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <Heading as="h1">404</Heading>
        <Text>This page doesn&apos;t exist. The flashcards do, though.</Text>
        <Link href="/flashcards" className={`${PRIMARY_BUTTON} w-fit`}>
          Go to flashcards
        </Link>
      </div>
    </Layout>
  );
}
