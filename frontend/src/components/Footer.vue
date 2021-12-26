<template>
  <footer class="bg-primary">
    <div>
      <a
        v-for="i in icons.slice(0, 2)"
        :key="getIndex(icons, i)"
        :href="i.url"
        :title="i.title"
        target="_blank"
      >
        <FontAwesomeIcon
          :icon="['fab', i.name]"
          :class="[i.class, 'mt-2', 'me-2']"
        />
      </a>
      <p class="fw-bold m-2 text-light">Developed by Nikola</p>
      <a
        v-for="i in icons.slice(2, 4)"
        :key="getIndex(icons, i)"
        :href="i.url"
        :title="i.title"
        target="_blank"
      >
        <FontAwesomeIcon
          :icon="['fab', i.name]"
          :class="[i.class, 'mt-2', 'me-2']"
        />
      </a>
    </div>
  </footer>
</template>

<script>
  import { getIndex } from '../composables/getIndex'
  export default {
    name: 'Footer',
    setup() {
      const icons = [
        {
          name: 'github',
          class: 'github',
          url: 'https://github.com/NikolaJohnny94',
          title: 'Follow me on GitHub',
        },
        {
          name: 'linkedin-in',
          class: 'linkedin',
          url: 'https://www.linkedin.com/in/nikola-ivanovi%C4%87-2b6a13179/',
          title: "Let's connect on Linkedin",
        },
        {
          name: 'codepen',
          class: 'codepen',
          url: 'https://codepen.io/NikolaJohnny/pens/public',
          title: 'Follow me on Codepen',
        },
        {
          name: 'twitter',
          class: 'twitter',
          url: 'https://twitter.com/nikola8794pwd',
          title: 'Follow me on Twitter',
        },
      ]

      return {
        icons,
        getIndex,
      }
    },
  }
</script>

<style scoped>
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  footer > div {
    display: flex;
    justify-content: center;
  }

  footer > div > p {
    font-style: italic;
    font-size: 20px;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .icons {
    cursor: pointer;
  }

  .icons:active {
    transform: scale(0.9);
  }

  .github {
    color: #000;
    font-size: 28px;
  }

  .codepen {
    color: #fff;
    font-size: 28px;
  }

  .linkedin {
    color: #2867b2;
    font-size: 28px;
  }

  .twitter {
    color: #08a0e9;
    font-size: 28px;
  }
</style>
