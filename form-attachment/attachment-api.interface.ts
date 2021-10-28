import type {Collection, File} from "./types";

export default interface I_AttachmentApi {
	saveFileDetails(id: number, filename: string, data: any): Promise<boolean>
	get(id: number): Promise<{ collections: { [key: string]: Collection }, files: { [key: string]: File } }>;
	upload(id: number, collection: string, files: FileList): Promise<Array<boolean>>
	moveFile(id: number, filename: string, source: string, target: string, position: number, copy: boolean): Promise<boolean>
	removeFile(id: number, filename: string, collection: string): Promise<boolean>
}
