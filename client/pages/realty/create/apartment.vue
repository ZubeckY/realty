<template>
  <div>
    <h3>Добавление квартиры</h3>

    <card class="my-3">
      <div class="createRealty__group">
        <div class="createRealty__title required">Адрес</div>
      </div>
    </card>

    <card class="mb-3">
      <!-- Принадлежность к рынку -->
      <div class="createRealty__group">
        <div class="createRealty__title required">Принадлежность к рынку</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.marketType"
          mandatory
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.marketTypeText"
            :key="'marketType-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Способ продажи -->
      <div class="createRealty__group mt-3">
        <div class="createRealty__title">Способ продажи</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.saleOptions"
          mandatory
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.saleOptionsTypeText"
            :key="'saleOption-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Статус недвижимости -->
      <div class="createRealty__group mt-3">
        <div class="createRealty__title required">Тип недвижимости</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.status"
          mandatory
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.statusTypeText"
            :key="'status-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Тип объявления -->
      <div class="createRealty__group mt-3">
        <div class="createRealty__title required">Тип объявления</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.operationType"
          mandatory
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.operationTypeText"
            :key="'operationType-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Тип сделки -->
      <div
        class="createRealty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="createRealty__title required">Тип сделки</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.dealType"
          mandatory
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.dealTypeText"
            :key="'dealType-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Услуга продвижения Avito -->
      <div class="createRealty__group mt-3">
        <div class="createRealty__title">Услуга продвижения Avito</div>
        <div class="small-input mr-3">
          <v-autocomplete
            :items="secondaryBuildingParams.adStatusTypeText"
            v-model="model.adStatus"
            label="Продвижение на Avito"
            item-value="item[1]"
            item-text="item[0]"
            deletable-chips
            outlined
            counter
            chips
            dense
          />
        </div>
      </div>
    </card>

    <card class="mb-3">
      <!-- Площадь -->
      <div class="createRealty__group mt-3">
        <div class="createRealty__title required">Площадь</div>
        <div class="small-input mr-3">
          <v-text-field
            :rules="[rules.required]"
            v-model="model.square"
            label="Площадь *"
            type="number"
            outlined
            counter
            dense
          />
        </div>
      </div>

      <!-- Площадь кухни -->
      <div
        class="createRealty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="createRealty__title required">Площадь кухни</div>
        <div class="small-input mr-3">
          <v-text-field
            :rules="[rules.required]"
            v-model="model.kitchenSpace"
            label="Площадь кухни*"
            type="number"
            outlined
            counter
            dense
          />
        </div>
      </div>

      <!-- Этаж и этажность -->
      <div class="createRealty__group">
        <div class="createRealty__title required">Этаж и этажность</div>
        <div class="d-flex flex-row flex-wrap">
          <div class="small-input mr-3">
            <v-text-field
              :rules="[rules.required]"
              v-model="model.floor"
              label="Этаж *"
              type="number"
              outlined
              counter
              dense
            />
          </div>

          <div class="small-input">
            <v-text-field
              :rules="[rules.required]"
              v-model="model.floors"
              label="Количество этажей *"
              type="number"
              outlined
              counter
              dense
            />
          </div>
        </div>
      </div>

      <!-- Ремонт -->
      <div
        class="createRealty__group"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="createRealty__title required">Ремонт</div>
        <v-btn-toggle
          v-model="model.renovationType"
          class="radius ma-0 pa-0"
          mandatory
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.renovationTypeText"
            :key="'renovationType-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Тип комнат -->
      <div
        class="createRealty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="createRealty__title required">Тип комнат</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.roomType"
          mandatory
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.roomTypeText"
            :key="'roomType-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Количество комнат -->
      <div class="createRealty__group mt-3">
        <div class="createRealty__title required">Количество комнат</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.rooms"
          mandatory
          group
          dense
          tile
        >
          <v-btn :value="-1" class="ma-0" small text>Своб. планировка</v-btn>
          <v-btn :value="0" class="ma-0" small text>Студия</v-btn>
          <v-btn
            v-for="i in 9"
            :key="'room-' + i"
            :value="i"
            class="ma-0"
            small
            text
          >
            {{ i }}
          </v-btn>
          <v-btn :value="10" class="ma-0" small text>10 и более</v-btn>
        </v-btn-toggle>
      </div>

      <div
        class="createRealty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="createRealty__title">Год постройки</div>
        <div class="small-input mr-3">
          <v-text-field
            v-model="model.buildYear"
            :rules="[rules.maxValue(Number(new Date().getFullYear()))]"
            label="Год постройки"
            type="number"
            outlined
            counter
            dense
          />
        </div>
      </div>
    </card>

    <card class="my-3">
      <div
        class="createRealty__group"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="createRealty__title">В доме</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.inHouse"
          multiple
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.inHouseTypeText"
            :key="'inHouse-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <div
        class="createRealty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="createRealty__title">Бытовая техника</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.leaseAppliances"
          multiple
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.leaseAppliancesTypeText"
            :key="'leaseAppliance-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <div
        class="createRealty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="createRealty__title">Дополнительно</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.SSAdditionally"
          multiple
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.SSAdditionallyTypeText"
            :key="'SSAdditionally-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <div
        class="createRealty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="createRealty__title">Дополнительно</div>
        <v-btn-toggle
          class="radius ma-0 pa-0"
          v-model="model.NDAdditionally"
          multiple
          group
          dense
          tile
        >
          <v-btn
            v-for="(item, i) in secondaryBuildingParams.NDAdditionallyTypeText"
            :key="'NDAdditionally-' + i"
            :value="item[0]"
            class="ma-0"
            small
            text
          >
            {{ item[1] }}
          </v-btn>
        </v-btn-toggle>
      </div>
    </card>

    <card class="mb-3">
      <div class="createRealty__group">
        <div class="createRealty__title required">Описание и фотографии</div>
        <v-textarea
          v-model="model.description"
          prepend-icon="mdi-comment"
          :rules="[rules.required]"
          label="Описание *"
          type="text"
          rows="4"
          outlined
          counter
        />
      </div>
    </card>

    <div class="d-flex flex-row">
      <!--      <pre v-text="params.newBuildingParams"></pre> -->
      <!--      <pre v-text="params.secondaryBuildingParams"></pre>-->
      <!--      <pre v-text="secondaryBuildingParams"></pre>-->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CreateApartment extends Vue {
  params: Record<string, any> = {}

  newBuildingParams: any | null = {}
  secondaryBuildingParams: any | null = {}

  rules = {
    email: (v: any) =>
      !!(v || '').match(/@/) ||
      'Введите действительный адрес электронной почты',
    length: (len: any) => (v: any) =>
      (v || '').length >= len ||
      `Недопустимая длина символов, требуется ${len} символов`,
    maxValue: (len: any) => (v: any) =>
      (v || '') < len ||
      `Недопустимое значение, максимальное значение - ${len}`,
    password: (v: any) =>
      !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
      'Пароль должен содержать заглавную букву, цифру и специальный символ.',
    required: (v: any) => !!v || 'Это поле обязательно к заполнению',
  }

  model: Apartment = {
    id: null,
    description: '',
    address: {},
    adStatus: '',
    operationType: '',
    price: 0,
    category: 'apartment',
    decoration: '',
    marketType: '',
    houseType: '',
    floor: null,
    floors: null,
    rooms: -1,
    square: null,
    courtyard: '',
    kitchenSpace: null,
    newDevelopmentId: null,
    balconyOrLoggia: '',
    viewFromWindows: '',
    bathroomMulti: '',
    saleOptions: '',
    NDAdditionally: '',
    contactMethod: '',
    propertyRights: '',
    renovationType: '',
    SSAdditionally: '',
    leaseAppliances: [],
    roomType: '',
    status: '',
    inHouse: [],
    dealType: '',
    buildYear: null,
  }

  async mounted() {
    await this.getParams()
  }

  async getParams() {
    return await this.$axios
      .get('http://localhost:3000/api/realty/create-flat-params')
      .then((data) => {
        this.params = data.data
        this.initParams()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  initParams() {
    this.initSecondaryParams()
  }

  initSecondaryParams() {
    if (!this.params['secondaryBuildingParams']) {
      return (this.secondaryBuildingParams = null)
    }
    // Услуга продвижения Авито
    this.defineNewPropParams('adStatusTypeText', 'adStatusTypeText')

    // Тип объявления
    this.defineNewPropParams('operationTypeText', 'operationTypeText')

    // Принадлежность к рынку
    this.defineNewPropParams('marketTypeText', 'marketTypeText')

    // Тип дома
    this.defineNewPropParams('houseTypeText', 'houseTypeText')

    // Статус недвижимости
    this.defineNewPropParams('statusTypeText', 'statusTypeText')

    // Тип комнат
    this.defineNewPropParams('roomTypeText', 'roomTypeText')

    // Ремонт
    this.defineNewPropParams('renovationTypeText', 'renovationTypeText')

    // Право собственности
    this.defineNewPropParams('propertyRightsTypeText', 'propertyRightsTypeText')

    // Тип сделки
    this.defineNewPropParams('dealTypeText', 'dealTypeText')

    // Балкон или лоджия
    this.defineNewPropParams(
      'balconyOrLoggiaTypeText',
      'balconyOrLoggiaTypeText'
    )

    // Бытовая техника
    this.defineNewPropParams(
      'leaseAppliancesTypeText',
      'leaseAppliancesTypeText'
    )

    // Вид из окон
    this.defineNewPropParams(
      'viewFromWindowsTypeText',
      'viewFromWindowsTypeText'
    )

    // Двор
    this.defineNewPropParams('courtyardTypeText', 'courtyardTypeText')

    // Санузел
    this.defineNewPropParams('bathroomMultiTypeText', 'bathroomMultiTypeText')

    // Способ продажи
    this.defineNewPropParams('saleOptionsTypeText', 'saleOptionsTypeText')

    // Дополнительно
    this.defineNewPropParams('NDAdditionallyTypeText', 'NDAdditionallyTypeText')

    // В доме
    this.defineNewPropParams('inHouseTypeText', 'inHouseTypeText')

    // Дополнительно
    this.defineNewPropParams('SSAdditionallyTypeText', 'SSAdditionallyTypeText')

    // Способ связи
    this.defineNewPropParams('contactMethodTypeText', 'contactMethodTypeText')

    // Запрещаем дальнейшее редактирование объекта
    Object.preventExtensions(this.secondaryBuildingParams)
    Object.freeze(this.secondaryBuildingParams)
  }

  defineNewPropParams(prop: string, value: string) {
    return Object.defineProperty(this['secondaryBuildingParams'], prop, {
      value: Object.entries(this.params['secondaryBuildingParams'][value]),
      writable: false,
    })
  }
}
</script>
<style>
.createRealty__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.createRealty__title.required::after {
  content: ' *';
  color: red;
}
</style>
