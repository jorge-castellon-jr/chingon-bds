<template>
  <q-page class="row q-pt-lg justify-evenly q-mx-auto" style="max-width: 600px">
    <div class="col q-gutter-lg">
      <q-select
        v-model="selectedJob"
        :options="todos"
        option-label="label"
        label="Select Location / Lugar"
        outlined
      ></q-select>

      <!-- <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Item Name / Nombre</div>
          <q-input
            v-model="newItem.label"
            placeholder="Name / Nombre"
            outlined
            rounded
            dense
          />
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="text-h6">Amount / Cantidad</div>
          <div class="row q-py-sm q-col-gutter-sm">
            <div class="col-6">
              <q-input
                v-model="newItem.amount"
                outlined
                rounded
                dense
              ></q-input>
            </div>
            <div class="col-6">
              <q-select
                v-model="newItem.type"
                :options="[
                  { value: 'ft', label: 'Feet' },
                  { value: 'in', label: 'Inche(s)' },
                  { value: 'rolls', label: 'Roll(s)' },
                  { value: 'pipes', label: 'Pipe(s)' },
                ]"
                label="Type / Tipo"
                outlined
                rounded
                dense
              ></q-select>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical>
          <q-btn color="brown-4" push @click="addNewItem">
            Add Item to List / Agregar a la Lista
          </q-btn>
        </q-card-actions>
      </q-card> -->

      <q-list class="rounded-borders" bordered separator>
        <q-expansion-item
          label="Add New Item / Agregar Nuevo Item"
          expand-icon="add"
        >
          <q-card>
            <q-card-section>
              <div class="text-h6">Item Name / Nombre</div>
              <q-input
                v-model="newItem.label"
                placeholder="Name / Nombre"
                outlined
                rounded
                dense
              />
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <div class="text-h6">Amount / Cantidad</div>
              <div class="row q-py-sm q-col-gutter-sm">
                <div class="col-6">
                  <q-input
                    v-model="newItem.amount"
                    outlined
                    rounded
                    dense
                  ></q-input>
                </div>
                <div class="col-6">
                  <q-select
                    v-model="newItem.type"
                    :options="[
                      { value: 'ft', label: 'Feet' },
                      { value: 'in', label: 'Inche(s)' },
                      { value: 'rolls', label: 'Roll(s)' },
                      { value: 'pipes', label: 'Pipe(s)' },
                    ]"
                    label="Type / Tipo"
                    outlined
                    rounded
                    dense
                  ></q-select>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions vertical>
              <q-btn color="brown-4" push @click="addNewItem">
                Add Item to List / Agregar a la Lista
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          v-for="(item, index) in items"
          :key="item.label"
          :label="`${item.amount} ${item.type?.value} x ${item.label}`"
          expand-icon="edit"
          expand-icon-toggle
        >
          <q-card>
            <q-card-section>
              <div class="text-h6">Item Name / Nombre</div>
              <q-input
                v-model="item.label"
                placeholder="Name / Nombre"
                outlined
                rounded
                dense
              />
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <div class="text-h6">Amount / Cantidad</div>
              <div class="row justify-evenly items-center q-py-sm">
                <q-btn icon="remove" push round @click="item.amount--"></q-btn>
                <div class="text-h2">{{ item.amount }}</div>
                <q-btn icon="add" push round @click="item.amount++"></q-btn>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions vertical>
              <q-btn color="red-4" push @click="removeItem(index)">
                Remove Item / Eliminar
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>

    <q-footer
      v-if="items.length"
      bordered
      class="bg-white text-primary q-pa-sm row justify-center"
    >
      <q-btn class="full-width" color="primary" size="lg" push>
        Submit List / Mandar Lista
      </q-btn>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { Job, Item } from 'components/models';
import { Ref, ref } from 'vue';

const selectedJob = ref([]);
const newItem: Ref<Item> = ref({
  label: '',
  amount: 1,
  editing: false,
  type: null,
});
const items: Ref<Item[]> = ref([
  {
    label: 'Item 1',
    amount: 1,
    editing: false,
    type: { value: '', label: '' },
  },
  {
    label: 'Item 2',
    amount: 2,
    editing: false,
    type: { value: '', label: '' },
  },
  {
    label: 'Item 3',
    amount: 3,
    editing: false,
    type: { value: 'ft', label: 'Feet' },
  },
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
  if (newItem.value.type === null || newItem.value.type === undefined)
    newItem.value.type = { value: '', label: '' };

  items.value.push(newItem.value);
  newItem.value = {
    label: '',
    amount: 1,
    editing: false,
    type: null,
  };
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
};

const newItemEdit = () => {
  newItem.value.editing = !newItem.value.editing;
};
</script>
