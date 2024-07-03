<script>
import {
  BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody, BButton, BFormFile, BCardText,
} from 'bootstrap-vue'

export default {
  props: {
    avatarProps: {
      type: Object,
      default: { previewAvatar: null, avatarFile: null },
      required: true,
    },
    processing: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  components: {
    BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody, BButton, BFormFile, BCardText,
  },
  data() {
    return{
      previewAvatar: this.avatarProps.previewAvatar,
      avatarFile: this.avatarProps.avatarFile,
    }
  },
  methods: {
    inputImageRenderer(data){
      const file = data
      const reader = new FileReader()
      if(file){
        reader.onload = data => {
          this.previewAvatar = data.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    removeAvatar(){
      this.avatarFile = null
      this.previewAvatar = null
      this.$emit('updateFormRemoveAvatar', '')
    },
  },
  watch: {
    'avatarFile': {
      handler(value) { this.$emit('updateFormAvatar', value) }
    }
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-media no-body>
        <b-media-aside>
          <b-avatar
            :src="previewAvatar"
            :variant="`light-${processing ? 'secondary': 'primary'}`"
            size="85px"
            rounded/>
        </b-media-aside>
        <b-media-body v-if="!processing">
          <b-button
            variant="primary"
            size="sm"
            class="mb-75 mr-75"
            @click="$refs.inputAvatar.$el.click()"
          >
            {{previewAvatar ? 'Change' : 'Upload'}}
          </b-button>
          <b-form-file
            ref="inputAvatar"
            accept=".jpg, .png"
            plain
            :hidden="true"
            @input="inputImageRenderer"
            v-model="avatarFile"
          />
          <b-button
            @click="removeAvatar"
            v-if="previewAvatar"
            variant="danger"
            size="sm"
            class="mb-75 mr-75"
          >
            Remove
          </b-button>
          <b-card-text>
            <small class="text-muted">* Ukuran file maksimal 2 MB</small><br/>
            <small class="text-muted">* Ekstensi file harus JPG, JPEG, PNG</small><br/>
          </b-card-text>
        </b-media-body>
      </b-media>
    </b-col>
  </b-row>
</template>

<style>

</style>