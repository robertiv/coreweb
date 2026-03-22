export const CHARACTER_NAME_PATTERN = /^[A-Za-z0-9_-]{1,16}$/;

export function sanitizeCharacterName(value: string) {
	return value.trim();
}

export function isValidCharacterName(value: string) {
	return CHARACTER_NAME_PATTERN.test(value);
}