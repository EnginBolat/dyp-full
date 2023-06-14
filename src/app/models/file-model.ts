import { GroupModel } from "./group-model";
import { MainModel } from "./main-model";

export class FileModel {
  Id?: number;
  fileName?: string;
  fileOriginalName?:string;
  fileType?:string;
  fileGroupId?: GroupModel;
  fileUploaderId?: MainModel;
}
