<template>
  <div
    :class="['alert', `alert-${className}`, 'd-flex', 'align-items-center']"
    role="alert"
  >
    <div class="fw-bold m-auto">
      {{ message }}
      <FontAwesomeIcon :icon="icon" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: {
      className: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
  }
</script>
