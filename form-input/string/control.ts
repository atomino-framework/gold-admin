import AbstractControl, {component, layout} from "../abstract-control";
import Component from "./component.svelte"

@component(Component)
@layout("row")
export default class StringControl extends AbstractControl {
}
