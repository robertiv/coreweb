"use server";

import { redirect } from "next/navigation";
import { getPool } from "@/lib/db";
import {
	isValidCharacterName,
	sanitizeCharacterName,
} from "@/lib/character-name";

export type CharacterSuggestion = {
	name: string;
	level: number;
	race: string;
	jobType: number;
	guild: string;
};

export type CharacterSearchState = {
	error: string;
	searchedName: string;
	suggestions: CharacterSuggestion[];
	noMatches: boolean;
};

const initialCharacterSearchState: CharacterSearchState = {
	error: "",
	searchedName: "",
	suggestions: [],
	noMatches: false,
};

function getField(formData: FormData, key: string) {
	const value = formData.get(key);
	return typeof value === "string" ? value : "";
}

export async function searchCharacterAction(
	_prevState: CharacterSearchState,
	formData: FormData,
): Promise<CharacterSearchState> {
	const rawName = getField(formData, "characterName");
	const sanitizedName = sanitizeCharacterName(rawName);

	if (!sanitizedName) {
		return {
			...initialCharacterSearchState,
			error: "Enter a character name before searching.",
		};
	}

	if (!isValidCharacterName(sanitizedName)) {
		return {
			...initialCharacterSearchState,
			error:
				"Character names can only contain letters, numbers, underscores, or hyphens.",
		};
	}

	const pool = await getPool();
	const exactResult = await pool.request().input("name", sanitizedName).query(`
		SELECT TOP 1 CharName16
		FROM _Char
		WHERE CharName16 COLLATE Latin1_General_CI_AS = @name COLLATE Latin1_General_CI_AS
	`);

	if (exactResult.recordset.length > 0) {
		redirect(`/chars/${encodeURIComponent(sanitizedName)}`);
	}

	const prefixPattern = `${sanitizedName}%`;
	const containsPattern = `%${sanitizedName}%`;

	const suggestionsResult = await pool
		.request()
		.input("name", sanitizedName)
		.input("prefixPattern", prefixPattern)
		.input("containsPattern", containsPattern)
		.query(`
			SELECT TOP 10
				c.CharName16 AS name,
				c.CurLevel AS level,
				CASE WHEN c.RefObjID < 5000 THEN 'Chinese' ELSE 'European' END AS race,
				ISNULL(t.JobType, 0) AS jobType,
				CASE
					WHEN g.Name IS NULL OR g.Name = 'dummy' THEN '<none>'
					ELSE g.Name
				END AS guild
			FROM _Char c
			LEFT JOIN _CharTrijob t ON t.CharID = c.CharID
			LEFT JOIN _Guild g ON g.ID = c.GuildID
			WHERE c.CharName16 COLLATE Latin1_General_CI_AS LIKE @containsPattern COLLATE Latin1_General_CI_AS
			ORDER BY
				CASE
					WHEN c.CharName16 COLLATE Latin1_General_CI_AS LIKE @prefixPattern COLLATE Latin1_General_CI_AS THEN 0
					ELSE 1
				END,
				ABS(LEN(c.CharName16) - LEN(@name)),
				c.CharName16 ASC
		`);

	const suggestions = suggestionsResult.recordset as CharacterSuggestion[];

	return {
		error: "",
		searchedName: sanitizedName,
		suggestions,
		noMatches: suggestions.length === 0,
	};
}