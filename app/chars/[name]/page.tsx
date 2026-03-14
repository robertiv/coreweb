import { notFound } from "next/navigation";
import CharClient from "./CharClient";

export default async function Page({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/chars/${name}`,
		{
			cache: "no-store",
		},
	);

	if (!res.ok) {		
		notFound();
	}

	const data = await res.json();
	//console.log(data);
	return <CharClient params={data} />;
}
