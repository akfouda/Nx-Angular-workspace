/* eslint-disable @nx/enforce-module-boundaries */
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse, DeleteParameters, EntityID } from "./types";
import { Context  } from "../environment/environment.types";
import { EnvironmentService } from "../environment/environment.service";

export type Segment = number | string;

interface Criteria {
  criteria: { [column: string]: string };
  pageNumber: number;
  pageSize: number;
}

/**
 * A generic base repository that builds API URLs using EnvironmentService.
 */
@Injectable()
export abstract class APIRepository<T> {
  protected readonly envService = inject(EnvironmentService);
  protected readonly http = inject(HttpClient);

  protected abstract readonly name: string; // resource name, e.g., "users"

  abstract parse(response: ApiResponse<T>): T[];

  /**
   * Builds an API endpoint using host + context + resource + optional segments.
   */
protected buildEndpoint(segments?: Segment[]): string {
  // If `name` is already a full URL, just return it
  if (/^https?:\/\//i.test(this.name)) {
    const baseUrl = this.name;
    return segments?.length ? [baseUrl, ...segments].join('/') : baseUrl;
  }

  // Otherwise, use environment
  const context = this.envService.getContexts()['api'] ?? { name: '', port: 8000 }; 
  const host = this.envService.getHost();

  // If host is localhost and port isn't set, default to 8000
  const port = (host.includes('localhost') && !context.port) ? 8000 : context.port;

  const baseUrl = `${host}:${port}/${context.name}/${this.name}`;
  return segments?.length ? [baseUrl, ...segments].join('/') : baseUrl;
}




  findAll(customUrl?: string): Observable<T[]> {
    const url = customUrl || this.buildEndpoint();
    return this.http.get<ApiResponse<T>>(url).pipe(map((res) => this.parse(res)));
  }

  findById(id: EntityID): Observable<T> {
    return this.http.get<T>(this.buildEndpoint([id]));
  }

  save<S extends T>(entity: T): Observable<S> {
    return this.http.post<S>(this.buildEndpoint(), entity);
  }

  update<S extends T>(entity: T): Observable<S> {
    return this.http.put<S>(this.buildEndpoint(), entity);
  }

  deleteById(params: DeleteParameters): Observable<unknown> {
    return this.http.delete<unknown>(this.buildEndpoint(), { body: params });
  }

  search(criteria: Criteria): Observable<T[]> {
    return this.http
      .post<ApiResponse<T>>(this.buildEndpoint(["sr"]), criteria)
      .pipe(map((res) => this.parse(res)));
  }
}
