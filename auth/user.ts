import type I_User from "./user.interface";
import {writable} from "svelte/store";
import type {Writable} from "svelte/store";

let user:Writable<I_User|null> = writable(null);

export default user;
