<template>
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
      <div class="row justify-evenly items-center q-py-sm">
        <q-btn icon="remove" push round @click="newItem.amount--" />
        <div class="text-h2">{{ newItem.amount }}</div>
        <q-btn icon="add" push round @click="newItem.amount++" />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn color="brown-4" push @click="addNewItem">
        Add Item to List / Agregar a la Lista
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup></script>

<style lang="scss" scoped></style>
