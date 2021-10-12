export default interface I_AttachmentApi {
	removeFile(id: number, filename: string, collection: string): Promise<any>

	saveFileDetails(id: number, filename: string, data: any): Promise<any>

	get(id: number): Promise<Array<any>>

	upload(id: number, collection: string, files: FileList): Promise<any>

	moveFile(id: number, filename: string, source: string, target: string, position: number, copy: boolean): Promise<any>
}
