/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/resource-card`; params?: Router.UnknownInputParams; } | { pathname: `/resource-detail`; params?: Router.UnknownInputParams; } | { pathname: `/swipeCard`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/search/page`; params?: Router.UnknownInputParams; } | { pathname: `/resource/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/resource-card`; params?: Router.UnknownOutputParams; } | { pathname: `/resource-detail`; params?: Router.UnknownOutputParams; } | { pathname: `/swipeCard`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/search/page`; params?: Router.UnknownOutputParams; } | { pathname: `/resource/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/resource-card${`?${string}` | `#${string}` | ''}` | `/resource-detail${`?${string}` | `#${string}` | ''}` | `/swipeCard${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/search/page${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/resource-card`; params?: Router.UnknownInputParams; } | { pathname: `/resource-detail`; params?: Router.UnknownInputParams; } | { pathname: `/swipeCard`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/search/page`; params?: Router.UnknownInputParams; } | `/resource/${Router.SingleRoutePart<T>}${`?${string}` | `#${string}` | ''}` | { pathname: `/resource/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
