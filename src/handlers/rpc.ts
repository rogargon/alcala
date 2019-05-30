const jsonRpcProtocol = require('json-rpc-protocol')
import axios from 'axios';

export class RpcHandler {

    api: any;

    constructor () {
        if(!process.env.BACKEND_RPC) throw Error('no env var BACKEND_RPC');
        this.api=axios.create({
            baseURL: process.env.BACKEND_RPC,
        });
    }
  
    async handle(event: any,context: any, cb: any) {
        console.log("Starting...")
        
        //Parse json-rpc format
        let jsonRpcMsg
        try {
            jsonRpcMsg  = await jsonRpcProtocol.parse(event.body)
        } catch (error) {
            const err=JSON.parse(jsonRpcProtocol.format.error(0,error));
            console.log(err);cb(err); return;
        }
        console.log(jsonRpcMsg);
        //TODO: Check if call is allowed

        //Handle relayed RPC action

        //Relay to BACKEND_RPC
        let relayedResp;
        try{
            relayedResp = await this.api.post('',jsonRpcMsg);
        }catch(error){
            console.error(error)
            console.log("backend request error")
            const jsonRpcError = new jsonRpcProtocol.JsonRpcError("backend request error", -32000)
            const err=JSON.parse(jsonRpcProtocol.format.error(jsonRpcMsg.id,jsonRpcError));
            console.log(err)
            cb(err);
            return;
        }
        cb(null,relayedResp.data)
        return;


    }
}