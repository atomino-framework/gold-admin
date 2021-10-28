export type Collection = {
	files:Array<string>,
	maxCount: number,
	maxSize: number,
	mimetype: string
}

export type File = {
	name: string
	mimetype: string
	size: number
	title: string
	url: string
	properties: {[key:string]:string}
	isImage: boolean
	width: undefined|null|number
	height:undefined| null|number
	quality: undefined|null|number
	focus: undefined|null|string
	safezone: undefined|null|string
	thumbnail: undefined|null|string
}
