<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }" title="Home">
        <img src="https://i.imgur.com/iaOSNif.gif" class="logo" alt="Logo" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link active fw-bold"
              :to="{ name: 'CreateUser' }"
              title="Create New User"
              >Create New User</router-link
            >
          </li>
        </ul>
        <div v-if="currentRoute.name === 'Home'" class="d-flex">
          <input
            @keyup="getInputValue"
            class="form-control me-2 search-input"
            type="search"
            placeholder="Search through users"
            aria-label="Search"
            v-model="inputValue"
            title="Search by first name, last name, email, country or city "
          />
        </div>
        <button
          class="me-3 btn btn-dark export-btn"
          @click="csvExport(csv, columnTitles, users, today)"
          title="Export data"
        >
          Export
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { csvExport } from '../composables/csvExport'
  export default {
    name: 'Header',
    setup() {
      //Store
      const store = useStore()

      //Route
      const currentRoute = useRoute()

      //Data
      const date = Date.now()

      //Ref values
      const inputValue = ref('')
      const csv = ref('')
      const today = ref(new Date(date))
      const columnTitles = ref([
        'First Name',
        'Last Name',
        'Email',
        'Country',
        'City',
      ])

      //Computed values
      const users = ref(computed(() => store.getters.getUsers))

      //Dispatching
      const searchThroughUsers = () =>
        store.dispatch('searchThroughUsers', inputValue.value)

      //Methods
      const getInputValue = () => {
        return searchThroughUsers(inputValue.value)
      }

      return {
        inputValue,
        currentRoute,
        csv,
        columnTitles,
        users,
        today,
        getInputValue,
        csvExport,
      }
    },
  }
</script>

<style scoped>
  .nav-link:hover {
    text-decoration: underline;
  }

  .nav-link:active,
  .navbar-brand:active {
    transform: scale(0.97);
  }

  .export-btn {
    width: 100px;
  }

  .export-btn:active {
    transform: scale(0.95);
  }

  .search-input::placeholder {
    text-align: center;
  }

  .search-input:focus::placeholder {
    color: transparent !important;
  }

  .logo {
    width: 50px;
    border-radius: 20%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .nav-link {
      font-size: 22px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .nav-link {
      font-size: 28px;
    }

    .d-flex {
      justify-content: center;
    }
    .search-input {
      margin-bottom: 15px;
      width: 50%;
    }

    .export-btn {
      margin-bottom: 7px;
    }
  }

  @media (max-width: 480px) {
    .nav-link {
      font-size: 24px;
    }
    .search-input {
      margin-bottom: 15px;
    }
    .export-btn {
      margin-bottom: 5px;
    }
  }
</style>
