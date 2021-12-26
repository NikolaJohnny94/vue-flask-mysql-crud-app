<template>
  <div class="m-auto create-user-div bg-dark">
    <Alert
      v-if="emailAlert"
      className="warning"
      :message="emailAlertMessage"
      icon="exclamation-triangle"
    />
    <h1 class="pt-4 text-light">Create New User</h1>
    <form @submit.prevent="addNewUser">
      <label for="firstname" class="form-label fw-bold text-light"
        >First Name</label
      >
      <input
        id="firstname"
        class="form-control mb-2 w-25 m-auto"
        type="text"
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
        class="form-control mb-2 w-25 m-auto"
        type="text"
        placeholder="Enter your last name"
        v-model="lastname"
        required
        oninvalid="this.setCustomValidity('Enter user\'s last name')"
        oninput="this.setCustomValidity('')"
      />
      <label for="email" class="form-label fw-bold text-light">Email</label>
      <input
        id="email"
        class="form-control mb-2 w-25 m-auto"
        type="email"
        placeholder="Enter your email address"
        v-model="email"
        required
        oninvalid="this.setCustomValidity('Enter user\'s email address')"
        oninput="this.setCustomValidity('')"
      />
      <label for="country" class="form-label fw-bold text-light" text-light
        >Country</label
      >
      <input
        id="country"
        class="form-control mb-2 w-25 m-auto"
        type="text"
        placeholder="Enter your country name"
        v-model="country"
        required
        oninvalid="this.setCustomValidity('Enter user\'s country name')"
        oninput="this.setCustomValidity('')"
      />
      <label for="city" class="form-label fw-bold text-light">City</label>
      <input
        id="city"
        class="form-control mb-4 w-25 m-auto"
        type="text"
        placeholder="Enter your city name"
        v-model="city"
        required
        oninvalid="this.setCustomValidity('Enter user\'s city name')"
        oninput="this.setCustomValidity('')"
      />
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { ref, computed } from 'vue'
  import { createUser } from '../composables/createUser'
  // import { checkIfMailExists } from '../composables/checkIfMailExists'
  import { checkMailWhenCreateUser } from '../composables/checkMailWhenCreateUser'
  import Alert from '../components/Alert.vue'

  export default {
    name: 'CreateUser',
    components: {
      Alert,
    },
    setup() {
      // Store
      const store = useStore()

      // Router
      const router = useRouter()

      //Ref values

      const firstname = ref('')
      const lastname = ref('')
      const email = ref('')
      const country = ref('')
      const city = ref('')
      const message = ref('')
      const emailAlert = ref(false)
      const emailAlertMessage = ref('')

      // *Methods*
      //Dispatching
      const showOrHideCreatedAlert = () =>
        store.dispatch('showOrHideCreatedAlert')
      const setMessage = () => store.dispatch('setMessage', message.value)

      //Computed values
      const users = computed(() => store.getters.getUsers)

      //Add new user
      const addNewUser = async () => {
        const check = checkMailWhenCreateUser(users.value, email.value)

        if (check) {
          emailAlertMessage.value = `Email ${email.value} already exists!`
          emailAlert.value = true
          setTimeout(() => {
            emailAlertMessage.value = ''
            emailAlert.value = false
          }, 4000)
          return
        }
        const response = await createUser(
          firstname.value,
          lastname.value,
          email.value,
          country.value,
          city.value
        )
          .then((response) => {
            message.value = 'User successfully created!'
            setMessage(message.value)
          })
          .then(() => {
            router.push('/')
          })
          .then(() => {
            showOrHideCreatedAlert()
            setTimeout(() => {
              showOrHideCreatedAlert()
            }, 1500)
          })
          .catch((error) => console.log(error.message))
      }

      return {
        firstname,
        lastname,
        email,
        country,
        city,
        emailAlertMessage,
        emailAlert,
        addNewUser,
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
