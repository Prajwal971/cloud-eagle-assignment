export function getRandomItem<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}