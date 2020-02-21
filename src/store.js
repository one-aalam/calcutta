import { writable } from 'svelte/store';

const state = [];

export function createCalStore(initialState = state) {
	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,
		add: (thing) => update(things => ([ ...things, thing ])),
		remove: (thing) => update(things => things.filter(_thing => _thing.key !== thing.key )),
		reset: () => set({})
	};
}