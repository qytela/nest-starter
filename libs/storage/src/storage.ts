import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';

@Injectable()
export class Storage {
  static disk(disk: string) {
    return StorageService.setDisk(disk);
  }
}
