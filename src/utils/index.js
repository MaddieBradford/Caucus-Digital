export const capitalizeFirstLetter = str => str?.trim().split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ');