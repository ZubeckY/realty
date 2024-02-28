<template>
  <card class="py-1 px-0">
    <v-btn v-for="({link, title, icon}, i) in sortProfileLinks"
           :class="'justify-start ' + themes[activeTheme]['title']"
           :key="'profile-list-item-' + i"
           @click="$router.push(link)"
           block x-small text>
      <v-icon class="mr-1" x-small>{{ icon }}</v-icon>
      <span>{{ title }}</span>
    </v-btn>

    <v-btn :class="'justify-start ' + themes[activeTheme]['text']" block x-small text>
      <v-icon class="mr-1" x-small>mdi-cog</v-icon>
      <span>Настроить меню</span>
    </v-btn>
  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "~/components/card.vue";

@Component({
  components: { Card }
})
export default class HeaderComponentButtons extends Vue {
  @Prop() userID!: number;
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  profileLinks = [
    {
      position: 10,
      icon: "mdi-account",
      title: "Профиль",
      link: this.getProfileLink(),
      access: true,
      showItem: true
    },
    {
      position: 20,
      icon: "mdi-city",
      title: "Недвижимость",
      link: "/",
      access: true,
      showItem: true
    },
    {
      position: 20,
      icon: "mdi-lead-pencil",
      title: "Лиды",
      link: "/leads",
      access: this.leadCondition,
      showItem: true
    },
    {
      position: 30,
      icon: "mdi-account-multiple-outline",
      title: "Клиенты",
      link: "/clients",
      access: true,
      showItem: true
    },
    {
      position: 40,
      icon: "mdi-triangle-down",
      title: "Воронка",
      link: "/funnel",
      access: true,
      showItem: true
    },
    {
      position: 50,
      icon: "mdi-ticket-confirmation",
      title: "Бронь",
      link: "/reservation",
      access: true,
      showItem: true
    },
    {
      position: 60,
      icon: "mdi-file-arrow-left-right",
      title: "Фиды",
      link: "/feeds",
      access: true,
      showItem: true
    },
    {
      position: 70,
      icon: "mdi-chess-rook",
      title: "Шахматка",
      link: "/chess",
      access: true,
      showItem: true
    }
  ];

  get filterProfileLinks() {
    return this.profileLinks.filter((item) => item.access);
  }

  get sortProfileLinks() {
    return this.filterProfileLinks.sort(function(a: any, b: any) {
      return a.position - b.position;
    });
  }

  getProfileLink(): string {
    return "/profile/" + this.userID;
  }

  get leadCondition() {
    return true;
  }

}
</script>
