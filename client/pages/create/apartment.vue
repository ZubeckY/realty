<template>
  <div>
    <h3>Добавление квартиры</h3>

    <card class="my-3">
      <div class="create-realty__group">
        <div class="create-realty__title required">Адрес</div>
      </div>
    </card>

    <card class="mb-3">
      <!-- Принадлежность к рынку -->
      <div class="create-realty__group">
        <div class="create-realty__title required">Принадлежность к рынку</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
      <div class="create-realty__group mt-3">
        <div class="create-realty__title">Способ продажи</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
      <div class="create-realty__group mt-3">
        <div class="create-realty__title required">Тип недвижимости</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
      <div class="create-realty__group mt-3">
        <div class="create-realty__title required">Тип объявления</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
        class="create-realty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="create-realty__title required">Тип сделки</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
      <div class="create-realty__group mt-3">
        <div class="create-realty__title">Услуга продвижения Avito</div>
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
      <div class="create-realty__group mt-3">
        <div class="create-realty__title required">Площадь</div>
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
        class="create-realty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="create-realty__title required">Площадь кухни</div>
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
      <div class="create-realty__group">
        <div class="create-realty__title required">Этаж и этажность</div>
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
        class="create-realty__group"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="create-realty__title required">Ремонт</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
          class="radius ma-0 pa-0"
          v-model="model.renovationType"
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
        class="create-realty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="create-realty__title required">Тип комнат</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
      <div class="create-realty__group mt-3">
        <div class="create-realty__title required">Количество комнат</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
        class="create-realty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="create-realty__title">Год постройки</div>
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
        class="create-realty__group"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="create-realty__title">В доме</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
        class="create-realty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="create-realty__title">Бытовая техника</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
        class="create-realty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="create-realty__title">Дополнительно</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
        class="create-realty__group mt-3"
        v-if="model.marketType === 'secondary_building'"
      >
        <div class="create-realty__title">Дополнительно</div>
        <v-btn-toggle
          :color="themes[activeTheme]['primaryColor']"
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
      <div class="create-realty__group">
        <div class="create-realty__title required">Описание и фотографии</div>
        <v-textarea
          :color="themes[activeTheme]['primaryColor']"
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
      <!--       <pre v-text="params.newBuildingParams"></pre> -->
      <pre v-text="params.secondaryBuildingParams"></pre>
      <!--      <pre v-text="secondaryBuildingParams"></pre>-->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '~/components/card.vue'

@Component({
  components: { Card },
})
export default class CreateApartment extends Vue {
  params: any = {}
  themes: any = this.$store.state.themes
  activeTheme: string = this.$store.state.activeTheme
  newBuildingParams: any = {}
  secondaryBuildingParams: any = {}

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

  cleanModel() {}

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
    this.secondaryBuildingParams['adStatusTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['adStatusTypeText']
    )
    // Тип объявления
    this.secondaryBuildingParams['operationTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['operationTypeText']
    )
    // Принадлежность к рынку
    this.secondaryBuildingParams['marketTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['marketTypeText']
    )
    // Тип дома
    this.secondaryBuildingParams['houseTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['houseTypeText']
    )
    // Статус недвижимости
    this.secondaryBuildingParams['statusTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['statusTypeText']
    )
    // Тип комнат
    this.secondaryBuildingParams['roomTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['roomTypeText']
    )
    // Ремонт
    this.secondaryBuildingParams['renovationTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['renovationTypeText']
    )
    // Право собственности
    this.secondaryBuildingParams['propertyRightsTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['propertyRightsTypeText']
    )
    // Тип сделки
    this.secondaryBuildingParams['dealTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['dealTypeText']
    )
    // Балкон или лоджия
    this.secondaryBuildingParams['balconyOrLoggiaTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['balconyOrLoggiaTypeText']
    )
    // Бытовая техника
    this.secondaryBuildingParams['leaseAppliancesTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['leaseAppliancesTypeText']
    )
    // Вид из окон
    this.secondaryBuildingParams['viewFromWindowsTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['viewFromWindowsTypeText']
    )
    // Двор
    this.secondaryBuildingParams['courtyardTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['courtyardTypeText']
    )
    // Санузел
    this.secondaryBuildingParams['bathroomMultiTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['bathroomMultiTypeText']
    )
    // Способ продажи
    this.secondaryBuildingParams['saleOptionsTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['saleOptionsTypeText']
    )
    // Дополнительно
    this.secondaryBuildingParams['NDAdditionallyTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['NDAdditionallyTypeText']
    )
    // В доме
    this.secondaryBuildingParams['inHouseTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['inHouseTypeText']
    )
    // Дополнительно
    this.secondaryBuildingParams['SSAdditionallyTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['SSAdditionallyTypeText']
    )
    // Способ связи
    this.secondaryBuildingParams['contactMethodTypeText'] = Object.entries(
      this.params['secondaryBuildingParams']['contactMethodTypeText']
    )
    // Запрещаем дальнейшее редактирование объекта
    Object.preventExtensions(this.secondaryBuildingParams)
    Object.freeze(this.secondaryBuildingParams)
  }
}
</script>
<style>
.create-realty__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.create-realty__title.required::after {
  content: ' *';
  color: red;
}

.small-input {
  width: 100%;
  max-width: 250px;
}
</style>
