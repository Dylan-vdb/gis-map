// PopupForm.vue
<template>
  <div class="popup-form">
    <form @submit.prevent="handleSubmit">
      <input
        v-model="formData.name"
        type="text"
        placeholder="Enter name"
        class="mb-2 p-1 border rounded"
      />
      <textarea
        v-model="formData.description"
        placeholder="Enter description"
        class="mb-2 p-1 border rounded"
      ></textarea>
      <button type="submit" class="px-2 py-1 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PopupForm",
  props: {
    markerPosition: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref({
      name: "",
      description: "",
    });

    const handleSubmit = () => {
      emit("form-submit", {
        ...formData.value,
        position: props.markerPosition,
      });
    };

    return {
      formData,
      handleSubmit,
    };
  },
};
</script>
