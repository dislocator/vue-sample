<template>
  <div id="app">
    <h2>May the force be with you</h2>
    <el-row :gutter="24">
      <el-col :span="8" :offset="8">
        <div>
          <div>
            <h3>Add Client</h3>
            <el-form ref="newClient" label-width="80px">
              <el-form-item label="Name">
                <el-input v-model="newClient.name"></el-input>
              </el-form-item>
              <el-form-item label="Url">
                <el-input placeholder="Client Url" v-model="newClient.url">
                <template slot="prepend">https://</template>
                <template slot="append">.telforce.biz</template>
                </el-input>
              </el-form-item>
              <el-form-item label="# of Id">
                <el-input-number v-model="newClient.number_of_id" :min="5"></el-input-number>
              </el-form-item>
              <el-form-item label="is Active?">
                <el-switch v-model="newClient.is_active"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addClient">Add Client</el-button>
                <el-button>Cancel</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    
    <template>
      <el-table :data="clients" border :default-sort = "{prop: 'name', order: 'descending'}" style="width: 100%">
        <el-table-column prop="name" label="Server Name" sortable width="180"></el-table-column>
        <el-table-column prop="url" label="Client Name" width="260"></el-table-column>
        <el-table-column prop="number_of_id" label="# of ID"></el-table-column>
        <el-table-column label="is Active?">
          <template scope="scope">
            <el-switch>{{scope.clients.is_active}}</el-switch>
          </template>
        </el-table-column>
        <el-table-column label="Action">
          <template scope="scope">
            <el-button size="small" @click="removeClient" :plain="true" type="danger">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <table>
      <thead>
        <tr>
          <th>
            client name
          </th>
          <th>
            # of id
          </th>
          <th>
            active?
          </th>
          <th>
            delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients">
          <td>
            <a v-bind:href="client.url">{{client.name}}</a>
          </td>
          <td>
            {{client.number_of_id}}
          </td>
          <td>
            {{client.is_active}}
          </td>
          <td>
            <span v-on:click="removeClient(client)">Delete</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import Firebase from 'firebase'

let config = {
  apiKey: "AIzaSyA4GV3KfLeJedfRwRaE5IBE2k0fwk40b8Q",
  authDomain: "telforce1-d36ec.firebaseapp.com",
  databaseURL: "https://telforce1-d36ec.firebaseio.com",
  projectId: "telforce1-d36ec",
  storageBucket: "telforce1-d36ec.appspot.com",
  messagingSenderId: "720380217687"
}

let app = Firebase.initializeApp(config);
let db = app.database();

let clientRef = db.ref('clients');

export default {
  name: 'app',
  firebase: {
    clients: clientRef
  },
  data () {
    return {
      newClient: {
        name: '',
        url: '',
        number_of_id:'',
        is_active: false
      }
    }
  },
  methods: {
    addClient: function() {
      this.newClient.url = "https://" + this.newClient.url + '.telforce.biz';
      clientRef.push(this.newClient);
      this.newClient.name = '';
      this.newClient.url = '';
      this.newClient.number_of_id = '';
      this.newClient.is_active = '';
    },
    removeClient: function(client) {
      clientRef.child(client['.key']).remove();
    }
  }
}
</script>

<style lang="">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
