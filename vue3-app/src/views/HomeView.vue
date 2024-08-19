<template>
  <div class="home">
    <h1>This is my vue3 web app that will send requests to my RESTful API Server</h1>

    <h2>Add user data by sending a POST request to my API server</h2>
    <!-- Form to Add a User -->
    <form @submit.prevent="addUser">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="newUser.name" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="newUser.email" id="email" required />
      </div>
      <button type="submit">Add User</button>
    </form>

    <!-- Display Users -->
    <h2>View the data in my PostgreSQL database using GET request</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} ({{ user.email }})
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      newUser: {
        name: '',
        email: ''
      },
      users: []
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async addUser() {
      try {
        const response = await axios.post('http://localhost:3000/users', this.newUser);
        this.users.push(response.data); // Add the new user to the list
        this.newUser.name = '';
        this.newUser.email = ''; // Reset form fields
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  },
  created() {
    this.fetchUsers(); // Fetch users when component is created
  }
};
</script>

<style scoped>
/* Add some basic styling */
form {
  margin-bottom: 20px;
}
form div {
  margin-bottom: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f4f4f4;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
}
</style>
