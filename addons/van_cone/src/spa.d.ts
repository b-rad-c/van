import { State } from "vanjs-core";

declare const parametersPattern: RegExp;

declare type Route = {
  name: string;
  path: string | ".*";
  handler: RouteHandler;
  backend: RouteBackend;
  matcher: RegExp;
  params: RouteParams;
  title: string;
  callable: () => Promise<
    <TParams extends Record<string, any> | void = void>(
      params: TParams
    ) => HTMLElement
  >;
};
declare type RouteParams = Record<string, string>;
declare type QueryParams = Record<string, string>;
declare type RouteBackend = Record<string, string>;
declare type RouteHandlerProps = {
  params: RouteParams;
  query: QueryParams;
  context: RouterContext;
};
declare type RouteHandler = (props: RouteHandlerProps) => void;
declare type RouterContext = Record<string, string>;
declare type RouterConfig = Record<string, string>;

declare function getMatchedParams(route: Route, path: string): RouteParams;

declare function getQueryParams(query: string): QueryParams;

declare function createRoute(
  name: string,
  path: string,
  backend: RouteBackend,
  handler: RouteHandler
): Route;

declare const findRouteParams: (
  routes: Route[],
  path: string
) => {
  route: Route | undefined;
  params: RouteParams;
};

declare const parseUrl: (url: string) => { path: string; queryString: string };
declare const stripPrefix: (url: string, prefix: string) => string;

declare class Router {
  routes: Route[];
  prefix: string;
  backendPrefix: string;

  add(
    name: string,
    path: string,
    backend: RouteBackend,
    handler: RouteHandler
  ): this;

  dispatch(url: string, context: RouterContext): Route | false;

  getRoute(url: string): Route | undefined;

  _formatUrl(
    routeName: string,
    isBackend: boolean,
    params: Record<string, string>,
    query: QueryParams
  ): string;

  navUrl(
    routeName: string,
    params: Record<string, string>,
    query: QueryParams
  ): string;

  backendUrl(
    routeName: string,
    params: Record<string, string>,
    query: QueryParams
  ): string;
}

declare type CreateConeReturn = {
  routerElement: HTMLElement;
  currentPage: State<string>;
  router: Router;
  navState: State<string>;
  getNavState: () => string;
  setNavState: (newState: string) => void;
  navigate: (url: string, context: RouterContext) => void;
  pushHistory: (url: string) => void;
  handleNav: (event: any, context: RouterContext) => void;
  isCurrentPage: () => State<boolean>;
  navLink: NavLink;
};
declare type NavLinkProps<TParams extends Record<string, any> | void = void> =
  TParams extends void ? { name: string } : { name: string; params: TParams };
declare type NavLink = <TParams extends Record<string, any> | void = void>(
  props: NavLinkProps<TParams>,
  content: string
) => HTMLAnchorElement;

declare function createCone(
  routerElement: HTMLElement,
  routes: Route[],
  defaultNavState: string,
  routerConfig: RouterConfig
): CreateConeReturn;
