import { GroupModel } from "./group-model";
import { MainModel } from "./main-model";

export class FileModel {
  Id?: number;
  fileName?: string;
  fileTypeId?: number;
  fileGroupId?: GroupModel;
  fileUploaderId?: MainModel;
}
