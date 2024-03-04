<template>
  <div class="d-flex flex-row">

    <div style="width: 100%">
      <h3>Потенциальный клиент</h3>
      <draggable class="list-group" :list="myArray1" group="people">
        <div
          class="list-group-item"
          v-for="(element, index) in myArray1"
          :key="element.id"
        >
          {{ element.text }}
        </div>
      </draggable>
    </div>

    <div style="width: 100%">
      <h3>нет ответа</h3>
      <draggable class="list-group" :list="myArray2" group="people">
        <div class="list-group-item"
             v-for="(element, index) in myArray2"
             :key="element.id">
          {{ element.text }}
        </div>
      </draggable>
    </div>

    <div style="width: 100%">
      <h3>Покупатель прогрет</h3>
      <draggable class="list-group" :list="myArray3" group="people">
        <div class="list-group-item"
             v-for="(element, index) in myArray3"
             :key="element.id">
          {{ element.text }}
        </div>
      </draggable>
    </div>

    <div style="width: 100%">
      <h3>Переход в сделку</h3>
      <draggable class="list-group" :list="myArray4" group="people">
        <div class="list-group-item"
             v-for="(element, index) in myArray4"
             :key="element.id">
          {{ element.text }}
        </div>
      </draggable>
    </div>

    <div style="width: 100%">
      <h3>Закрыто не реализовано</h3>
      <draggable class="list-group" :list="myArray5" group="people">
        <div class="list-group-item"
             v-for="(element, index) in myArray5"
             :key="element.id">
          {{ element.text }}
        </div>
      </draggable>
    </div>


  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Funnel extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  dragOptions: any = {
    animation: 0,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  };

  myArray1: any = [
    {
      id: 1,
      text: "Лид 1",
      value: 1
    },
    {
      id: 2,
      text: "Лид 2",
      value: 2
    }
  ];

  myArray2: any = [
    {
      id: 3,
      text: "Лид 3",
      value: 3
    },
    {
      id: 4,
      text: "Лид 4",
      value: 4
    }
  ];

  myArray3: any = [
    {
      id: 5,
      text: "Лид 5",
      value: 5
    },
    {
      id: 6,
      text: "Лид 6",
      value: 6
    }
  ];

  myArray4: any = [
    {
      id: 7,
      text: "Лид 7",
      value: 7
    },
    {
      id: 8,
      text: "Лид 8",
      value: 8
    }
  ];

  myArray5: any = [
    {
      id: 9,
      text: "Лид 9",
      value: 9
    },
    {
      id: 10,
      text: "Лид 10",
      value: 10
    }
  ];

};
</script>

<style>
.list-group {
  width: 100%;
  height: auto;
  max-width: calc(100vw / 5);
  min-height: 120px;
  border: 1px solid #3c4043;
}
</style>
