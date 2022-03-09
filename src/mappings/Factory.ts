import { BigInt, Address } from "@graphprotocol/graph-ts"
import { FACTORY_ADDRESS, ZERO_BI, ONE_BI, ZERO_BD, ADDRESS_ZERO } from './../utils/constants'
import {
  PoolCreated
} from "../../generated/Factory/Factory"
import { Factory, Pool } from "../../generated/schema"
import { Pool as PoolTemplate } from '../../generated/templates'



export function handlePoolCreated(event: PoolCreated): void {
  if (event.params.pool == Address.fromHexString('0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248')) {
    return
  }

  let factory = Factory.load(FACTORY_ADDRESS)
  if (factory == null){
    factory = new Factory(FACTORY_ADDRESS)
    factory.totalUniqueUsers = ZERO_BI
  }
  
  let pool = new Pool(event.params.pool.toHexString()) as Pool

  pool.save()
  // create the tracked contract based on the template
  PoolTemplate.create(event.params.pool)
  factory.save()
}