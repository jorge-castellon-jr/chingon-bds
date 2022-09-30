<template>
  <q-page class="row q-mt-lg justify-evenly q-mx-auto" style="max-width: 600px">
    <div class="col q-gutter-lg">
      <q-select
        v-model="selectedJob"
        :options="todos"
        option-label="label"
        label="Select Job Site"
        rounded
        outlined
      ></q-select>

      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Item Name</div>
          <q-input
            v-model="newItem.label"
            placeholder="Name here"
            outlined
            rounded
            dense
          />
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="text-h6">Add Item</div>
          <div class="row justify-evenly items-center q-py-sm">
            <q-btn icon="remove" push round @click="newItem.amount--"></q-btn>
            <!-- <q-input
              v-model.number="newItem.amount"
              type="number"
              outlined
              rounded
            /> -->
            <div class="text-h2">{{ newItem.amount }}</div>
            <q-btn icon="add" push round @click="newItem.amount++"></q-btn>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical>
          <q-btn color="brown-4" push @click="addNewItem">
            Add Item to List
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-list
        v-if="items.length > 0"
        class="rounded-borders"
        bordered
        separator
      >
        <q-expansion-item
          v-for="(item, index) in items"
          :key="item.label"
          :label="`${item.amount} x ${item.label}`"
          expand-icon="edit"
          expand-icon-toggle
        >
          <q-card>
            <q-card-section>
              <div class="text-h6">Item Name</div>
              <q-input
                v-model="item.label"
                placeholder="Name here"
                outlined
                rounded
                dense
              />
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <div class="text-h6">Add Item</div>
              <div class="row justify-evenly items-center q-py-sm">
                <q-btn icon="remove" push round @click="item.amount--"></q-btn>
                <!-- <q-input
              v-model.number="newItem.amount"
              type="number"
              outlined
              rounded
            /> -->
                <div class="text-h2">{{ item.amount }}</div>
                <q-btn icon="add" push round @click="item.amount++"></q-btn>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions vertical>
              <q-btn color="red-4" push @click="removeItem(index)">
                Remove Item
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>

    <teleport to="#appFooter">
      <q-btn class="full-width" color="primary" size="lg" push>
        Submit List
      </q-btn>
    </teleport>
  </q-page>
</template>

<script setup lang="ts">
import { Job, Item } from 'components/models';
import { Ref, ref } from 'vue';

const selectedJob = ref([]);
const newItem: Ref<Item> = ref({ label: '', amount: 0 });
const items: Ref<Item[]> = ref([
  { label: 'Item 1', amount: 1 },
  { label: 'Item 2', amount: 2 },
  { label: 'Item 3', amount: 3 },
]);

const todos = ref<Job[]>([
  {
    value: 1,
    label: 'Manteca',
  },
  {
    value: 2,
    label: 'Sacramento',
  },
  {
    value: 3,
    label: 'Mountain View',
  },
  {
    value: 4,
    label: 'San Francisco',
  },
  {
    value: 5,
    label: 'San Jose',
  },
]);

const addNewItem = () => {
  if (newItem.value.label === '') return;

  items.value.push(newItem.value);
  newItem.value = { label: '', amount: 0 };
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
};
</script>
