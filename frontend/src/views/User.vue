<template>
  <h1 class="text-danger">{{ user.firstname }} {{ user.lastname }}</h1>
</template>

<script>
  import { getUserById } from '../composables/getUserById'
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  export default {
    name: 'User',
    setup() {
      // Route
      const currentRoute = useRoute()

      // Ref value
      const user = ref({})

      // onMounted Hook
      onMounted(async () => {
        user.value = await getUserById(currentRoute.params.id)
      })

      return {
        user,
      }
    },
  }
</script>

<style></style>
