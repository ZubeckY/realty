<template>
  <div>
    <card>
      <div class="d-flex flex-row">
        <div class="dealColumn">
          <div class="dealColumn__container">
            <h3 :class="'dealColumn__title ' + usableText">
              Потенциальный клиент
            </h3>
            <draggable
              class="dealColumn__list"
              :list="potentialClientList"
              group="people"
            >
              <card
                class="dealColumn__list-item"
                v-for="(element, index) in potentialClientList"
                :key="element.id"
              >
                {{ element.text }}
              </card>
            </draggable>
          </div>
        </div>

        <div class="dealColumn">
          <div class="dealColumn__container">
            <h3 :class="'dealColumn__title ' + usableText">Нет ответа</h3>
            <draggable
              class="dealColumn__list"
              :list="noAnswerList"
              group="people"
            >
              <card
                class="dealColumn__list-item"
                v-for="(element, index) in noAnswerList"
                :key="element.id"
              >
                {{ element.text }}
              </card>
            </draggable>
          </div>
        </div>

        <div class="dealColumn">
          <div class="dealColumn__container">
            <h3 :class="'dealColumn__title ' + usableText">
              Покупатель прогрет
            </h3>
            <draggable
              class="dealColumn__list"
              :list="isWarmedUpList"
              group="people"
            >
              <card
                class="dealColumn__list-item"
                v-for="(element, index) in isWarmedUpList"
                :key="element.id"
              >
                {{ element.text }}
              </card>
            </draggable>
          </div>
        </div>

        <div class="dealColumn">
          <div class="dealColumn__container">
            <h3 :class="'dealColumn__title ' + usableText">Переход в сделку</h3>
            <draggable
              class="dealColumn__list"
              :list="goingDealList"
              group="people"
            >
              <card
                class="dealColumn__list-item"
                v-for="(element, index) in goingDealList"
                :key="element.id"
              >
                {{ element.text }}
              </card>
            </draggable>
          </div>
        </div>

        <div class="dealColumn">
          <div class="dealColumn__container">
            <h3 :class="'dealColumn__title ' + usableText">
              Закрыто не реализовано
            </h3>
            <draggable
              class="dealColumn__list"
              :list="closedList"
              group="people"
            >
              <card
                class="dealColumn__list-item"
                v-for="(element, index) in closedList"
                :key="element.id"
              >
                {{ element.text }}
              </card>
            </draggable>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import { DealStages } from "~/assets/script/models/DealStages"

@Component
export default class Funnel extends Vue {
  lastChangedList: string = ''

  potentialClientList: any = [
    {
      id: 1,
      text: 'Лид 1',
      value: 1,
      stage: DealStages['new_client']
    },
    {
      id: 2,
      text: 'Лид 2',
      value: 2,
      stage: DealStages['new_client']
    },
  ]

  noAnswerList: any = [
    {
      id: 3,
      text: 'Лид 3',
      value: 3,
      stage: DealStages['no_answer']
    },
    {
      id: 4,
      text: 'Лид 4',
      value: 4,
      stage: DealStages['no_answer']
    },
  ]

  isWarmedUpList: any = [
    {
      id: 5,
      text: 'Лид 5',
      value: 5,
      stage: DealStages['is_warmed_up']
    },
    {
      id: 6,
      text: 'Лид 6',
      value: 6,
      stage: DealStages['is_warmed_up']
    },
  ]

  goingDealList: any = [
    {
      id: 7,
      text: 'Лид 7',
      value: 7,
      stage: DealStages['going_to_deal']
    },
    {
      id: 8,
      text: 'Лид 8',
      value: 8,
      stage: DealStages['going_to_deal']
    },
  ]

  closedList: any = [
    {
      id: 9,
      text: 'Лид 9',
      value: 9,
      stage: DealStages['is_closed']
    },
    {
      id: 10,
      text: 'Лид 10',
      value: 10,
      stage: DealStages['is_closed']
    },
  ]

  @Watch('potentialClientList')
  showChangePotentialClientList() {
    const stage = DealStages['new_client']
    const listItem = this.potentialClientList.filter((item: any) => item.stage !== stage)
    if (!listItem) {
      this.lastChangedList = 'potentialClientList'
      console.log('lastChangedList = ', this.lastChangedList);
    }

    console.log('draggableItem = ', listItem);

    console.log('changes potentialClientList')
  }

  @Watch('noAnswerList')
  showChangeNoAnswerList() {
    const stage = DealStages['no_answer']
    const listItem = this.noAnswerList.filter((item: any) => item.stage !== stage)
    if (!listItem) {
      this.lastChangedList = 'noAnswerList'
      console.log('lastChangedList = ', this.lastChangedList);
    }

    console.log('draggableItem = ', listItem);

    console.log('changes noAnswerList')
  }

  @Watch('isWarmedUpList')
  showChangeIsWarmedUpList() {
    const stage = DealStages['is_warmed_up']
    const listItem = this.isWarmedUpList.filter((item: any) => item.stage !== stage)
    if (!listItem) {
      this.lastChangedList = 'isWarmedUpList'
      console.log('lastChangedList = ', this.lastChangedList);
    }

    console.log('draggableItem = ', listItem);

    console.log('changes isWarmedUpList')
  }

  @Watch('goingDealList')
  showChangeGoingDealList() {
    const stage = DealStages['going_to_deal']
    const listItem = this.goingDealList.filter((item: any) => item.stage !== stage)
    if (!listItem) {
      this.lastChangedList = 'goingDealList'
      console.log('lastChangedList = ', this.lastChangedList);
    }

    console.log('draggableItem = ', listItem);

    console.log('changes goingDealList')
  }

  @Watch('closedList')
  showChangeClosedList() {
    const stage = DealStages['is_closed']
    const listItem = this.closedList.filter((item: any) => item.stage !== stage)
    if (!listItem) {
      this.lastChangedList = 'closedList'
      console.log('lastChangedList = ', this.lastChangedList);
    }

    console.log('draggableItem = ', listItem);

    console.log('changes closedList')
  }

  get usableText() {
    return new ColorTheme().text()
  }
}
</script>
