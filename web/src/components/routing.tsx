import { history } from 'instantsearch.js/es/lib/routers'
import type { UiState } from 'instantsearch.js'

function cap(string: any) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCategorySlug(name: any) {
  return name
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug: any) {
  return slug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}

type RouteState = {
  query?: string
  page?: string
  tag?: string
  category?: string
  diverse?: string[]
}

const routeStateDefaultValues: RouteState = {
  query: '',
  page: '1',
  category: '',
  tag: '',
  diverse: undefined,
}

const today = new Date()
const month = today.toLocaleString('en-US', { month: 'short' })
const year = today.getFullYear()
const dateString = month + ' ' + year


const router = history<RouteState>({
  windowTitle(routeState) {
    const indexState = routeState || {}
    if (indexState.tag && indexState.category && indexState.diverse) {
      return `${cap(indexState.category)} ${cap(indexState.tag)} Careers at ${indexState.diverse} Companies - ${dateString}`
    }
    else if (indexState.tag && indexState.category) {
      return `${cap(indexState.tag)} Careers in ${cap(indexState.category)} - ${dateString}`
    }
    else if (indexState.category && indexState.diverse) {
      return `${cap(indexState.category)} Careers at ${indexState.diverse} Companies - ${dateString}`
    }
    else if (indexState.tag) {
      return `${cap(indexState.tag)} Careers - ${dateString}`
    }
    else if (indexState.category) {
      return `${cap(indexState.category)} Careers - ${dateString}`
    }
    else if (indexState.diverse && indexState.diverse[0]) {
      return `Careers at ${indexState.diverse} Companies - ${dateString}`
    }

    return ''
  },
  createURL({ qsModule, routeState, location }): string {
    const { protocol, hostname, port = '', pathname, hash } = location;
    const portWithPrefix = port === '' ? '' : `:${port}`;
    const urlParts = location.href.match(/^(.*?)\//);
    const baseUrl =
      (urlParts && urlParts[0]) ||
      `${protocol}//${hostname}${portWithPrefix}${pathname}`;

    const queryParameters: Partial<RouteState> = {}

    if (
      routeState.tag &&
      routeState.tag !== routeStateDefaultValues.tag
    ) {
      queryParameters.tag = encodeURIComponent(routeState.tag);
    }
    if (
      routeState.category &&
      routeState.category !== routeStateDefaultValues.category
    ) {
      queryParameters.category = encodeURIComponent(routeState.category);
    }
    if (
      routeState.diverse &&
      routeState.diverse !== routeStateDefaultValues.diverse
    ) {
      queryParameters.diverse = routeState.diverse.map(encodeURIComponent);
    }
    if (
      routeState.query &&
      routeState.query !== routeStateDefaultValues.query
    ) {
      queryParameters.query = encodeURIComponent(routeState.query);
    }
    if (routeState.page && routeState.page !== routeStateDefaultValues.page) {
      queryParameters.page = routeState.page;
    }

    const queryString = qsModule.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    })
    const encodedString = queryString
      .replace(/%5B/g, "[")
      .replace(/%5D/g, "]")

    return `${baseUrl}${encodedString}${hash}`
  },
  parseURL({ qsModule, location }: any) {
    const queryParameters = qsModule.parse(location.search.slice(1));
    const {
      query = '',
      page = 1,
      diverse = [],
      category = '',
      tag = ''
    } = queryParameters
    const allDiverse = (
      Array.isArray(diverse) ? diverse : [diverse].filter(Boolean)
    ) as string[]
    return {
      category,
      tag,
      diverse: allDiverse.map(decodeURIComponent),
      query: decodeURIComponent(query as string),
      page: page as string,
    }
  }
})
const getStateMapping = ({ indexName }: any) => ({
  stateToRoute(uiState: UiState): RouteState {
    const indexUiState = uiState[indexName]
    return {
      query: indexUiState.query,
      category: indexUiState.menu?.["category"],
      tag: indexUiState.menu?.["tags.tagName"],
      diverse: indexUiState.refinementList?.["diverseOwnership.diverseOwnership"],
      page: (indexUiState.page && String(indexUiState.page)) || undefined,
    }
  },
  routeToState(routeState: RouteState): UiState {
    const menu: { [key: string]: string } = {};
    if (routeState.tag) {
      menu["tags.tagName"] = routeState.tag;
    }
    if (routeState.category) {
      menu["category"] = routeState.category;
    }
    const refinementList: { [key: string]: string[] } = {};
    if (routeState.diverse) {
      refinementList["diverseOwnership.diverseOwnership"] = routeState.diverse;
    }
    return {
      [indexName]: {
        query: routeState.query,
        page: Number(routeState.page),
        menu,
        refinementList,
      },
    }
  },
})



const getRouting = (indexName: string) => ({
  router,
  stateMapping: getStateMapping({ indexName }),
});

export default getRouting