<template>
  <h2>Пожалуйста выберете дату</h2>
  <input
    type="date"
    :min="startDateRange()"
    :max="endDateRange()"
    v-model="picked"
    @input="pick"
    class="date"
  />
</template>

<script>
import { format, subYears } from "date-fns";

export default {
  name: "DatePicker",
  emits: {
    "pick-date": null,
  },

  DATE_RANGE_YEARS: 2,

  data() {
    return {
      picked: "",
    };
  },

  methods: {
    pick() {
      this.$emit("pick-date", this.picked);
    },

    startDateRange() {
      return format(
        subYears(new Date(), this.$options.DATE_RANGE_YEARS),
        "yyyy-MM-dd"
      );
    },

    endDateRange() {
      return format(new Date(), "yyyy-MM-dd");
    },
  },
};
</script>
