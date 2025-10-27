/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as cardScans_m from "../cardScans/m.js";
import type * as cards_create from "../cards/create.js";
import type * as cards_d from "../cards/d.js";
import type * as cards_m from "../cards/m.js";
import type * as cards_q from "../cards/q.js";
import type * as files_get from "../files/get.js";
import type * as files_upload from "../files/upload.js";
import type * as http from "../http.js";
import type * as profileAnalytics_q from "../profileAnalytics/q.js";
import type * as profileViews_create from "../profileViews/create.js";
import type * as profileViews_q from "../profileViews/q.js";
import type * as subscriptions_create from "../subscriptions/create.js";
import type * as subscriptions_get from "../subscriptions/get.js";
import type * as tokens_create from "../tokens/create.js";
import type * as tokens_d from "../tokens/d.js";
import type * as userProfiles_create from "../userProfiles/create.js";
import type * as userProfiles_get from "../userProfiles/get.js";
import type * as users_create from "../users/create.js";
import type * as users_get from "../users/get.js";
import type * as users_update from "../users/update.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "cardScans/m": typeof cardScans_m;
  "cards/create": typeof cards_create;
  "cards/d": typeof cards_d;
  "cards/m": typeof cards_m;
  "cards/q": typeof cards_q;
  "files/get": typeof files_get;
  "files/upload": typeof files_upload;
  http: typeof http;
  "profileAnalytics/q": typeof profileAnalytics_q;
  "profileViews/create": typeof profileViews_create;
  "profileViews/q": typeof profileViews_q;
  "subscriptions/create": typeof subscriptions_create;
  "subscriptions/get": typeof subscriptions_get;
  "tokens/create": typeof tokens_create;
  "tokens/d": typeof tokens_d;
  "userProfiles/create": typeof userProfiles_create;
  "userProfiles/get": typeof userProfiles_get;
  "users/create": typeof users_create;
  "users/get": typeof users_get;
  "users/update": typeof users_update;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
