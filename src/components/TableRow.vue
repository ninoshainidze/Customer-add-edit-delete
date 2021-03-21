<template>
  <div>
    <tr v-for="(cell, index) in row" :key="index">
      <td style="width:94px;">{{ cell.username }}</td>
      <td style="width:94px;">{{ cell.password }}</td>
      <td style="width:94px;">{{ cell.role }}</td>
      <td>
        <button @click="Edit(cell.doc_id)">edit</button>
        <button @click="Delete(cell.doc_id)">delete</button>
      </td>
    </tr>
  </div>
</template>
<script>
export default {
  props: ["row"],

  methods: {
    Edit(doc_id) {
      this.$emit("edit", { isEditing: true, doc_id: doc_id });
    },
    Delete(doc_id) {
      this.$emit("delete", doc_id);
      console.log(doc_id);
    },
  },
};
</script>

<style scoped>

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
