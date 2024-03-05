<template>
  <div>
    <div v-if="!hideTitle" class="params-title">Ответственный менеджер</div>
    <div class="params-content mt-2">
      <v-autocomplete v-model="managerCurrent"
                      label="Выберите менеджера"
                      color="primary darken-1"
                      :items="managerList"
                      item-text="name"
                      item-value="name"
                      deletable-chips chips
                      outlined dense
                      multiple>
        <template v-slot:selection="data">
          <v-chip v-bind="data.attrs"
                  :input-value="data.selected"
                  close @click="data.select"
                  @click:close="remove(data.item)">
            <v-avatar left>
              <v-img :src="data.item.avatar"></v-img>
            </v-avatar>
            {{ data.item.name }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-avatar>
              <img :src="data.item.avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, VModel, Vue, Prop } from "vue-property-decorator";

@Component
export default class FilterManager extends Vue {
  @VModel() managerCurrent!: any;
  @Prop({ default: false }) hideTitle?: boolean

  srcs = {
    1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
    5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
  };

  managerList: any = [
    { header: "Администратор" },
    { name: "Trevor Hansen", group: "Администратор", avatar: this.srcs[1] },
    { divider: true },
    { header: "РОП" },
    { name: "Sandra Adams", group: "РОП", avatar: this.srcs[3] },
    { name: "Ali Connors", group: "РОП", avatar: this.srcs[2] },
    { name: "Tucker Smith", group: "РОП", avatar: this.srcs[2] },
    { divider: true },
    { header: "Менеджер" },
    { name: "Britta Holt", group: "Менеджер", avatar: this.srcs[4] },
    { name: "Jane Smith ", group: "Менеджер", avatar: this.srcs[5] },
    { name: "John Smith", group: "Менеджер", avatar: this.srcs[1] },
    { name: "Sandra Williams", group: "Менеджер", avatar: this.srcs[3] }
  ];

  remove(item: Record<string, unknown>) {
    const index = this.managerCurrent.indexOf(item.name);
    if (index >= 0) this.managerCurrent.splice(index, 1);
  }
};
</script>
