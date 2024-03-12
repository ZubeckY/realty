import { Controller, Get } from 'routing-controllers'
import { operationTypeText } from '../types/operationType.js'
import { categoryTypeText } from '../types/category.js'
import { marketTypeText } from '../types/marketType.js'
import { houseTypeText } from '../types/houseType.js'
import { propertyRightsTypeText } from '../types/propertyRights.js'
import { decorationTypeText } from '../types/decoration.js'
import { dealTypeText } from '../types/dealType.js'
import { statusTypeText } from '../types/statusType.js'
import { roomTypeText } from '../types/roomType.js'
import { renovationTypeText } from '../types/renovation.js'
import { adStatusTypeText } from '../types/adStatus.js'
import { balconyOrLoggiaTypeText } from '../types/balconyOrLoggiaMulti.js'
import { leaseAppliancesTypeText } from '../types/leaseAppliances.js'
import { viewFromWindowsTypeText } from '../types/viewFromWindows.js'
import { courtyardTypeText } from '../types/courtyard.js'
import { bathroomMultiTypeText } from '../types/bathroomMulti.js'
import { saleOptionsTypeText } from '../types/saleOptions.js'
import { NDAdditionallyTypeText } from '../types/NDAdditionally.js'
import { inHouseTypeText } from '../types/inHouse.js'
import { SSAdditionallyTypeText } from '../types/SSAdditionally.js'
import { contactMethodTypeText } from '../types/contactMethhod.js'

@Controller('/realty')
export class RealtyController {

  @Get('/types')
  async getRealtyTypes(){
    try {
      return {
        categoryTypeText
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e
      }
    }
  }

  @Get('/create-flat-params')
  async getFlatNewBuildingParams() {
    try {
      return {
        newBuildingParams: {
          adStatusTypeText,
          operationTypeText,
          marketTypeText,
          houseTypeText,
          statusTypeText,
          propertyRightsTypeText,
          decorationTypeText,
          balconyOrLoggiaTypeText,
          viewFromWindowsTypeText,
          courtyardTypeText,
          bathroomMultiTypeText,
          saleOptionsTypeText,
          NDAdditionallyTypeText,
          contactMethodTypeText,
        },
        secondaryBuildingParams: {
          adStatusTypeText,
          operationTypeText,
          marketTypeText,
          houseTypeText,
          statusTypeText,
          roomTypeText,
          renovationTypeText,
          propertyRightsTypeText,
          dealTypeText,
          balconyOrLoggiaTypeText,
          leaseAppliancesTypeText,
          viewFromWindowsTypeText,
          courtyardTypeText,
          bathroomMultiTypeText,
          saleOptionsTypeText,
          NDAdditionallyTypeText,
          inHouseTypeText,
          SSAdditionallyTypeText,
          contactMethodTypeText,
        },
      }
    } catch (e) {
      return {
        message: 'Ошибка сервера, чтобы посмотреть подробнее, зайдите в консоль',
        error: e,
      }
    }
  }
}
