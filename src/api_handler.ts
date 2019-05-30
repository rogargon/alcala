"use strict";

import { createCorsHandler } from './lib/cors'

//Load Mgrs
//import {PermissionsMgr} from './lib/permissionsMgr';

//Instanciate Mgr
//let permissionsMgr = new PermissionsMgr();

//Load handlers
import {RpcHandler} from "./handlers/rpc";

//Instanciate handlers
const rpcHandler = createCorsHandler( new RpcHandler());

//Exports for serverless
exports.rpc = rpcHandler;
