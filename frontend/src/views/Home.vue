<template>
  <div class="home bg-dark table-responsive">
    <Alert
      v-if="deletedAlert"
      className="danger"
      :message="alertMessage"
      icon="trash-alt"
    />
    <Alert
      v-if="createdAlert"
      className="success"
      :message="alertMessage"
      icon="check-circle"
    />
    <Alert
      v-if="updatedAlert"
      className="primary"
      :message="alertMessage"
      icon="user-edit"
    />
    <div class="table-responsive">
      <table class="mb-5 table table-dark table-hover container-fluid">
        <thead>
          <tr>
            <th
              v-for="title in columnTitles"
              :key="getIndex(columnTitles, title)"
            >
              {{ title }}
            </th>
          </tr>
        </thead>
        <tbody v-if="users.length > 0">
          <tr v-for="user in users" :key="user.id">
            <th scope="row">{{ getIndex(users, user) }}</th>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.country }}</td>
            <td>{{ user.city }}</td>
            <td>
              <router-link
                :to="{ name: 'EditUser', params: { id: user.id } }"
                title="Edit user"
              >
                <button class="btn btn-primary edit-btn">Edit</button>
              </router-link>
            </td>
            <td>
              <button
                class="btn btn-danger"
                @click="removeUser(user.id)"
                title="Delete user"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { useStore } from "vuex";
  import { ref, computed, onMounted } from "vue";
  import { deleteUser } from "../composables/deleteUser";
  import { getIndex } from "../composables/getIndex";
  import Alert from "../components/Alert.vue";

  export default {
    name: "Home",
    components: {
      Alert,
    },
    setup() {
      //Store
      const store = useStore();

      //Data
      const columnTitles = [
        "#No.",
        "First Name",
        "Last Name",
        "Email",
        "Country",
        "City",
        "Edit",
        "Delete",
      ];

      //Ref values
      const message = ref("");

      // *Methods*

      //Dispatching
      const dispatchUsers = () => store.dispatch("fetchUsers");
      const showOrHideDeletedAlert = () =>
        store.dispatch("showOrHideDeletedAlert");
      const setMessage = () => store.dispatch("setMessage", message.value);

      //Remove user method
      const removeUser = async (id) => {
        const response = await deleteUser(id).then((response) => {
          message.value = response.message;
          setMessage(message.value);
        });
        setTimeout(() => {
          dispatchUsers();
        }, 50);
        showOrHideDeletedAlert();
        setTimeout(() => {
          showOrHideDeletedAlert();
        }, 2000);
      };

      //Computed values
      const users = computed(() => store.getters.getUsers);
      const createdAlert = computed(() => store.getters.getCreatedAlert);
      const updatedAlert = computed(() => store.getters.getUpdatedAlert);
      const deletedAlert = computed(() => store.getters.getDeletedAlert);
      const alertMessage = computed(() => store.getters.getMessage);
      dispatchUsers(); //Fetching users

      return {
        users,
        columnTitles,
        createdAlert,
        updatedAlert,
        deletedAlert,
        alertMessage,
        removeUser,
        getIndex,
      };
    },
  };
</script>

<style scoped>
.home {
  height: 100vh;
}
button {
  width: 72.25px;
}
</style>
