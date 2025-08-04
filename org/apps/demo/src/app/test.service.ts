/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../../packages/ui/src/lib/core/data-access/types';
import {APIRepository  } from '../../../../packages/ui/src/lib/core/data-access/repository';

@Injectable({ providedIn: 'root' })
export class UserRepository extends APIRepository<any> {
protected readonly name = 'starter';
  parse(response: ApiResponse<any>): any[] {
    return response.data.map(d => ({ ...d } as any));
  }
}
