<template>
  <div class="bg-dark create-user-div">
    <Alert
      v-if="emailAlert"
      className="warning"
      :message="emailAlertMessage"
      icon="exclamation-triangle"
    />
    <h1 class="pt-4 text-light">Edit User</h1>
    <form @submit.prevent="updateUser">
      <label for="firstname" class="form-label fw-bold text-light"
        >First Name</label
      >
      <input
        id="firstname"
        type="text"
        class="form-control mb-2 w-25 m-auto"
        placeholder="Enter your first name"
        v-model="firstname"
        required
        oninvalid="this.setCustomValidity('Enter user\'s first name')"
        oninput="this.setCustomValidity('')"
      />
      <label for="lastname" class="form-label fw-bold text-light"
        >Last Name</label
      >
      <input
        id="lastname"
        type="text"
        class="form-control mb-2 w-25 m-auto"
        placeholder="Enter your last name"
        v-model="lastname"
        required
        oninvalid="this.setCustomValidity('Enter user\'s last name')"
        oninput="this.setCustomValidity('')"
      />
      <label for="email" class="form-label fw-bold text-light">Email</label>
      <input
        id="email"
        type="email"
        class="form-control mb-2 w-25 m-auto"
        placeholder="Enter your email address"
        v-model="email"
        required
        oninvalid="this.setCustomValidity('Enter user\'s email address')"
        oninput="this.setCustomValidity('')"
      />
      <label for="country" class="form-label fw-bold text-light">Country</label>
      <input
        id="country"
        type="text"
        class="form-control mb-2 w-25 m-auto"
        placeholder="Enter country name"
        v-model="country"
        required
        oninvalid="this.setCustomValidity('Enter user\'s email address')"
        oninput="this.setCustomValidity('')"
      />
      <label for="city" class="form-label fw-bold text-light">City</label>
      <input
        id="city"
        type="text"
        class="form-control mb-3 w-25 m-auto"
        placeholder="Enter a city name"
        v-model="city"
        required
        oninvalid="this.setCustomValidity('Enter user\'s email address')"
        oninput="this.setCustomValidity('')"
      />
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { ref, onMounted, computed } from '@vue/runtime-core'
  import { getUserById } from '../composables/getUserById'
  import { editUser } from '../composables/editUser'
  import { checkMailWhenEditUser } from '../composables/checkMailWhenEditUser'
  import Alert from '../components/Alert.vue'

  export default {
    name: 'EditUser',
    components: {
      Alert,
    },
    setup() {
      // Store
      const store = useStore()

      // Router and route
      const router = useRouter()
      const currentRoute = useRoute()

      // Ref values
      const user = ref({})
      const firstname = ref('')
      const lastname = ref('')
      const email = ref('')
      const country = ref('')
      const city = ref('')
      const message = ref('')
      const emailAlert = ref(false)
      const emailAlertMessage = ref('')

      // *Methods*
      // Dispatching
      const showOrHideUpdatedAlert = () =>
        store.dispatch('showOrHideUpdatedAlert')
      const setMessage = () => store.dispatch('setMessage', message)

      // Computed values
      const users = computed(() => store.getters.getUsers)

      //onMounted Hook
      onMounted(async () => {
        user.value = await getUserById(currentRoute.params.id)
        firstname.value = user.value.firstname
        lastname.value = user.value.lastname
        email.value = user.value.email
        country.value = user.value.country
        city.value = user.value.city
      })

      //Update user
      const updateUser = async () => {
        user.value = await getUserById(currentRoute.params.id)
        const check = checkMailWhenEditUser(
          users.value,
          email.value,
          user.value
        )

        if (check) {
          emailAlertMessage.value = `Email ${email.value} already exists!`
          emailAlert.value = true
          setTimeout(() => {
            emailAlertMessage.value = ''
            emailAlert.value = false
          }, 4000)
          return
        }
        const response = await editUser(
          currentRoute.params.id,
          firstname.value,
          lastname.value,
          email.value,
          country.value,
          city.value
        )
          .then((response) => {
            message.value = response.message
            setMessage(message.value)
          })
          .then(() => {
            router.push('/')
          })
          .then(() => {
            showOrHideUpdatedAlert()
            setTimeout(() => {
              showOrHideUpdatedAlert()
            }, 1500)
          })
      }

      return {
        currentRoute,
        user,
        firstname,
        lastname,
        email,
        country,
        city,
        emailAlertMessage,
        emailAlert,
        updateUser,
      }
    },
  }
</script>

<style scoped>
  .create-user-div {
    height: 100vh;
    font-family: 'Roboto Mono', monospace;
  }

  label {
    font-style: italic;
  }

  form input::placeholder {
    text-align: center;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    form input {
      width: 50% !important;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    form input {
      width: 50% !important;
    }
  }

  @media (max-width: 480px) {
    form input {
      width: 75% !important;
    }
  }
</style>
