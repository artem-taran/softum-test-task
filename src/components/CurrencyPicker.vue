<template>
  <h2>Выберете валюту</h2>
  <ul>
    <li
      v-for="[currency, isPicked] in Object.entries(currencies)"
      :key="currency"
    >
      <label class="checkbox">
        <input
          type="checkbox"
          v-model="currencies[currency]"
          :checked="isPicked"
          @change="pick"
          class="
            form-checkbox
            appearance-none
            checked:bg-blue-600 checked:border-transparent
          "
        />
        {{ currency }}
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CurrencyPicker",
  emits: {
    "pick-currencies": null,
  },

  data() {
    return {
      currencies: {
        USD: false,
        EUR: false,
        RUB: false,
        PLN: false,
        GBP: false,
      },
    };
  },

  methods: {
    pick() {
      this.$emit("pick-currencies", this.picked);
    },
  },

  computed: {
    picked() {
      return Object.entries(this.currencies)
        .filter(([, isPicked]) => isPicked === true)
        .map(([currency]) => currency);
    },
  },
};
</script>
