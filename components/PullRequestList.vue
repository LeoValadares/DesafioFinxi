<template>
  <div v-if="prs !== null">
    <ul>
        <li v-for="pr in prs"> {{ pr.title }} {{ pr.user.login }}</li>
    </ul>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import axios from '~/plugins/axios'

const fetchRepoPRs = async (repoId) => {
  try {
    const { data } = await axios.get(`/repositories/${repoId}/pulls`)
    return data
  } catch (error) {
    return null
  }
}

export default {
  props: {
    repoId: { type: Number, required: true }
  },
  data: () => {
    return { prs: null }
  },
  async mounted () {
    const fetchedPRs = await fetchRepoPRs(this.repoId)
    this.prs = fetchedPRs
  }
}
</script>

<style>
</style>
