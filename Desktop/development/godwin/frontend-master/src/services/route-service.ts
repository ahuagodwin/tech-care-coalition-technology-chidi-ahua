import type {RouteRecordRaw} from 'vue-router'
import {RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router'


interface FactoryContext{
  router?:Router;
  store:any;
  from:RouteLocationNormalized;
  to:RouteLocationNormalized;
  next:NavigationGuardNext;
}

type  Middleware = ((context:FactoryContext) => NavigationGuardNext | void)

interface GlobalMiddleware{
  beforeAll?:Middleware[]
  afterAll?:Middleware[]
}

interface FactoryArgs{
    context:FactoryContext,
    middleware:Array<Middleware>, 
    index:number,
}

const _mergeWithEachRouteMiddleware = (middleware:Middleware[],allRouteMiddleware:GlobalMiddleware) =>{
  let newMiddleware = middleware;
  if(allRouteMiddleware.beforeAll){
    newMiddleware = allRouteMiddleware.beforeAll.concat(newMiddleware)
  }
  if(allRouteMiddleware.afterAll){
    newMiddleware = newMiddleware.concat(allRouteMiddleware.afterAll)
  }
  return newMiddleware;
}

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function _nextFactory(args:FactoryArgs) {
    const subsequentMiddleware = args.middleware[args.index];
    if (!subsequentMiddleware) {
      return args.context.next
    }
    return() => {
      args.context.next;
      const nextMiddleware = _nextFactory({...args, index: args.index + 1});
      subsequentMiddleware({ ...args.context, next: nextMiddleware });
    }
}

// On any route - to be used with beforeEnter
const RouteMultiGuard = function(guards:Array<Middleware> | Middleware, store:any){
  const middleware = Array.isArray(guards) ? guards : [guards];

  return (to: RouteLocationNormalized, from: RouteLocationNormalized, next:NavigationGuardNext) => {
    const context = {store,from,to,next};
    
    const nextMiddleware = _nextFactory({context, middleware, index:1});

    return middleware[0]({ ...context, next: nextMiddleware });
  }
}

//On all routes
const  RunMiddlewareBeforeEachRoutes = function (router:Router,store:any, allRouteMiddleware?:GlobalMiddleware){
    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next:NavigationGuardNext) => {
        if (to.meta.middleware || allRouteMiddleware) {

          let middleware = to.meta.middleware 
          ? (Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]) 
          : []

          if(allRouteMiddleware){
            middleware = _mergeWithEachRouteMiddleware(middleware,allRouteMiddleware as GlobalMiddleware)
          }
      
          const context = {router,store,from,to,next};

          const nextMiddleware = _nextFactory({context, middleware, index:1});
      
          return middleware[0]({ ...context, next: nextMiddleware });
        }else{
          return next();
        }
    });
}

/**
 * Use this to generate prefix for routes
 *
 * @param prefix
 * @param routes
 * @returns {*}
 */
const PrefixRoutesWith = (prefix:string, routes:Array<RouteRecordRaw>) => routes.map(route => {
  const prefixedRoute = {
     ...route,
     path: prefix + route.path,
  }
  if(route.alias){
     prefixedRoute['alias'] = prefix + route.alias
  }
  return prefixedRoute
});

/**
* Use this to generate prefix for routes
*
* @param prefix
* @param routes
* @returns {*}
*/

const AppendRouteMiddlewareWith = (guards:GlobalMiddleware, routes:Array<RouteRecordRaw>) => routes.map(route => {
  const currentRouteMiddleware = route?.meta?.middleware as Middleware[]
  const allMiddleware = _mergeWithEachRouteMiddleware(currentRouteMiddleware || [], guards)
  route.meta = Object.assign({},route.meta || {},{middleware:allMiddleware})
  return route
});

export default {
  PrefixRoutesWith,
  RouteMultiGuard,
  AppendRouteMiddlewareWith,
  RunMiddlewareBeforeEachRoutes
}