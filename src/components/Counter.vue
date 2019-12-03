<template>
  <div>
    <button @click="incrementCount">Add to count</button>
    <p>{{ count }}回クリックされました</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  // props: {
  //   count: Number,
  // },
  computed: {
    ...mapState('count', {
      count: state => state.count,
    }),
  },
  methods: {
    ...mapActions('count',['incrementCount']),
  }
}
</script>
