import { NzUploadChangeParam, UploadFileStatus } from 'ng-zorro-antd/upload';
import { TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';

export interface Files{
    file:fileList    
}

interface fileList {
    uid: string;
    name: string;
    status: string;
    response: string; // custom error message to show
    url: string;
  }

  export interface UploadFile {
    uid: string;
    size?: number;
    name: string;
    filename?: string;
    lastModified?: string;
    lastModifiedDate?: Date;
    url?: string;
    status?: UploadFileStatus;
    originFileObj?: File;
    percent?: number;
    thumbUrl?: string;
    response?: NzSafeAny;
    error?: NzSafeAny;
    linkProps?: { download: string };
    type?: string;
  
    [key: string]: NzSafeAny; 
  }
