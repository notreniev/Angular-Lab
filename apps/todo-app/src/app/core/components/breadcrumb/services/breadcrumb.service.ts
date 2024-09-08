import { computed, Injectable, signal } from '@angular/core'
import { BreadCrumb } from '../models/breadcrumb.model'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter, firstValueFrom } from 'rxjs'
import { BaseApiService } from '../../../abstract/base-api.service'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService extends BaseApiService<BreadCrumb> {
  private breadcrumbs: BreadCrumb[] = []
  private $breadcrumbs = signal<BreadCrumb[]>([])
  public breadcrumbsSignal = computed(this.$breadcrumbs)

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected override http: HttpClient
  ) {
    super(http)
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root)
      this.$breadcrumbs.update(() => [...this.breadcrumbs])
    })
    // this.getBreadcrumb().then(console.log)
  }

  async getBreadcrumb(): Promise<BreadCrumb> {
    return firstValueFrom(this.getById())
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    const children: ActivatedRoute[] = route.children

    if (children.length === 0) {
      return breadcrumbs
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/')
      if (routeURL !== '') {
        url += `/${routeURL}`
      }

      breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url: url })
      return this.createBreadcrumbs(child, url, breadcrumbs)
    }

    return breadcrumbs
  }
}
