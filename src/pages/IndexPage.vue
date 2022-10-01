<template>
  <q-page class="row q-pt-lg justify-evenly q-mx-auto" style="max-width: 600px">
    <div class="col q-gutter-lg">
      <q-select
        v-model="selectedJob"
        :options="jobs"
        option-label="label"
        label="Select Location / Lugar"
        outlined
      ></q-select>
      <q-list class="rounded-borders" bordered>
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
      </q-list>
      <q-list v-if="items.length" class="rounded-borders" bordered separator>
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

      <q-list class="rounded-borders" bordered>
        <q-expansion-item label="Options / Opciones" expand-icon="settings">
          <q-card>
            <q-separator />
            <q-card-section>
              <div class="text-h6">Add Phone Number / Agregar Numero</div>
              <q-input
                outlined
                rounded
                v-model="phone"
                mask="(###) ### - ####"
                placeholder="(###) ### - ####"
                dense
              />

              <q-list>
                <q-item
                  v-for="(item, index) in phoneList"
                  :key="item"
                  class="row"
                  dense
                >
                  <div class="col items-center">- {{ item }}</div>
                  <div class="col-auto">
                    <q-btn
                      icon="delete"
                      color="red-4"
                      size="sm"
                      @click="removePhone(index)"
                    />
                  </div>
                </q-item>
              </q-list>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <q-btn
                class="full-width"
                color="brown-5"
                icon="add"
                push
                @click="addPhone"
              />
            </q-card-section>

            <q-separator />

            <q-card-actions vertical>
              <q-btn color="red-5" push @click="removeAllItems">
                Remove All Items / Eliminar Todo
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>

    <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <q-footer
        v-if="items.length"
        bordered
        class="bg-white text-primary q-pa-sm row justify-center"
      >
        <q-btn
          class="full-width"
          color="primary"
          size="lg"
          push
          @click="sendMessage"
        >
          Submit List / Mandar Lista
        </q-btn>
      </q-footer>
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { Job, Item } from 'components/models';
import { Ref, ref } from 'vue';
import { Notify } from 'quasar';

const selectedJob: Ref<Job> | Ref<null> = ref(null);
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
    type: { value: 'roll', label: 'Roll' },
  },
  {
    label: 'Item 2',
    amount: 2,
    editing: false,
    type: { value: 'pipes', label: 'Pipes' },
  },
  {
    label: 'Item 3',
    amount: 3,
    editing: false,
    type: { value: 'ft', label: 'Feet' },
  },
]);

const jobs = ref<Job[]>([
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

const phone = ref('');
const phoneList = ref<string[]>([]);

const addPhone = () => {
  if (phone.value) {
    phoneList.value.push(phone.value);
    phone.value = '';
  }
};

const removePhone = (index: number) => {
  phoneList.value.splice(index, 1);
};

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
const removeAllItems = () => {
  items.value = [];
};

const newItemEdit = () => {
  newItem.value.editing = !newItem.value.editing;
};

const sendMessage = () => {
  const data = {
    passcode: '123456',
    message: `
    Location: ${selectedJob.value?.label}
Date: ${new Date().toLocaleDateString()}
Items:
${items.value
  .map((item) => `${item.amount} ${item.type?.value} x ${item.label}`)
  .join('\n')}
    `,
    recipients:
      '+19165822335' +
      (phoneList.value.length ? ',' : '') +
      phoneList.value.map((phone) => phone.replace(/\D/g, '')).join(',+1'),
  };

  fetch('https://sms-notifications-4375-u8hqok.twil.io/send-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }

      if (resp.status === 401) {
        notifyError('Unauthorized');
        throw new Error('Invalid Passcode');
      } else {
        notifyError('Error');
        throw new Error(
          'Unexpected error. Please check the logs for what went wrong.'
        );
      }
    })
    .then((body) => {
      console.log(body);
      removeAllItems();
      notifySuccess('Sent messages. Check logs for details');
    })
    .catch((err) => {
      console.log(err);
      notifyError(err.message);
    });
};

const notifyError = (err: string) => {
  Notify.create({
    message: 'Error: ' + err,
    color: 'negative',
    position: 'center',
    timeout: 3000,
  });
};
const notifySuccess = (message: string) => {
  Notify.create({
    message,
    color: 'positive',
    position: 'bottom',
    timeout: 3000,
  });
};
</script>
