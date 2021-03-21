<template>
  <div class="container mt-5">
    <ValidationObserver>
      <ValidationProvider
        name="username"
        rules="required|alpha|max:5|min:3"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="username"
          />
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider
        name="password"
        rules="required|max:5|min:2"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="password"
          />
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider
        name="role"
        rules="required|max:5|min:2"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <select v-model="role">
            <option disabled value="">Please select role</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
    </ValidationObserver>

    <div v-if="!isEditing">
      <button @click="storeData">add</button>
    </div>
    <div v-else>
      <button @click="updateData">update</button>
    </div>
    <br />
    <table>
      <t-header />
      <t-row :row="tableRows" @delete="removeData" @edit="edit" />
    </table>
  </div>
</template>

<script>
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";

import firebase from "../firebase";
const db = firebase.firestore();

export default {
  name: "home",
  components: {
    THeader: TableHeader,
    TRow: TableRow,
  },
  data() {
    return {
      isEditing: false,
      username: "",
      password: "",
      role: "",
      items: [],
      updateDocId: "",
    };
  },

  methods: {
    storeData() {
      db.collection("members")
        .doc()
        .set({
          role: this.role,
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.getData();
          this.username = "";
          this.password = "";
          this.role = "";
        });
      console.log("sett");
    },
    removeData(doc_id) {
      db.collection("members")
        .doc(doc_id)
        .delete()
        .then(() => {
          this.username = "";
          this.password = "";
          this.role = "";
          this.isEditing = false;
          this.getData();
        });
      console.log(doc_id);
    },
    updateData() {
      db.collection("members")
        .doc(this.updateDocId)
        .update({
          role: this.role,
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.username = "";
          this.password = "";
          this.role = "";
          this.updateDocId = "";
          this.isEditing = false;
          this.getData();
        });
    },
    edit(data) {
      this.isEditing = data["isEditing"];
      this.updateDocId = data["doc_id"];
      console.log(this.items);
      this.items.map((customers) => {
        if (customers["doc_id"] == data["doc_id"]) {
          this.username = customers["username"];
          this.password = customers["password"];
          this.role = customers["role"];
        }
      });
    },

    getData() {
      this.items = [];
      db.collection("members")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const obj = Object.assign({}, doc.data(), { doc_id: doc.id });
            this.items.push(obj);
          });
        });
      console.log(this.items);
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    tableRows() {
      return this.items;
    },
  },
};
</script>


<style scoped>
.form-group span,
.error {
  color: red;
}
.container input,
.container select {
  width: 200px;
  height: 50px;
  padding: 0 20px;
  margin: 20px;
  font-size: 18px;
  border-radius: 10px;
  outline: none;
}
.container select {
  width: 260px;
}

.container input::placeholder {
  color: black;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
button {
  background: #00bcd4;
  border: none !important;
  border-radius: 50px;
  height: 40px;
  width: 90px;
}
</style>