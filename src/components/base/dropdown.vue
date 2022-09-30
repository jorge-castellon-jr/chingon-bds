<template>
  <q-select
    :value="value"
    :options="options"
    option-value="id"
    option-label="content"
    label="Select Job Site"
    rounded
    outlined
    dense
    @update="changeValue"
  ></q-select>
</template>

<script setup lang="ts">
// import { emit } from 'vue';
import { Job } from 'components/models';
import { PropType } from 'vue';

interface Props {
  value: Job;
  options?: Job[];
}
const props = defineProps({
  value: {
    type: Object as PropType<Job>,
    required: true,
  },
  options: {
    type: Array as PropType<Job[]>,
    required: true,
  },
});

const changeValue = (val: Event) => {
  emit('change', val);
};
</script>
