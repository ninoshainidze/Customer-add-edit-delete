<template>
  <div>
    <tr>
      <th>username</th>
      <th>password</th>
      <th style="width:94px;">role</th>
      <th style="width:145px;">#</th>
    </tr>
  </div>
</template>
<script>
export default {
  props: ["header"],
};
</script>


<style scoped>

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>