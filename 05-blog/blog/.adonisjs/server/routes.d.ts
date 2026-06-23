import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'drive.pfs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'posts.home': { paramsTuple?: []; params?: {} }
    'posts.update': { paramsTuple?: []; params?: {} }
    'users.register_form': { paramsTuple?: []; params?: {} }
    'users.register': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'drive.pfs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'posts.home': { paramsTuple?: []; params?: {} }
    'users.register_form': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'drive.pfs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'posts.home': { paramsTuple?: []; params?: {} }
    'users.register_form': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'posts.update': { paramsTuple?: []; params?: {} }
    'users.register': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}