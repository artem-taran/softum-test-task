<template>
  <!-- Данный компонент (Home) - главный компонент приложения, он управляет
  логикой получение данных из модального окна и  показа/сокрытия результата -->
  <div class="home" v-if="!resultIsShowed">
    <div>
      <h1>Добро пожаловать!</h1>
      <button @click="openPopup" class="button small">Выбрать дату</button>
    </div>
  </div>

  <!-- Компонент, который обрабатывает данные
  полученные из модалки-->
  <Result
    @back="hideResult()"
    :date="date"
    :currencies="currencies"
    :rates="rates"
    v-else
  />

  <!-- В модальном окне с помощью слотов получаем дату и вылюты от пользователя-->
  <ExchangePopup ref="exchangePopup">
    <template #date>
      <DatePicker @pick-date="addDate" />
    </template>

    <template #currency>
      <CurrencyPicker @pick-currencies="addCurrencies" />
    </template>

    <template #actions="{ confirm }">
      <button
        :disabled="!isDataCollected"
        @click="
          confirm();
          showResult();
        "
      >
        Проверить
      </button>
    </template>
  </ExchangePopup>
</template>

<script>
import Result from "./Result.vue";
import DatePicker from "../components/DatePicker.vue";
import CurrencyPicker from "../components/CurrencyPicker.vue";
import ExchangePopup from "../components/ExchangePopup.vue";

import { loadRates } from "../api.js";

export default {
  name: "Home",

  components: {
    Result,
    DatePicker,
    CurrencyPicker,
    ExchangePopup,
  },

  data() {
    return {
      date: "",
      currencies: [],
      rates: [],
      resultIsShowed: false,
    };
  },

  methods: {
    addDate(pickedDate) {
      this.date = pickedDate;
      this.addRates();
    },

    addCurrencies(pickedCurrencies) {
      this.currencies = pickedCurrencies;
    },

    async addRates() {
      this.rates = await loadRates(this.date);
    },

    /* Эта функция вызывает метод модального окна,
      который отвечает за его открытие, таким образом
      упростив логику управления этим компонентом */
    openPopup() {
      this.$refs.exchangePopup.open();
    },

    showResult() {
      this.resultIsShowed = true;
      window.history.pushState(null, document.title, "/result");
    },

    hideResult() {
      (this.resultIsShowed = false), console.log("Result is false");
      window.history.replaceState(null, document.title, "/");

      this.date = "";
      this.currencies = [];
    },
  },

  computed: {
    isDataCollected() {
      return Boolean(this.date) && this.currencies.length > 0;
    },
  },
};
</script>
