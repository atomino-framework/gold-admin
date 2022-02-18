import CheckboxesControl from "./checkboxes/control";
import ColorControl from "./color/control";
import ComboboxControl from "./combobox/control";
import DateControl from "./date/control";
import DateTimeControl from "./datetime/control";
import NumberControl from "./number/control";
import PasswordControl from "./password/control";
import RadioControl from "./radio/control";
import SelectControl from "./select/control";
import SwitchControl from "./switch/control";
import TextControl from "./text/control";
import TimeControl from "./time/control";
import StringControl from "./string/control";
import TagControl from "./tag/control";

export default {
	"checkboxes": (field: string, label: string | null = null):CheckboxesControl => new CheckboxesControl(field, label),
	"color": (field: string, label: string | null = null):ColorControl => new ColorControl(field, label),
	"combobox": (field: string, label: string | null = null):ComboboxControl => new ComboboxControl(field, label),
	"date": (field: string, label: string | null = null):DateControl => new DateControl(field, label),
	"datetime": (field: string, label: string | null = null):DateTimeControl => new DateTimeControl(field, label),
	"number": (field: string, label: string | null = null):NumberControl => new NumberControl(field, label),
	"password": (field: string, label: string | null = null):PasswordControl => new PasswordControl(field, label),
	"radio": (field: string, label: string | null = null):RadioControl => new RadioControl(field, label),
	"select": (field: string, label: string | null = null):SelectControl => new SelectControl(field, label),
	"string": (field: string, label: string | null = null):StringControl => new StringControl(field, label),
	"switch": (field: string, label: string | null = null):SwitchControl => new SwitchControl(field, label),
	"text": (field: string, label: string | null = null):TextControl => new TextControl(field, label),
	"time": (field: string, label: string | null = null):TimeControl => new TimeControl(field, label),
	"tag": (field: string, label: string | null = null):TagControl => new TagControl(field, label),
}
