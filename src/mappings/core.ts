/* eslint-disable prefer-const */
import { Factory, Swap_User } from '../../generated/schema'
import { BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts'
import {
  Swap as SwapEvent
} from '../../generated/templates/Pool/Pool'
import { FACTORY_ADDRESS, ONE_BI, ZERO_BI } from '../utils/constants'

export function handleSwap(event: SwapEvent): void {
    let factory = Factory.load(FACTORY_ADDRESS)
    if (factory == null){
        factory = new Factory(FACTORY_ADDRESS)
        factory.totalUniqueUsers = ZERO_BI
      }

    let swap_user = Swap_User.load(event.params.sender.toString())
    if (swap_user == null) {
        swap_user = new Swap_User(event.params.sender.toString())
        factory.totalUniqueUsers.plus(ONE_BI)
    }

    swap_user.save()
    factory.save()
}
  