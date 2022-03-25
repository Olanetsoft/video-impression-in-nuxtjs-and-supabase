<template>
  <div class="flex justify-center items-center h-screen space-x-10">
    <h1 class="font-bold text-4xl mb-3">
      Track Video Impressions in Nuxtjs with Supabase
    </h1>
    <div>
      <!--  Show loading indicator if count is loading -->
      <div v-if="loading">
        <div class="font-bold">loading...</div>
      </div>
      <p v-else-if="count" class="font-bold text-l">
        Impression Count: {{ count }}
      </p>
      <div class="rounded overflow-hidden shadow-lg mb-4 content-center">
        <div class="px-6 py-4 pb-2">
          <video
            id="video-player"
            controls
            width="500px"
            class="width-full"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    this.fetchCount();
  },
  data() {
    return {
      cld: null,
      player: null,
      video: "samples/sea-turtle",
      count: this.fetchCount(),
      loading: false,
    };
  },

  mounted() {
    this.cld = cloudinary.Cloudinary.new({
      cloud_name: process.env.NUXT_ENV_CLOUDINARY_CLOUD_NAME,
      secure: true,
    });

    this.player = this.cld.videoPlayer("video-player", {
      analytics: {
        events: ["play"],
      },
    });

    this.player.source(this.video);

    this.player.on("play", async () => {
      this.saveImpression(this.count++);
    });
  },

  methods: {
    async saveImpression(ad) {
      const { data } = await this.$supabase
        .from("Video Impression")
        .update({ ImpressionCount: ad })
        .match({ id: "1" });
    },

    async fetchCount() {
      this.loading = true;
      const { data, error, loading } = await this.$supabase
        .from("Video Impression")
        .select("*");
      this.count = data[0].ImpressionCount;

      if (loading) {
        this.loading = true;
      } else if (error) {
        console.log(error);
        this.loading = false;
      } else {
        this.loading = false;
      }
      return this.count;
    },
  },
  name: "VideoPage",
};
</script>
