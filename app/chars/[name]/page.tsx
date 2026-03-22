import { notFound } from "next/navigation";
import CharClient from "./CharClient";
import { getCharacterDetailsByName } from "@/lib/character-details";

export default async function Page({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;
	let data;

	try {
		data = await getCharacterDetailsByName(name);
	} catch (error) {
		if (error instanceof Error && error.message === "INVALID_CHARACTER_NAME") {
			notFound();
		}

		throw error;
	}

	if (!data) {
		notFound();
	}

	return <CharClient params={data} />;
}
