<!--Composition API-->
<script setup></script>
<template>
  <div class="banner">
    <div class="parent">
      <img src="@/assets/images/banner-bg.jpg" alt="" />
      <div class="cont">
        <h3><span>Huge Saving</span> on UHD Televisions</h3>
        <p class="hint">Sale up to 70% off on selected items*</p>
        <v-btn
          style="border-radius: 30px; text-transform: none"
          variant="outlined"
          density="compact"
          height="50"
          width="160"
          >Shop Now</v-btn
        >
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.banner {
  .parent {
    height: 390px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cont {
      color: #fff;
      padding: 40px 0 0 100px;
      position: absolute;
      left: 40px;
      top: 20px;
      width: 600px;
      h3 {
        font-size: 45px;
        font-weight: 900;
        span {
          color: rgb(45, 251, 223);
        }
      }
      .hint {
        margin: 50px 0 20px;
      }
    }
  }
}

// Media Queries
@media (max-width: 990px) {
  .banner {
    .parent {
      .cont {
        h3 {
          font-size: 35px;
        }
        width: 500px;
        left: 0;
      }
    }
  }
}
@media (max-width: 767px) {
  .banner {
    .parent {
      height: 320px;
      .cont {
        padding-left: 20px;
        h3 {
          font-size: 30px;
        }
        width: 500px;
        left: 0;
        .hint {
          font-size: 14px;
        }
      }
    }
  }
}
@media (max-width: 580px) {
  .banner {
    .parent {
      height: 250px;
      .cont {
        padding-left: 20px;
        padding-top: 20px;
        h3 {
          font-size: 24px;
        }
        width: 80%;
        left: 0;
        .hint {
          font-size: 12px;
        }
        button {
          height: 30px !important;
          width: 130px !important;
          font-size: 11px !important;
        }
      }
    }
  }
}
</style>
