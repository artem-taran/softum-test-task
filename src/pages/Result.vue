<template>
  <div>
    <h2>Результат:</h2>
    <p>
      Выбранная Вами дата: <b>{{ date }}</b>
    </p>
    <ul
      v-for="{
        currency,
        saleRateNB,
        purchaseRateNB,
        saleRate,
        purchaseRate,
      } in pickedRates"
      :key="saleRateNB"
    >
      <li>
        <b>Валюта: {{ currency }}</b
        ><br />
        saleRateNB: {{ saleRateNB }}, {{ sumOfNumber(saleRateNB) }},
        {{ isEven(sumOfNumber(saleRateNB)) }}
      </li>

      <li>
        purchaseRateNB: {{ purchaseRateNB }}, {{ sumOfNumber(purchaseRateNB) }}
        {{ isEven(sumOfNumber(purchaseRateNB)) }}
      </li>

      <li>
        saleRate: {{ saleRate }}, {{ sumOfNumber(saleRate) }},
        {{ isEven(sumOfNumber(saleRate)) }}
      </li>

      <li>
        purchaseRate: {{ purchaseRate }}, {{ sumOfNumber(purchaseRate) }}
        {{ isEven(sumOfNumber(purchaseRate)) }}
      </li>
    </ul>
    <button @click="$emit('back')">Вернуться на главную</button>
  </div>
</template>

<script>
export default {
  name: "ExchangeResult",
  emits: {
    back: null,
  },
  props: {
    date: {
      type: String,
      required: true,
    },
    rates: {
      type: Array,
      required: true,
    },
    currencies: {
      type: Array,
      required: true,
    },
  },

  methods: {
    sumOfNumber(n) {
      const numArr = [...String(n).replace(".", "")];
      return numArr.reduce((acc, n) => acc + Number(n), 0);
    },

    isEven(number) {
      return number % 2 === 0;
    },

    back() {
      this.$emit = "backHome";
      console.log("back-home was emmtied");
    },
  },

  computed: {
    pickedRates() {
      return this.rates.filter((r) => this.currencies.includes(r.currency));
    },
  },
};
</script>
