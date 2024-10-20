<template>
  <div class="carousel">
    <img :src="images[currentIndex]" alt="Superhéroe" class="carousel-image" @click="openModal(currentIndex)" />
    <button class="nav-button left" @click="prevImage">&lt;</button>
    <button class="nav-button right" @click="nextImage">&gt;</button>
    <div class="dots">
      <span
        v-for="(image, index) in images"
        :key="index"
        :class="['dot', { active: currentIndex === index }]"
        @click="goToImage(index)"
      ></span>
    </div>
    
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <img :src="images[modalIndex]" alt="Superhéroe" class="modal-image" />
        <button class="nav-button left" @click="prevImageInModal">&lt;</button>
        <button class="nav-button right" @click="nextImageInModal">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const images = ref([
      'https://i.pinimg.com/originals/29/7d/e0/297de0761b0c756266d74ca50d03cc1d.jpg',
      'https://pbs.twimg.com/media/FD69GeDVcAsiLDk.jpg:large',
      'https://m.media-amazon.com/images/I/71pKePD7oIL._AC_UF894,1000_QL80_.jpg',
    ]);
    const currentIndex = ref(0);
    const modalIndex = ref(0);
    const showModal = ref(false);
    let interval;

    const nextImage = () => {
      currentIndex.value = (currentIndex.value + 1) % images.value.length;
    };

    const prevImage = () => {
      currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
    };

    const goToImage = (index) => {
      currentIndex.value = index;
      resetInterval();
    };

    const resetInterval = () => {
      clearInterval(interval);
      interval = setInterval(nextImage, 7000);
    };

    const openModal = (index) => {
      modalIndex.value = index;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const prevImageInModal = () => {
      modalIndex.value = (modalIndex.value - 1 + images.value.length) % images.value.length;
    };

    const nextImageInModal = () => {
      modalIndex.value = (modalIndex.value + 1) % images.value.length;
    };

    onMounted(() => {
      interval = setInterval(nextImage, 7000);
    });

    return { images, currentIndex, nextImage, prevImage, goToImage, showModal, openModal, closeModal, prevImageInModal, nextImageInModal, modalIndex };
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 240px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: -20px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  cursor: pointer; 
}

.nav-button {
  position: absolute;
  top: 50%;
  background: rgba(128, 128, 128, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 10; 
}

.nav-button:hover {
  background: rgba(128, 128, 128, 0.8);
  transform: scale(1.1);
}

.left {
  left: 10px;
}

.right {
  right: 10px;
}

.dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.5);
  cursor: pointer;
  transition: background 0.3s;
}

.dot.active {
  background: rgb(222, 40, 88);
}

.dot:hover {
  background: rgba(128, 128, 128, 0.8);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20; 
}

.modal-content {
  position: relative;
  width: 800px; 
  height: 600px; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}
</style>
