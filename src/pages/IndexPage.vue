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

      <q-card v-if="selectedJob" flat bordered>
        <q-card-section>
          <div class="text-h6">Who's Sending</div>
          <template v-if="selectedJob.senders.length">
            <q-radio
              v-for="senderOption in selectedJob.senders"
              :key="senderOption"
              v-model="sender"
              :val="senderOption"
              :label="senderOption"
            />
          </template>
          <div v-else class="text-caption">No Senders available</div>
        </q-card-section>
      </q-card>

      <q-list class="rounded-borders" bordered>
        <q-expansion-item
          label="Add New Item / Agregar Nuevo Item"
          expand-icon="add"
        >
          <q-card>
            <q-card-section>
              <div class="text-h6">Item Name / Nombre</div>
              <!-- <q-input
                v-model="newItem.label"
                placeholder="Name / Nombre"
                outlined
                rounded
                dense
              /> -->
              <div class="row q-py-sm q-col-gutter-sm">
                <div class="col-7">
                  <q-input
                    v-model="newItem.label"
                    placeholder="Name / Nombre"
                    outlined
                    rounded
                    dense
                  />
                </div>
                <div class="col-5">
                  <q-select
                    v-model="newItem.material"
                    :options="[
                      'Copper',
                      'PEX',
                      'PVC',
                      'ABS',
                      'Castiron',
                      'Galvanized',
                    ]"
                    label="Material"
                    outlined
                    rounded
                    dense
                  ></q-select>
                </div>
              </div>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <div class="text-h6">Amount / Cantidad</div>
              <div class="row q-py-sm q-col-gutter-sm">
                <div class="col-7">
                  <q-input
                    v-model="newItem.amount"
                    pattern="\d*"
                    outlined
                    rounded
                    dense
                  ></q-input>
                </div>
                <div class="col-5">
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
          :label="`${item.amount} ${item.type?.value} x ${item.material} ${item.label}`"
          expand-icon="edit"
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
                v-model="phone"
                pattern="\d*"
                mask="(###) ### - ####"
                placeholder="(###) ### - ####"
                outlined
                rounded
                dense
              />

              <q-list v-if="phoneList.length" class="q-pt-sm">
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
                      push
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

const selectedJob: Ref<Job> | Ref<any> = ref(null);
const sender = ref('');
const newItem: Ref<Item> = ref({
  label: '',
  amount: 1,
  editing: false,
  type: null,
  material: '',
});
const items: Ref<Item[]> = ref([
  {
    label: 'Item 1',
    amount: 1,
    editing: false,
    type: { value: 'roll', label: 'Roll' },
    material: 'PEX',
  },
  {
    label: 'Item 2',
    amount: 2,
    editing: false,
    type: { value: 'pipes', label: 'Pipes' },
    material: 'PVC',
  },
  {
    label: 'Item 3',
    amount: 3,
    editing: false,
    type: { value: 'ft', label: 'Feet' },
    material: 'ABS',
  },
]);

const jobs = ref<Job[]>([
  {
    value: 1,
    label: 'Manteca',
    senders: ['John Doe', 'Jane Doe'],
  },
  {
    value: 2,
    label: 'Sacramento',
    senders: ['John Doe', 'Jane Doe'],
  },
  {
    value: 3,
    label: 'Mountain View',
    senders: ['John Doe', 'Jane Doe'],
  },
  {
    value: 4,
    label: 'San Francisco',
    senders: ['John Doe', 'Jane Doe'],
  },
  {
    value: 5,
    label: 'San Jose',
    senders: [],
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
    material: '',
  };
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
};
const removeAllItems = () => {
  items.value = [];
};

const sendMessage = () => {
  if (selectedJob.value === null) {
    notifyError('Please select a job / Por favor seleccione un trabajo');
    return;
  }
  if (sender.value === '' && selectedJob.value.senders.length !== 0) {
    notifyError('Please select a sender / Por favor seleccione un remitente');
    return;
  }
  if (items.value.length === 0) {
    notifyError('Please add items / Por favor agregue items');
    return;
  }
  const data = {
    passcode: '123456',
    message: `
    Location: ${selectedJob.value?.label}
Sender: ${sender.value}
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
    color: 'red-5',
    position: 'center',
    icon: 'error',
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
